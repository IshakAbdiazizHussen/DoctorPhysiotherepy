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
