# Project Structure

This repository is now split into:

```text
project-root/
├── frontend/   # Existing Next.js app
└── backend/    # New FastAPI API
```

## Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend URL: `http://localhost:3000`

Environment file:

```bash
cp frontend/.env.example frontend/.env.local
```

## Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
uvicorn app.main:app --reload
```

Backend URL: `http://localhost:8000`

Health routes:

- `GET /health`
- `GET /api/v1/health`

## PostgreSQL and Redis with Docker Compose

Run the full stack from the project root:

```bash
docker compose up --build
```

Services:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`
- PostgreSQL: `localhost:5432`
- Redis: `localhost:6379`

## Notes

- The existing Next.js code was moved into `frontend/` without rewriting the app.
- The FastAPI backend is scaffolded for environment-based config, PostgreSQL, Redis, and Alembic migrations.
- If you want fresh local installs after the move, run `npm install` inside `frontend/` and `pip install -r requirements.txt` inside `backend/`.
