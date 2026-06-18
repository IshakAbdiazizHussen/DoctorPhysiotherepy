# Backend

FastAPI backend for DoctorPhysio. This service owns API validation, authentication, business logic, SQLAlchemy persistence, Alembic migrations, and Redis-backed short-lived support behavior.

## Current stack

- FastAPI
- SQLAlchemy 2
- Alembic
- PostgreSQL
- Redis
- Pydantic Settings
- Passlib
- Python-JOSE
- Pytest

## Repo structure

```text
backend/
├── app/
│   ├── api/
│   ├── core/
│   ├── database/
│   ├── models/
│   ├── redis/
│   ├── repositories/
│   ├── schemas/
│   ├── services/
│   ├── utils/
│   └── main.py
├── alembic/
├── tests/
├── alembic.ini
├── Dockerfile
├── requirements.txt
└── README.md
```

## Local setup

1. Create and activate a virtual environment:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Create the local environment file:

```bash
cp .env.example .env
```

4. Update `.env` with local placeholder-safe values only.

Example values from `backend/.env.example`:

```env
DATABASE_URL=postgresql+psycopg://postgres:postgres@localhost:5432/doctorphysio_db
REDIS_URL=redis://localhost:6379/0
SECRET_KEY=change-this-secret-key
ACCESS_TOKEN_EXPIRE_MINUTES=30
ENVIRONMENT=development
BACKEND_CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

Notes:

- `SECRET_KEY` in local examples is a placeholder and must not be treated as a real secret.
- PostgreSQL is the source of truth for persistent data.
- Redis is used only for caching and short-lived support behavior.

## Run the backend

Start the API locally:

```bash
cd backend
source .venv/bin/activate
python -m uvicorn app.main:app --reload
```

The backend runs at [http://localhost:8000](http://localhost:8000).

Useful local URLs:

- `http://localhost:8000/docs`
- `http://localhost:8000/health`
- `http://localhost:8000/api/v1/health`

Startup behavior:

- The app loads settings from `app/core/config.py`.
- CORS origins come from `BACKEND_CORS_ORIGINS`.
- Redis is pinged during startup.
- If Redis is temporarily unavailable, the app is designed to keep booting.

## API entry points

Current public and auth routes are mounted under `/api/v1` except for the root health route.

### Health routes

- `GET /health`
- `GET /api/v1/health`

Both health endpoints currently return:

```json
{"status": "ok"}
```

### Auth routes

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `GET /api/v1/auth/me`

Auth behavior summary:

- `register` accepts the user create schema and returns the user read schema.
- `login` verifies credentials and returns a bearer token response.
- `me` requires a valid bearer token and returns the current active user.
- Auth responses do not expose `hashed_password`.

## Database migrations

Alembic is configured through `backend/alembic.ini` and `backend/alembic/env.py`.

Common commands:

```bash
cd backend
source .venv/bin/activate
alembic revision --autogenerate -m "message"
alembic upgrade head
alembic current
```

Migration notes:

- Alembic reads `DATABASE_URL` from `backend/.env` through backend settings.
- Model metadata is imported through `app.models`.
- Use Alembic for schema changes only.
- Do not manually create tables outside the migration workflow.

## Run tests

Compile and test the backend with:

```bash
cd backend
source .venv/bin/activate
python -m compileall app tests
pytest
```

Current backend tests cover:

- health routes
- auth dependencies
- auth routes
- auth service behavior
- user schemas
- password and JWT utilities
- middleware behavior
- Redis startup behavior
- development seed guards

## Seed local development data

Run Alembic migrations first, then use the development-only seed script:

```bash
cd backend
source .venv/bin/activate
python -m app.utils.dev_seed
```

Seed script behavior:

- refuses to run unless `ENVIRONMENT=development`
- uses the existing SQLAlchemy session setup
- inserts fake local-only users
- hashes seed passwords before persistence
- avoids duplicate inserts for existing seed emails

## Backend development workflow

Use this order during normal feature work:

1. Activate the virtual environment.
2. Update `.env` placeholder values for local services.
3. Run migrations with `alembic upgrade head`.
4. Start the backend with `python -m uvicorn app.main:app --reload`.
5. Verify routes in `/docs`.
6. Run `python -m compileall app tests` and `pytest` after backend changes.

## Security reminders

- Never put real secrets in docs, fixtures, or seed data.
- Never return `hashed_password` in API responses.
- Keep `SECRET_KEY`, database credentials, and Redis configuration environment-driven.
- Treat Redis as supportive infrastructure, not as business-record storage.
