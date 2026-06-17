# PROJECT SETUP

## 1. Purpose

This document explains how developers run, support, and maintain the DoctorPhysio project locally. It is written to match the current repository structure and the architectural rules in `docs/ARCHITECTURE.md`.

## 2. Project structure

```text
project-root/
├── docs/
│   ├── ARCHITECTURE.md
│   ├── CONSTRAINTS.md
│   ├── PROJECT_DEFINITION.md
│   ├── PROJECT_SETUP.md
│   └── DEVELOPMENT_PLAN.md
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── .env.example
├── backend/
│   ├── app/
│   ├── alembic/
│   ├── tests/
│   ├── requirements.txt
│   ├── alembic.ini
│   ├── Dockerfile
│   └── .env.example
└── docker-compose.yml
```

## 3. Prerequisites

Install the following tools before starting:

- Git
- Node.js 20 or newer
- npm
- Python 3.12
- PostgreSQL 16 or compatible local PostgreSQL installation
- Redis 7 or compatible local Redis installation
- Docker and Docker Compose for container-based setup

If you prefer not to install PostgreSQL and Redis directly, use Docker Compose from the project root.

## 4. Node.js setup

Recommended approach:

1. Install Node.js 20 or newer
2. Verify the installation:

```bash
node --version
npm --version
```

3. Move into the frontend folder and install dependencies:

```bash
cd frontend
npm install
```

## 5. Python setup

Recommended approach:

1. Install Python 3.12
2. Verify the installation:

```bash
python3 --version
```

3. Create and activate a virtual environment in `backend/`:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
```

4. Install backend dependencies:

```bash
pip install -r requirements.txt
```

## 6. PostgreSQL setup

The backend expects PostgreSQL as the persistent data store.

Local setup expectations:

- Default local port: `5432`
- Example database name from `backend/.env.example`: `doctorphysio_db`
- PostgreSQL is accessed through SQLAlchemy only

Create a local database that matches your `DATABASE_URL`. Example:

```bash
createdb doctorphysio_db
```

If your PostgreSQL user is different, update `backend/.env` accordingly.

Docker option:

- `docker-compose.yml` starts PostgreSQL 16 on `localhost:5432`
- Docker database name: `app_db`
- Docker username: `postgres`
- Docker password: `postgres`

## 7. Redis setup

Redis is used for caching and short-lived application support data.

Local setup expectations:

- Default local port: `6379`
- Example backend connection: `redis://localhost:6379/0`

Docker option:

- `docker-compose.yml` starts Redis 7 on `localhost:6379`

Note:

- Redis is not the source of truth for business records

## 8. Environment variables

### Backend environment

Create the backend environment file:

```bash
cd backend
cp .env.example .env
```

Current backend environment variables:

- `DATABASE_URL`
- `REDIS_URL`
- `SECRET_KEY`
- `ACCESS_TOKEN_EXPIRE_MINUTES`
- `ENVIRONMENT`
- `BACKEND_CORS_ORIGINS`

Example values from the repository:

```env
DATABASE_URL=postgresql+psycopg://ahmedihsan@localhost:5432/doctorphysio_db
REDIS_URL=redis://localhost:6379/0
SECRET_KEY=change-this-secret-key
ACCESS_TOKEN_EXPIRE_MINUTES=30
ENVIRONMENT=development
BACKEND_CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

### Frontend environment

Create the frontend environment file:

```bash
cd frontend
cp .env.example .env.local
```

Current frontend environment variable:

- `NEXT_PUBLIC_API_BASE_URL`

Example:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

## 9. Frontend setup

From the project root:

```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

The frontend runs at:

- `http://localhost:3000`

Frontend notes:

- The frontend is a Next.js 16 app
- The frontend talks to the backend through `NEXT_PUBLIC_API_BASE_URL`

## 10. Backend setup

From the project root:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Backend notes:

- The backend is a FastAPI app
- Configuration is loaded through `app/core/config.py`
- Redis is pinged on startup, but the app is designed to still boot if Redis is temporarily unavailable

## 11. Running FastAPI

From `backend/` with the virtual environment active:

```bash
uvicorn app.main:app --reload
```

The backend runs at:

- `http://localhost:8000`

