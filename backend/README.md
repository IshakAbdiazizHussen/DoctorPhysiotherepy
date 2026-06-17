# Backend

FastAPI backend scaffold for the project.

## Run locally

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

The API runs at [http://localhost:8000](http://localhost:8000).

## Key routes

- `GET /health`
- `GET /api/v1/health`

## Migrations

```bash
cd backend
alembic revision --autogenerate -m "message"
alembic upgrade head
```

Alembic reads `DATABASE_URL` from `backend/.env` through the backend settings module, and it inspects `Base.metadata` after importing `app.models` so future SQLAlchemy models can be picked up automatically by `--autogenerate`.

## Seed local development data

Run Alembic migrations first, then use the development-only seed script:

```bash
cd backend
source .venv/bin/activate
python -m app.utils.dev_seed
```

This command is safe for local development only. It refuses to run unless `ENVIRONMENT=development`, uses the SQLAlchemy session setup already defined by the backend, and adds fake sample users only when they do not already exist.
