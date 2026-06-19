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
SECRET_KEY=replace-me-in-production-with-a-long-random-secret
ACCESS_TOKEN_EXPIRE_MINUTES=30
ENVIRONMENT=development
BACKEND_CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
```

Notes:

- `SECRET_KEY` in local examples is a placeholder and must not be treated as a real secret.
- Production requires a non-placeholder `SECRET_KEY` that is at least 32 characters long.
- PostgreSQL is the source of truth for persistent data.
- Redis is used only for caching and short-lived support behavior.
- `BACKEND_CORS_ORIGINS` must stay explicit. Wildcard CORS is not accepted.

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

Release expectation:

- Run `alembic upgrade head` as part of every deployment that includes schema changes.
- Review generated migrations before applying them to shared environments.
- Keep a backup or snapshot of the production database before applying irreversible changes.

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

## Docker and deployment readiness

`docker-compose.yml` is for local development and validation, not as a final production deployment definition.

Current Docker expectations:

- PostgreSQL and Redis stay externalized through environment variables per environment.
- The backend image runs as a non-root user.
- `backend/.env` is excluded from the Docker build context through `backend/.dockerignore`.
- Compose defaults remain placeholder-safe and must be overridden in shared or production environments.

Recommended deployment checks:

```bash
docker compose up --build
docker compose ps
docker compose logs backend
```

Production environment checklist:

- Set `ENVIRONMENT=production`.
- Provide a long random `SECRET_KEY` through the deployment platform.
- Provide production `DATABASE_URL` and `REDIS_URL` through the deployment platform.
- Set explicit production `BACKEND_CORS_ORIGINS` values for the deployed frontend origins only.
- Keep PostgreSQL and Redis managed outside the container filesystem.

## Backup, rollback, and release expectations

Before release:

1. Run `python -m compileall app tests`.
2. Run `pytest`.
3. Review environment variables for completeness.
4. Confirm the target database backup or snapshot plan is ready.
5. Apply migrations in a staging or production-like environment before broad rollout.

Rollback expectations:

- If a release fails before migrations run, redeploy the previous application image or revision.
- If a release includes migrations, restore from a verified backup or apply a reviewed downgrade only when that downgrade is known to be safe.
- Do not assume every migration is safely reversible without review.

Operational expectations:

- Health checks should confirm `/health` and `/api/v1/health`.
- Critical auth flows should be verified after deployment.
- Logs should be captured by the deployment platform rather than relying on local container state.

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