Useful routes:

- `GET /health`
- `GET /api/v1/health`
- Authentication routes under `/api/v1/auth`

## 12. Running Next.js

From `frontend/`:

```bash
npm run dev
```

The frontend runs at:

- `http://localhost:3000`

## 13. Alembic migrations

Alembic is configured in `backend/alembic.ini` and `backend/alembic/env.py`.

Important behavior:

- Alembic reads `DATABASE_URL` from backend settings
- Alembic imports `app.models` so model metadata is available for autogeneration

Common migration commands:

```bash
cd backend
alembic revision --autogenerate -m "describe_change"
alembic upgrade head
```

Recommended migration workflow:

1. Update SQLAlchemy models
2. Ensure model imports are discoverable through `app.models`
3. Generate the migration
4. Review the generated migration carefully
5. Apply it with `alembic upgrade head`

## 14. Docker setup

The repository includes `docker-compose.yml` for local multi-service development.

Run the full stack from the project root:

```bash
docker compose up --build
```

Available services:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`

Docker notes:

- The frontend container uses `node:20-alpine`
- The backend image builds from `backend/Dockerfile`
- PostgreSQL uses `postgres:16-alpine`
- Redis uses `redis:7-alpine`

To stop the stack:

```bash
docker compose down
```

To stop and remove volumes:

```bash
docker compose down -v
```

Use volume removal carefully because it deletes container-managed database and Redis data.

## 15. Testing setup

Backend testing uses `pytest`.

Run backend tests:

```bash
cd backend
source .venv/bin/activate
pytest
```

Current visible backend test coverage includes health route checks in `backend/tests/test_health.py`.

Recommended testing practice:

- Run tests after backend changes
- Add focused tests when business logic changes
- Keep tests behavior-oriented and beginner-readable

## 16. Common commands

### Frontend

```bash
cd frontend
npm install
npm run dev
npm run build
npm run start
```

### Backend

```bash
cd backend
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
pytest
alembic upgrade head
alembic revision --autogenerate -m "message"
```

### Full stack

```bash
docker compose up --build
docker compose down
```

## 17. Troubleshooting

### Frontend cannot reach backend

- Confirm the backend is running on `http://localhost:8000`
- Confirm `frontend/.env.local` uses the correct `NEXT_PUBLIC_API_BASE_URL`
- Confirm CORS settings in the backend allow your frontend origin

### Backend fails to start because of configuration

- Confirm `backend/.env` exists
- Confirm every required variable is set
- Check `DATABASE_URL`, `REDIS_URL`, and `SECRET_KEY` first

### Database connection errors

- Confirm PostgreSQL is running
- Confirm the database in `DATABASE_URL` exists
- Confirm username, password, host, and port are correct

### Redis connection errors

- Confirm Redis is running on the configured port
- The backend may still boot if Redis is temporarily unavailable, but Redis-backed behavior may not work correctly

### Migration issues

- Confirm the virtual environment is active
- Confirm `backend/.env` points to the expected database
- Confirm model imports are exposed through `app.models`

### Port conflicts

- Check whether ports `3000`, `8000`, `5432`, or `6379` are already in use
- Stop conflicting local services or update your environment configuration

## 18. New developer onboarding checklist

- Read `docs/ARCHITECTURE.md`
- Read `docs/CONSTRAINTS.md`
- Read `docs/PROJECT_DEFINITION.md`
- Read `docs/PROJECT_SETUP.md`
- Read `docs/DEVELOPMENT_PLAN.md`
- Install Node.js, Python, PostgreSQL, Redis, and Docker as needed
- Create `backend/.env` from `.env.example`
- Create `frontend/.env.local` from `.env.example`
- Install frontend dependencies with `npm install`
- Create a backend virtual environment and install Python dependencies
- Start PostgreSQL and Redis locally or with Docker Compose
- Run Alembic migrations
- Start the backend with Uvicorn
- Start the frontend with Next.js
- Verify `GET /health` and `GET /api/v1/health`

## 19. Maintenance guidance

Use this setup document as the day-to-day operating guide for local development. When infrastructure, commands, dependencies, or environment variables change, update this file so new and existing developers stay aligned with the actual repository state.
