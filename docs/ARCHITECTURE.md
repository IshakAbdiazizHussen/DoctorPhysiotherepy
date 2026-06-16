Before making any code changes, Codex must read this file and follow it.

# ARCHITECTURE

## 1. Project overview

This project is a healthcare platform with a separated frontend and backend architecture:

- `frontend/` contains the Next.js web application.
- `backend/` contains the FastAPI REST API and backend business logic.

The system is designed to support a physiotherapy and rehabilitation clinic workflow, including doctor discovery, appointments, patient-facing experiences, backend administration, and future payment/review capabilities.

## 2. System purpose

The system exists to:

- present healthcare services to users through a responsive web interface
- allow patients to browse doctors and services
- support appointments and future patient management workflows
- provide a secure backend for clinic operations
- support future admin dashboards, payments, reviews, and reporting

## 3. Main modules

### frontend

- Built with Next.js
- Responsible for UI, page rendering, forms, navigation, and API consumption
- Must remain visually consistent with the existing brand direction unless explicitly redesigned

### backend

- Built with FastAPI
- Exposes REST API endpoints under `/api/v1`
- Responsible for validation, business logic, authentication, and integrations

### database

- PostgreSQL is the source of truth for persistent business data
- Accessed only through SQLAlchemy
- Schema changes must be managed by Alembic migrations

### Redis

- Used for caching, temporary state, throttling, background coordination, or other short-lived data
- Redis is not the source of truth for business records

### authentication

- JWT-based authentication
- Password hashing and token logic live in reusable backend utilities and dependencies
- Role-based access control must be supported for future admin features

### admin/dashboard future module

- Future backend and frontend module
- Will provide administrative tools for clinic staff
- Expected capabilities: analytics, doctor management, patient management, appointment oversight, payments, reviews, and role-restricted operations

## 4. Folder structure

```text
project-root/
├── docs/
│   ├── ARCHITECTURE.md
│   └── CONSTRAINTS.md
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── package-lock.json
│   ├── next.config.mjs
│   ├── postcss.config.mjs
│   ├── jsconfig.json
│   └── README.md
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── api/
│   │   ├── core/
│   │   ├── database/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── redis/
│   │   └── utils/
│   ├── alembic/
│   ├── tests/
│   ├── alembic.ini
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── .env.example
│   └── README.md
└── docker-compose.yml
```

## 5. Backend architecture

### `app/main.py`

- application entry point
- creates the FastAPI app
- registers middleware
- registers versioned API routers
- manages application startup and shutdown hooks

### `api/v1` routes

- all public and protected API routes live under `/api/v1`
- routes should stay thin
- routes should validate input, call service functions, and shape responses

### `models`

- SQLAlchemy ORM models
- represent database tables
- must be imported through `app.models` so Alembic can discover metadata

### `schemas`

- Pydantic request and response models
- enforce validation and serialization rules
- should be separate from ORM models

### `services`

- contain business logic
- coordinate repositories, validation, domain rules, and workflow decisions
- should not contain raw request objects unless absolutely necessary

### `repositories`

- contain database query operations where appropriate
- should keep persistence concerns separate from business rules

### `database`

- engine creation
- declarative base
- session creation
- dependency helpers like `get_db()`

### `core`

- central configuration
- security helpers
- shared backend-level settings and foundational behavior

### `middleware`

- reserved for future request/response middleware such as logging, timing, correlation IDs, rate limiting, or audit hooks

### `utils`

- low-level reusable helpers that do not belong to services, repositories, or schemas

## 6. Database architecture

Expected core business tables:

### users

- platform accounts
- supports patients, admins, and possibly doctors/staff depending on final role strategy

### doctors

- clinic doctor/specialist records
- should contain professional profile data, specialties, schedules, and availability

### patients

- patient-specific records
- may be linked to a user account

### services

- healthcare and rehabilitation services offered by the clinic

### appointments

- appointment scheduling and lifecycle tracking

### payments

- future billing/payment records

### reviews

- patient reviews and ratings for doctors or services

## 7. Authentication architecture

### register

- future workflow
- validate incoming credentials and profile data
- hash password before persistence

### login

- future workflow
- verify password
- issue JWT access token

### JWT access token

- signed with `SECRET_KEY`
- expiration controlled by `ACCESS_TOKEN_EXPIRE_MINUTES`
- should include a `sub` claim at minimum

### current user

- reusable dependency must decode bearer token
- load current user from database
- reject invalid or missing tokens consistently

### role-based access

- must support at least `user` and `admin`
- future expansion should remain possible

## 8. API standards

- API style: REST
- versioned routes under `/api/v1`
- JSON request and response format
- validation handled through Pydantic schemas
- use clear HTTP status codes
- keep route handlers focused and predictable

## 9. Naming conventions

- Python files and modules: `snake_case`
- classes: `PascalCase`
- functions and variables: `snake_case`
- constants: `UPPER_SNAKE_CASE`
- route paths: lowercase with hyphens only if necessary
- database tables: plural, lowercase, snake_case when possible

## 10. Error response format

Preferred API error shape:

```json
{
  "detail": "Human-readable error message"
}
```

For future standardized error handling, additional fields may be added:

```json
{
  "detail": "Validation failed",
  "code": "validation_error",
  "errors": []
}
```

## 11. Security requirements

- never store plaintext passwords
- always hash passwords using a secure password hashing library
- never return `hashed_password` or secrets in API responses
- JWT must be signed and validated securely
- role checks must use reusable dependencies
- secrets must come from environment variables
- backend must reject invalid, inactive, or unauthorized users consistently

## 12. Environment variables

Expected backend variables:

- `DATABASE_URL`
- `REDIS_URL`
- `SECRET_KEY`
- `ACCESS_TOKEN_EXPIRE_MINUTES`
- `ENVIRONMENT`
- `BACKEND_CORS_ORIGINS`

Expected frontend variable:

- `NEXT_PUBLIC_API_BASE_URL`

## 13. Development workflow

- inspect existing code before editing
- make focused, incremental changes
- keep architecture consistent with this file
- run validation/compile checks after backend changes
- explain what changed after each task

## 14. Migration workflow

- define or update SQLAlchemy models
- ensure model imports are registered for Alembic discovery
- generate migration with:
  - `alembic revision --autogenerate -m "message"`
- review generated migration before applying
- apply with:
  - `alembic upgrade head`

## 15. Testing workflow

- add or update tests when logic changes
- keep tests focused on behavior
- at minimum run compile checks after backend changes
- use pytest for backend tests

## 16. Deployment workflow

- Docker and docker-compose are supported
- backend uses environment-driven configuration
- frontend and backend should be deployable independently
- PostgreSQL and Redis should be externalized per environment

## 17. Future scalability notes

- keep API versioning stable
- keep authentication reusable and decoupled from route code
- prefer services and repositories as complexity grows
- allow future background workers, task queues, and notifications
- design modules so admin/dashboard features can be added without rewriting core backend structure
