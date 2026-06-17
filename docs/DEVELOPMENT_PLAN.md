# Development Plan

Every feature in this roadmap must be completed, tested, and manually checked before the next feature begins. Do not skip ahead. Each step should build on the previous step with small, focused, reversible changes that follow the project architecture and constraints.

This roadmap is written for the DoctorPhysio stack:

- Frontend: Next.js
- Backend: FastAPI
- API style: REST
- Database: PostgreSQL
- ORM: SQLAlchemy
- Migrations: Alembic
- Cache: Redis
- Authentication: JWT
- Config: `pydantic-settings`
- Tests: `pytest`

This plan does not use Prisma, Supabase, TypeScript backend patterns, or Next.js API routes.

## Governance Rules For All Features

Every feature in this document must begin by reviewing:

* docs/ARCHITECTURE.md
* docs/CONSTRAINTS.md
* docs/PROJECT_DEFINITION.md
* docs/PROJECT_SETUP.md
* docs/DEVELOPMENT_PLAN.md

No implementation may begin until those documents have been reviewed.

All implementation work must follow:

* Architecture rules
* Constraints
* Security requirements
* Testing requirements
* Development workflow
* Documentation standards
* Naming conventions
* Folder structure requirements

The project documents are the source of truth.

Every feature must include its own Checking And Testing Workflow. A feature is not complete until its required backend, frontend, database, Redis, Docker, automated test, and manual QA checks are completed or a clear reason is given for why a check could not be run.

## Feature Todo Roadmap

Build in this order:

1. Project foundation and backend verification
2. Environment config and database setup
3. Alembic migration setup
4. User model and schemas
5. Users table migration
6. Password security and JWT utilities
7. Auth dependencies
8. Authentication routes
9. Middleware
10. Redis setup and health check
11. Backend tests
12. Backend documentation
13. Doctor module
14. Patient module
15. Services module
16. Appointment module
17. Payment module
18. Review module
19. Admin dashboard
20. Frontend API integration
21. Production hardening and deployment readiness

## Global Definition Of Done

Each feature is done only when:

- It follows `docs/ARCHITECTURE.md`.
- It follows `docs/CONSTRAINTS.md`.
- It follows `docs/PROJECT_DEFINITION.md`.
- It follows `docs/PROJECT_SETUP.md`.
- It follows this `docs/DEVELOPMENT_PLAN.md`.
- It uses environment variables, not hardcoded secrets.
- Database changes use Alembic migrations.
- Request and response validation uses Pydantic schemas.
- Protected routes use authentication dependencies.
- API routes stay under `/api/v1`.
- Tests are added or updated where needed.
- `python -m compileall app tests` passes.
- `pytest` passes where applicable.
- Manual checklist is completed.
- No real secrets are committed.

## Prompt Rules For Codex

Every feature prompt must start with:

```text
Before making any changes:

1. Read docs/ARCHITECTURE.md completely.
2. Read docs/CONSTRAINTS.md completely.
3. Read docs/PROJECT_DEFINITION.md completely.
4. Read docs/PROJECT_SETUP.md completely.
5. Read docs/DEVELOPMENT_PLAN.md completely.

These five documents are the source of truth for the project.

Follow all architecture decisions, constraints, project requirements, setup standards, development workflows, testing requirements, security requirements, and implementation order defined in those documents.

If any instruction in this feature conflicts with those documents, explain the conflict before making changes.

Do not proceed until all documents have been reviewed.
```

Codex must always:

- List affected files before implementation.
- Explain the implementation plan.
- Implement incrementally.
- Avoid unrelated refactors.
- Add or update tests when required.
- Run the feature-specific Checking And Testing Workflow.
- Run verification commands.
- Report manual test steps.
- Treat testing and checking as mandatory for every feature.
- Do not mark a feature complete until required checks pass.
- If any check cannot be run, explain why and provide the exact manual command the user should run.
- If frontend files are changed, run the frontend checking workflow:
  `cd frontend`
  `npm install`
  `npm run lint`
  `npm run build`
  `npm run test`, if tests exist
- Explain exactly what changed.

## Feature 1: Project Foundation And Backend Verification

### Goal

Confirm that the existing FastAPI backend foundation is structurally correct, runnable, and aligned with the architecture before new business features are added.

### Scope

- Verify `backend/app/main.py`
- Verify versioned router registration under `/api/v1`
- Verify backend package layout under `app/api`, `app/core`, `app/database`, `app/models`, `app/schemas`, `app/services`, `app/repositories`, and `app/redis`
- Verify health routes and local startup flow
- Identify missing structural pieces without introducing unrelated rewrites

### Security Checks

- Confirm no secrets are hardcoded in route files
- Confirm CORS values come from configuration
- Confirm no protected data is exposed by health endpoints

### Scaling Decisions

- Keep route handlers thin from the start
- Preserve service and repository separation so later modules can grow cleanly
- Keep API versioning stable under `/api/v1`

### Automated Tests

- Run `python -m compileall app tests`
- Run `pytest`
- Verify health route coverage exists and passes

### Checking And Testing Workflow

Frontend checks, if frontend files are changed:

```bash
cd frontend
npm install
npm run lint
npm run build
```

If frontend tests exist, also run:

```bash
npm run test
```

Backend checks:

```bash
cd backend
source .venv/bin/activate
python -m compileall app tests
pytest
```

Backend runtime checks:

```bash
python -m uvicorn app.main:app --reload
```

How to test manually:

- Start the backend with the documented command and confirm application startup completes without import or settings errors.
- Open `/docs` and confirm the FastAPI schema loads and the versioned router is present.
- Call `GET /health` and confirm it returns the expected success JSON shape.
- Call `GET /api/v1/health` and confirm it returns the expected success JSON shape.
- Confirm no unexpected routes are mounted outside the intended public root and `/api/v1` structure.

### Manual Checklist

- Confirm the backend process starts successfully from `app.main:app`.
- Confirm Swagger UI loads without client-side errors.
- Confirm `GET /health` responds with the documented health payload.
- Confirm `GET /api/v1/health` responds with the documented health payload.
- Confirm router registration works without structural import errors.

### Agent Prompt

Before making any changes:

1. Read `docs/ARCHITECTURE.md` completely.
2. Read `docs/CONSTRAINTS.md` completely.
3. Read `docs/PROJECT_DEFINITION.md` completely.
4. Read `docs/PROJECT_SETUP.md` completely.
5. Read `docs/DEVELOPMENT_PLAN.md` completely.

These five documents are the source of truth for the project.

Follow all architecture decisions, constraints, project requirements, setup standards, development workflows, testing requirements, security requirements, and implementation order defined in those documents.

If any instruction in this feature conflicts with those documents, explain the conflict before making changes.

Do not proceed until all documents have been reviewed.

Testing and checking are mandatory for this feature.
Run this feature's Checking And Testing Workflow before reporting completion.
Manual QA is mandatory.
After automated checks pass, perform this feature's Manual QA checks.
Report every manual check as passed, failed, or not applicable.
Do not mark the feature complete unless manual QA has been reported clearly.
Do not mark the feature complete until required checks pass.
If any check cannot be run, explain why and provide the exact manual command I should run.

If frontend files are changed, run the frontend checking workflow:
`cd frontend`
`npm install`
`npm run lint`
`npm run build`
`npm run test`, if tests exist

Review the current FastAPI backend foundation and verify it matches the documented architecture. Focus only on backend foundation verification, package structure, health routes, and router organization. If changes are needed, keep them small and limited to backend structure, health checks, or startup wiring. List affected files before implementation, explain the plan, implement incrementally, run `python -m compileall app tests` and `pytest`, and report manual verification steps.

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

## Feature 2: Environment Config And Database Setup

### Goal

Ensure configuration is environment-driven and the backend can connect to PostgreSQL consistently in local and container-based development.

### Scope

- Verify `app/core/config.py`
- Verify `.env.example` values and naming
- Verify `DATABASE_URL`, `ENVIRONMENT`, and `BACKEND_CORS_ORIGINS`
- Verify SQLAlchemy engine and session setup
- Verify alignment between local setup docs and backend config

### Security Checks

- Confirm secrets remain environment-driven
- Confirm default example secrets are placeholders only
- Confirm no production credentials are committed

### Scaling Decisions

- Centralize configuration in `core`
- Keep environment parsing strict enough to catch missing values early
- Support independent frontend and backend deployment through config

### Automated Tests

- Run `python -m compileall app tests`
- Run `pytest`
- Add targeted config or connection tests only if logic is introduced

### Checking And Testing Workflow

Frontend checks, if frontend files are changed:

```bash
cd frontend
npm install
npm run lint
npm run build
```

If frontend tests exist, also run:

```bash
npm run test
```

Backend checks:

```bash
cd backend
source .venv/bin/activate
python -m compileall app tests
pytest
```

Backend runtime checks:

```bash
python -m uvicorn app.main:app --reload
```

How to test manually:

- Copy `.env.example` to `.env` and confirm each documented backend variable is present with the expected name.
- Start the backend and confirm settings load successfully from the environment without fallback or parsing errors.
- Verify the backend is using the intended `DATABASE_URL` format for PostgreSQL and the intended `BACKEND_CORS_ORIGINS` values.
- Confirm the documented local PostgreSQL, Redis, and backend port values still match the setup instructions.
- Confirm the documented Docker Compose values remain consistent with the backend configuration expectations.

### Manual Checklist

- Confirm `.env.example` and the setup document list the same backend environment variables.
- Confirm the backend starts successfully with environment-driven settings.
- Confirm PostgreSQL connection settings match the intended local or container workflow.
- Confirm CORS origins are sourced from configuration rather than hardcoded values.
- Confirm Docker-related configuration notes still match the documented local setup.

### Agent Prompt

Before making any changes:

1. Read `docs/ARCHITECTURE.md` completely.
2. Read `docs/CONSTRAINTS.md` completely.
3. Read `docs/PROJECT_DEFINITION.md` completely.
4. Read `docs/PROJECT_SETUP.md` completely.
5. Read `docs/DEVELOPMENT_PLAN.md` completely.

These five documents are the source of truth for the project.

Follow all architecture decisions, constraints, project requirements, setup standards, development workflows, testing requirements, security requirements, and implementation order defined in those documents.

If any instruction in this feature conflicts with those documents, explain the conflict before making changes.

Do not proceed until all documents have been reviewed.

Testing and checking are mandatory for this feature.
Run this feature's Checking And Testing Workflow before reporting completion.
Manual QA is mandatory.
After automated checks pass, perform this feature's Manual QA checks.
Report every manual check as passed, failed, or not applicable.
Do not mark the feature complete unless manual QA has been reported clearly.
Do not mark the feature complete until required checks pass.
If any check cannot be run, explain why and provide the exact manual command I should run.

If frontend files are changed, run the frontend checking workflow:
`cd frontend`
`npm install`
`npm run lint`
`npm run build`
`npm run test`, if tests exist

Validate and improve the backend environment configuration and database setup. Keep all secrets in environment variables, confirm `pydantic-settings` usage is correct, and ensure PostgreSQL connectivity is configured through SQLAlchemy only. Do not introduce new infrastructure patterns. List affected files first, explain the plan, implement incrementally, run `python -m compileall app tests` and `pytest`, and report manual setup checks.

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

## Feature 3: Alembic Migration Setup

### Goal

Make sure Alembic is the only schema-change workflow and that migrations correctly discover SQLAlchemy metadata.

### Scope

- Verify `backend/alembic.ini`
- Verify `backend/alembic/env.py`
- Verify model imports through `app.models`
- Confirm migration generation and upgrade flow
- Standardize migration review expectations

### Security Checks

- Confirm migrations do not embed secrets
- Confirm database URLs come from settings, not hardcoded values

### Scaling Decisions

- Keep migration discovery automatic through shared metadata
- Maintain a repeatable migration workflow for all future modules

### Automated Tests

- Run `python -m compileall app tests`
- Run `pytest`
- Run Alembic commands manually when schema changes are introduced

### Checking And Testing Workflow

Frontend checks, if frontend files are changed:

```bash
cd frontend
npm install
npm run lint
npm run build
```

If frontend tests exist, also run:

```bash
npm run test
```

Backend checks:

```bash
cd backend
source .venv/bin/activate
python -m compileall app tests
pytest
```

Database checks:

```bash
cd backend
source .venv/bin/activate
alembic revision --autogenerate -m "migration message"
alembic upgrade head
alembic current
```

How to test manually:

- Run the documented Alembic commands in a safe development database context and review the generated migration content before applying it.
- Confirm the generated migration references the expected SQLAlchemy metadata changes instead of unrelated tables or empty diffs.
- Apply the migration and confirm Alembic reaches the expected head revision without errors.
- Inspect Alembic state with `alembic current` and confirm the database revision matches the applied migration.
- Confirm the migration workflow still depends on `app.models` imports rather than manual table creation.

### Manual Checklist

- Confirm Alembic reads `DATABASE_URL` from backend settings rather than a hardcoded value.
- Confirm autogeneration can discover SQLAlchemy metadata through `app.models`.
- Confirm the reviewed migration contains only the expected schema operations.
- Confirm `alembic upgrade head` succeeds on the target development database.
- Confirm `alembic current` reports the expected revision after upgrade.

### Agent Prompt

Before making any changes:

1. Read `docs/ARCHITECTURE.md` completely.
2. Read `docs/CONSTRAINTS.md` completely.
3. Read `docs/PROJECT_DEFINITION.md` completely.
4. Read `docs/PROJECT_SETUP.md` completely.
5. Read `docs/DEVELOPMENT_PLAN.md` completely.

These five documents are the source of truth for the project.

Follow all architecture decisions, constraints, project requirements, setup standards, development workflows, testing requirements, security requirements, and implementation order defined in those documents.

If any instruction in this feature conflicts with those documents, explain the conflict before making changes.

Do not proceed until all documents have been reviewed.

Testing and checking are mandatory for this feature.
Run this feature's Checking And Testing Workflow before reporting completion.
Manual QA is mandatory.
After automated checks pass, perform this feature's Manual QA checks.
Report every manual check as passed, failed, or not applicable.
Do not mark the feature complete unless manual QA has been reported clearly.
Do not mark the feature complete until required checks pass.
If any check cannot be run, explain why and provide the exact manual command I should run.

If frontend files are changed, run the frontend checking workflow:
`cd frontend`
`npm install`
`npm run lint`
`npm run build`
`npm run test`, if tests exist

Review and harden the Alembic migration setup so all schema changes flow through Alembic and SQLAlchemy metadata discovery works reliably. Keep the solution simple and beginner-readable. List affected files first, explain the plan, implement incrementally, run `python -m compileall app tests` and `pytest`, and report the manual migration commands used for verification.

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

## Feature 4: User Model And Schemas

### Goal

Define the `users` domain model and Pydantic schemas that support registration, login, read, and update flows.

### Scope

- Verify or refine `app/models/user.py`
- Verify or refine `app/schemas/user.py`
- Confirm field names, validation rules, defaults, and role handling
- Keep schema output free of internal secrets

### Security Checks

- Never expose `hashed_password`
- Validate password input properly
- Keep role handling explicit and predictable

### Scaling Decisions

- Model `users` as the platform account base for future patients, admins, and possibly doctors
- Keep schemas separated by use case so future modules stay maintainable

### Automated Tests

- Run `python -m compileall app tests`
- Run `pytest`
- Add tests for schema validation if new validation rules are introduced

### Checking And Testing Workflow

Frontend checks, if frontend files are changed:

```bash
cd frontend
npm install
npm run lint
npm run build
```

If frontend tests exist, also run:

```bash
npm run test
```

Backend checks:

```bash
cd backend
source .venv/bin/activate
python -m compileall app tests
pytest
```

How to test manually:

- Confirm `UserCreate` exposes only `full_name`, `email`, and `password`.
- Confirm `UserLogin` exposes only the login credential fields required by the auth flow.
- Confirm `UserRead` exposes only `id`, `full_name`, `email`, `role`, `is_active`, `is_verified`, `created_at`, and `updated_at`.
- Confirm `hashed_password` is not present in output schemas or serialized read responses.
- Confirm email validation and normalization behave as intended.
- Confirm the model uses a UUID-backed `id` and that boolean defaults and role defaults align with the model definition.

### Manual Checklist

- Confirm create and login schemas contain only the intended request fields.
- Confirm read schemas exclude secret fields, especially `hashed_password`.
- Confirm update schemas allow only intended user-editable fields.
- Confirm UUID-backed IDs are represented consistently between model and schema.
- Confirm email handling, role handling, and boolean defaults align with the documented user model.

### Agent Prompt

Before making any changes:

1. Read `docs/ARCHITECTURE.md` completely.
2. Read `docs/CONSTRAINTS.md` completely.
3. Read `docs/PROJECT_DEFINITION.md` completely.
4. Read `docs/PROJECT_SETUP.md` completely.
5. Read `docs/DEVELOPMENT_PLAN.md` completely.

These five documents are the source of truth for the project.

Follow all architecture decisions, constraints, project requirements, setup standards, development workflows, testing requirements, security requirements, and implementation order defined in those documents.

If any instruction in this feature conflicts with those documents, explain the conflict before making changes.

Do not proceed until all documents have been reviewed.

Testing and checking are mandatory for this feature.
Run this feature's Checking And Testing Workflow before reporting completion.
Manual QA is mandatory.
After automated checks pass, perform this feature's Manual QA checks.
Report every manual check as passed, failed, or not applicable.
Do not mark the feature complete unless manual QA has been reported clearly.
Do not mark the feature complete until required checks pass.
If any check cannot be run, explain why and provide the exact manual command I should run.

If frontend files are changed, run the frontend checking workflow:
`cd frontend`
`npm install`
`npm run lint`
`npm run build`
`npm run test`, if tests exist

Implement or refine the `users` SQLAlchemy model and related Pydantic schemas for create, login, read, and update flows. Keep the model beginner-readable, keep schemas separate from ORM models, and do not expose internal secrets. List affected files first, explain the plan, implement incrementally, run `python -m compileall app tests` and `pytest`, and report manual schema checks.

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

## Feature 5: Users Table Migration

### Goal

Create or validate the Alembic migration for the `users` table.

### Scope

- Generate or review the migration for `users`
- Confirm indexes, uniqueness constraints, defaults, and nullability
- Confirm the migration matches the SQLAlchemy model

### Security Checks

- Confirm password storage is represented as `hashed_password`
- Confirm no plaintext credential columns exist

### Scaling Decisions

- Use a stable primary key strategy
- Include fields that support future activation, verification, and role-based access

### Automated Tests

- Run `python -m compileall app tests`
- Run `pytest`
- Apply migrations in development and confirm the schema upgrades cleanly

### Checking And Testing Workflow

Frontend checks, if frontend files are changed:

```bash
cd frontend
npm install
npm run lint
npm run build
```

If frontend tests exist, also run:

```bash
npm run test
```

Backend checks:

```bash
cd backend
source .venv/bin/activate
python -m compileall app tests
pytest
```

Database checks:

```bash
cd backend
source .venv/bin/activate
alembic revision --autogenerate -m "migration message"
alembic upgrade head
alembic current
```

How to test manually:

- Review the `users` migration before applying it and confirm it creates only the expected table, columns, indexes, and constraints.
- Apply the migration and inspect the resulting `users` table in PostgreSQL or pgAdmin.
- Confirm the `id`, `email`, `hashed_password`, `role`, `is_active`, `is_verified`, `created_at`, and `updated_at` columns match the model.
- Confirm the email uniqueness and index behavior are present in the actual database schema.
- Confirm no plaintext password column or other secret-bearing column exists.

### Manual Checklist

- Confirm the migration file matches the intended `users` model exactly.
- Confirm `alembic upgrade head` creates or updates the `users` table successfully.
- Confirm the resulting table uses the expected primary key, uniqueness, nullability, and server defaults.
- Confirm email is indexed and unique in the database.
- Confirm only `hashed_password` exists for password storage.

### Agent Prompt

Before making any changes:

1. Read `docs/ARCHITECTURE.md` completely.
2. Read `docs/CONSTRAINTS.md` completely.
3. Read `docs/PROJECT_DEFINITION.md` completely.
4. Read `docs/PROJECT_SETUP.md` completely.
5. Read `docs/DEVELOPMENT_PLAN.md` completely.

These five documents are the source of truth for the project.

Follow all architecture decisions, constraints, project requirements, setup standards, development workflows, testing requirements, security requirements, and implementation order defined in those documents.

If any instruction in this feature conflicts with those documents, explain the conflict before making changes.

Do not proceed until all documents have been reviewed.

Testing and checking are mandatory for this feature.
Run this feature's Checking And Testing Workflow before reporting completion.
Manual QA is mandatory.
After automated checks pass, perform this feature's Manual QA checks.
Report every manual check as passed, failed, or not applicable.
Do not mark the feature complete unless manual QA has been reported clearly.
Do not mark the feature complete until required checks pass.
If any check cannot be run, explain why and provide the exact manual command I should run.

If frontend files are changed, run the frontend checking workflow:
`cd frontend`
`npm install`
`npm run lint`
`npm run build`
`npm run test`, if tests exist

Create or validate the Alembic migration for the `users` table so it matches the documented user model. Use Alembic only, keep naming and defaults clear, and make sure the migration is safe and reviewable. List affected files first, explain the plan, implement incrementally, run `python -m compileall app tests` and `pytest`, and report the manual migration verification steps.

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

## Feature 6: Password Security And JWT Utilities

### Goal

Provide reusable password hashing, password verification, JWT creation, and JWT decoding utilities.

### Scope

- Verify or refine `app/core/security.py`
- Standardize JWT claims and expiration handling
- Keep utility functions reusable by services and dependencies

### Security Checks

- Use secure password hashing
- Sign JWTs with `SECRET_KEY`
- Enforce expiration
- Reject invalid tokens consistently

### Scaling Decisions

- Keep token logic isolated in reusable utilities
- Use stable JWT structure that can support future role claims if needed

### Automated Tests

- Run `python -m compileall app tests`
- Run `pytest`
- Add tests for token creation, token decoding, and password verification behavior

### Checking And Testing Workflow

Frontend checks, if frontend files are changed:

```bash
cd frontend
npm install
npm run lint
npm run build
```

If frontend tests exist, also run:

```bash
npm run test
```

Backend checks:

```bash
cd backend
source .venv/bin/activate
python -m compileall app tests
pytest
```

How to test manually:

- Hash a known password and confirm the stored hash differs from the plaintext input.
- Verify that password verification succeeds for the correct plaintext password and fails for an incorrect one.
- Create a valid JWT and confirm it includes the expected subject and expiration behavior.
- Decode a valid JWT and confirm the expected payload can be read successfully.
- Try an invalid or expired JWT and confirm it is rejected consistently.
- Confirm expiration behavior follows `ACCESS_TOKEN_EXPIRE_MINUTES` rather than a hardcoded value.

### Manual Checklist

- Confirm hashing never stores or returns plaintext passwords.
- Confirm password verification succeeds only for the correct password.
- Confirm valid tokens decode successfully and contain the expected claims.
- Confirm invalid or expired tokens are rejected.
- Confirm token expiration comes from backend configuration.

### Agent Prompt

Before making any changes:

1. Read `docs/ARCHITECTURE.md` completely.
2. Read `docs/CONSTRAINTS.md` completely.
3. Read `docs/PROJECT_DEFINITION.md` completely.
4. Read `docs/PROJECT_SETUP.md` completely.
5. Read `docs/DEVELOPMENT_PLAN.md` completely.

These five documents are the source of truth for the project.

Follow all architecture decisions, constraints, project requirements, setup standards, development workflows, testing requirements, security requirements, and implementation order defined in those documents.

If any instruction in this feature conflicts with those documents, explain the conflict before making changes.

Do not proceed until all documents have been reviewed.

Testing and checking are mandatory for this feature.
Run this feature's Checking And Testing Workflow before reporting completion.
Manual QA is mandatory.
After automated checks pass, perform this feature's Manual QA checks.
Report every manual check as passed, failed, or not applicable.
Do not mark the feature complete unless manual QA has been reported clearly.
Do not mark the feature complete until required checks pass.
If any check cannot be run, explain why and provide the exact manual command I should run.

If frontend files are changed, run the frontend checking workflow:
`cd frontend`
`npm install`
`npm run lint`
`npm run build`
`npm run test`, if tests exist

Implement or harden the backend password security and JWT utility layer. Keep hashing and token logic reusable, configuration-driven, and separate from route code. Do not hardcode secrets or expiration values. List affected files first, explain the plan, implement incrementally, run `python -m compileall app tests` and `pytest`, and report manual verification steps for hashing and JWT behavior.

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

## Feature 7: Auth Dependencies

### Goal

Implement reusable authentication dependencies for bearer token parsing, current-user loading, and active-user enforcement.

### Scope

- Verify or refine `app/api/deps.py`
- Decode bearer tokens
- Load the current user from the database
- Reject invalid, missing, inactive, or unauthorized users consistently
- Prepare reusable role-check helpers

### Security Checks

- Do not place auth logic directly in route handlers
- Reject invalid or expired tokens
- Enforce active-user checks
- Avoid leaking internal auth error details

### Scaling Decisions

- Keep auth reusable for all future protected modules
- Structure role checks so admin restrictions can be added cleanly later

### Automated Tests

- Run `python -m compileall app tests`
- Run `pytest`
- Add dependency-level or route-level auth tests for missing, invalid, and inactive users

### Checking And Testing Workflow

Frontend checks, if frontend files are changed:

```bash
cd frontend
npm install
npm run lint
npm run build
```

If frontend tests exist, also run:

```bash
npm run test
```

Backend checks:

```bash
cd backend
source .venv/bin/activate
python -m compileall app tests
pytest
```

Backend runtime checks:

```bash
python -m uvicorn app.main:app --reload
```

How to test manually:

- Open Swagger for a protected route and call it without a bearer token to confirm the expected unauthorized response.
- Call the same protected route with an invalid or malformed token and confirm the expected unauthorized response.
- Call the protected route with a valid token and confirm the current user is loaded successfully.
- Test with an inactive user account, if available, and confirm active-user enforcement rejects access consistently.
- Verify any admin-only dependency rejects non-admin users and allows admin users when present.

### Manual Checklist

- Confirm missing bearer tokens are rejected consistently.
- Confirm invalid or expired tokens are rejected consistently.
- Confirm valid tokens resolve the correct current user.
- Confirm inactive users are blocked from active-user-only routes.
- Confirm admin-only dependency behavior matches the documented access rules.

### Agent Prompt

Before making any changes:

1. Read `docs/ARCHITECTURE.md` completely.
2. Read `docs/CONSTRAINTS.md` completely.
3. Read `docs/PROJECT_DEFINITION.md` completely.
4. Read `docs/PROJECT_SETUP.md` completely.
5. Read `docs/DEVELOPMENT_PLAN.md` completely.

These five documents are the source of truth for the project.

Follow all architecture decisions, constraints, project requirements, setup standards, development workflows, testing requirements, security requirements, and implementation order defined in those documents.

If any instruction in this feature conflicts with those documents, explain the conflict before making changes.

Do not proceed until all documents have been reviewed.

Testing and checking are mandatory for this feature.
Run this feature's Checking And Testing Workflow before reporting completion.
Manual QA is mandatory.
After automated checks pass, perform this feature's Manual QA checks.
Report every manual check as passed, failed, or not applicable.
Do not mark the feature complete unless manual QA has been reported clearly.
Do not mark the feature complete until required checks pass.
If any check cannot be run, explain why and provide the exact manual command I should run.

If frontend files are changed, run the frontend checking workflow:
`cd frontend`
`npm install`
`npm run lint`
`npm run build`
`npm run test`, if tests exist

Implement or refine reusable authentication dependencies for current-user lookup and active-user enforcement. Keep authentication out of route handlers and make the dependency behavior consistent across future protected routes. List affected files first, explain the plan, implement incrementally, run `python -m compileall app tests` and `pytest`, and report manual protected-route checks.

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

## Feature 8: Authentication Routes

### Goal

Implement secure registration, login, and current-user routes under `/api/v1/auth`.

### Scope

- Verify or refine `app/api/v1/routes/auth.py`
- Verify or refine `app/services/auth_service.py`
- Verify or refine `app/repositories/user_repository.py`
- Keep route handlers thin
- Return schema-based responses only

### Security Checks

- Do not return password hashes
- Verify passwords before issuing tokens
- Prevent duplicate user registration by email
- Return consistent auth failures

### Scaling Decisions

- Keep auth business logic in services
- Keep database access organized through repositories where useful
- Use response models that can be reused by future frontend integration

### Automated Tests

- Run `python -m compileall app tests`
- Run `pytest`
- Add tests for register, login, duplicate email, bad credentials, and `/me`

### Checking And Testing Workflow

Frontend checks, if frontend files are changed:

```bash
cd frontend
npm install
npm run lint
npm run build
```

If frontend tests exist, also run:

```bash
npm run test
```

Backend checks:

```bash
cd backend
source .venv/bin/activate
python -m compileall app tests
pytest
```

Backend runtime checks:

```bash
python -m uvicorn app.main:app --reload
```

How to test manually:

- Open Swagger and register a new user with valid input.
- Confirm duplicate registration with the same email returns the expected error response and does not create a second account.
- Log in with valid credentials and confirm an access token is returned in the expected schema shape.
- Log in with invalid credentials and confirm the expected authentication failure response is returned.
- Call `/api/v1/auth/me` with the valid token and confirm the correct user profile is returned.
- Confirm register, login, and `/me` responses never expose `hashed_password`.

### Manual Checklist

- Confirm registration succeeds for a new valid email.
- Confirm duplicate email registration is rejected predictably.
- Confirm login returns a usable bearer token for valid credentials.
- Confirm bad credentials return the expected error shape.
- Confirm `/api/v1/auth/me` returns only the intended user fields.
- Confirm auth responses do not include secret fields.

### Agent Prompt

Before making any changes:

1. Read `docs/ARCHITECTURE.md` completely.
2. Read `docs/CONSTRAINTS.md` completely.
3. Read `docs/PROJECT_DEFINITION.md` completely.
4. Read `docs/PROJECT_SETUP.md` completely.
5. Read `docs/DEVELOPMENT_PLAN.md` completely.

These five documents are the source of truth for the project.

Follow all architecture decisions, constraints, project requirements, setup standards, development workflows, testing requirements, security requirements, and implementation order defined in those documents.

If any instruction in this feature conflicts with those documents, explain the conflict before making changes.

Do not proceed until all documents have been reviewed.

Testing and checking are mandatory for this feature.
Run this feature's Checking And Testing Workflow before reporting completion.
Manual QA is mandatory.
After automated checks pass, perform this feature's Manual QA checks.
Report every manual check as passed, failed, or not applicable.
Do not mark the feature complete unless manual QA has been reported clearly.
Do not mark the feature complete until required checks pass.
If any check cannot be run, explain why and provide the exact manual command I should run.

If frontend files are changed, run the frontend checking workflow:
`cd frontend`
`npm install`
`npm run lint`
`npm run build`
`npm run test`, if tests exist

Implement or refine the authentication routes and supporting service and repository logic for register, login, and current-user behavior. Keep routes thin, keep business logic in services, validate requests and responses with Pydantic schemas, and keep all routes under `/api/v1/auth`. List affected files first, explain the plan, implement incrementally, run `python -m compileall app tests` and `pytest`, and report manual auth flow checks.

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

## Feature 9: Middleware

### Goal

Introduce only the middleware that is needed for stable request handling and future observability without overengineering.

### Scope

- Review current middleware registration
- Keep CORS middleware correct
- Add lightweight request/response middleware only if clearly needed
- Reserve structure for future logging, timing, correlation IDs, or audit hooks

### Security Checks

- Confirm CORS is environment-driven
- Avoid exposing sensitive request details in logs
- Avoid adding middleware that changes auth behavior unexpectedly

### Scaling Decisions

- Keep middleware minimal and composable
- Prefer explicit additions over broad framework magic

### Automated Tests

- Run `python -m compileall app tests`
- Run `pytest`
- Add focused middleware tests only if new behavior is introduced

### Checking And Testing Workflow

Frontend checks, if frontend files are changed:

```bash
cd frontend
npm install
npm run lint
npm run build
```

If frontend tests exist, also run:

```bash
npm run test
```

Backend checks:

```bash
cd backend
source .venv/bin/activate
python -m compileall app tests
pytest
```

Backend runtime checks:

```bash
python -m uvicorn app.main:app --reload
```

How to test manually:

- Start the backend and confirm middleware registration does not break application startup.
- Send requests from an allowed frontend origin and confirm the expected CORS headers are present.
- Confirm disallowed or unexpected origins are not treated as allowed by mistake.
- Re-test health and authentication routes after middleware changes and confirm their behavior is unchanged.
- Confirm middleware does not log or expose sensitive request details in responses.

### Manual Checklist

- Confirm allowed origins receive the expected CORS behavior.
- Confirm versioned routes under `/api/v1` still respond normally.
- Confirm health routes still return the expected payloads.
- Confirm auth routes still behave the same after middleware changes.
- Confirm middleware does not leak sensitive information.

### Agent Prompt

Before making any changes:

1. Read `docs/ARCHITECTURE.md` completely.
2. Read `docs/CONSTRAINTS.md` completely.
3. Read `docs/PROJECT_DEFINITION.md` completely.
4. Read `docs/PROJECT_SETUP.md` completely.
5. Read `docs/DEVELOPMENT_PLAN.md` completely.

These five documents are the source of truth for the project.

Follow all architecture decisions, constraints, project requirements, setup standards, development workflows, testing requirements, security requirements, and implementation order defined in those documents.

If any instruction in this feature conflicts with those documents, explain the conflict before making changes.

Do not proceed until all documents have been reviewed.

Testing and checking are mandatory for this feature.
Run this feature's Checking And Testing Workflow before reporting completion.
Manual QA is mandatory.
After automated checks pass, perform this feature's Manual QA checks.
Report every manual check as passed, failed, or not applicable.
Do not mark the feature complete unless manual QA has been reported clearly.
Do not mark the feature complete until required checks pass.
If any check cannot be run, explain why and provide the exact manual command I should run.

If frontend files are changed, run the frontend checking workflow:
`cd frontend`
`npm install`
`npm run lint`
`npm run build`
`npm run test`, if tests exist

Review and improve backend middleware only where necessary. Preserve working behavior, keep CORS configuration environment-driven, and avoid introducing unnecessary infrastructure. List affected files first, explain the plan, implement incrementally, run `python -m compileall app tests` and `pytest`, and report manual route checks after the middleware work.

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

## Feature 10: Redis Setup And Health Check

### Goal

Verify Redis integration, startup behavior, and health visibility without treating Redis as a source of truth.

### Scope

- Verify `app/redis/client.py`
- Verify backend startup and shutdown handling
- Confirm Redis ping behavior
- Optionally expand health visibility if needed without exposing secrets

### Security Checks

- Keep Redis URL in environment config
- Avoid exposing internal connection details in public responses
- Do not place business-critical persistence in Redis

### Scaling Decisions

- Keep Redis integration reusable for future caching and throttling
- Allow temporary Redis outages to fail gracefully where appropriate

### Automated Tests

- Run `python -m compileall app tests`
- Run `pytest`
- Add tests for Redis-related behavior only if logic changes are introduced

### Checking And Testing Workflow

Frontend checks, if frontend files are changed:

```bash
cd frontend
npm install
npm run lint
npm run build
```

If frontend tests exist, also run:

```bash
npm run test
```

Backend checks:

```bash
cd backend
source .venv/bin/activate
python -m compileall app tests
pytest
```

Backend runtime checks:

```bash
python -m uvicorn app.main:app --reload
```

Redis checks:

```bash
redis-cli ping
```

How to test manually:

- Start Redis, then start the backend and confirm startup completes and Redis-dependent startup logic behaves as expected.
- Call the health endpoints with Redis available and confirm public responses remain stable and do not expose connection secrets.
- Temporarily stop Redis and restart or retest the backend to confirm behavior matches the intended graceful-degradation design.
- Confirm health responses remain predictable even when Redis is unavailable.
- Confirm Redis connection strings or internal details are not exposed in public API responses.

### Manual Checklist

- Confirm the backend boots normally when Redis is available.
- Confirm the documented fallback behavior occurs when Redis is unavailable.
- Confirm public health endpoints still return predictable responses.
- Confirm Redis is treated as support infrastructure rather than the source of truth.
- Confirm no Redis connection secrets appear in responses.

### Agent Prompt

Before making any changes:

1. Read `docs/ARCHITECTURE.md` completely.
2. Read `docs/CONSTRAINTS.md` completely.
3. Read `docs/PROJECT_DEFINITION.md` completely.
4. Read `docs/PROJECT_SETUP.md` completely.
5. Read `docs/DEVELOPMENT_PLAN.md` completely.

These five documents are the source of truth for the project.

Follow all architecture decisions, constraints, project requirements, setup standards, development workflows, testing requirements, security requirements, and implementation order defined in those documents.

If any instruction in this feature conflicts with those documents, explain the conflict before making changes.

Do not proceed until all documents have been reviewed.

Testing and checking are mandatory for this feature.
Run this feature's Checking And Testing Workflow before reporting completion.
Manual QA is mandatory.
After automated checks pass, perform this feature's Manual QA checks.
Report every manual check as passed, failed, or not applicable.
Do not mark the feature complete unless manual QA has been reported clearly.
Do not mark the feature complete until required checks pass.
If any check cannot be run, explain why and provide the exact manual command I should run.

If frontend files are changed, run the frontend checking workflow:
`cd frontend`
`npm install`
`npm run lint`
`npm run build`
`npm run test`, if tests exist

Review and harden Redis integration and health-check behavior. Redis should support caching and short-lived state only, and the backend should remain predictable when Redis is temporarily unavailable if that is the intended design. List affected files first, explain the plan, implement incrementally, run `python -m compileall app tests` and `pytest`, and report manual Redis verification steps.

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

## Feature 11: Backend Tests

### Goal

Establish a strong backend testing baseline before major domain modules are added.

### Scope

- Expand `pytest` coverage for health, auth, security utilities, and dependencies
- Keep tests focused on behavior
- Avoid fragile tests that depend on unrelated implementation details

### Security Checks

- Add tests that ensure protected routes reject unauthorized access
- Add tests that ensure sensitive fields are not returned

### Scaling Decisions

- Build reusable test utilities and fixtures carefully
- Keep test structure aligned with future domain modules

### Automated Tests

- Run `python -m compileall app tests`
- Run `pytest`
- Ensure new tests pass consistently in local development

### Checking And Testing Workflow

Frontend checks, if frontend files are changed:

```bash
cd frontend
npm install
npm run lint
npm run build
```

If frontend tests exist, also run:

```bash
npm run test
```

Backend checks:

```bash
cd backend
source .venv/bin/activate
python -m compileall app tests
pytest
```

How to test manually:

- Review the backend test files and confirm they cover current health, auth, dependency, and security-sensitive behavior introduced so far.
- Intentionally inspect test names and structure to confirm a junior developer can understand what each test verifies.
- Confirm the test suite includes coverage for unauthorized access paths and secret-field exclusion where those behaviors now exist.
- If a test fails during development, confirm the failure message clearly indicates what behavior regressed.

### Manual Checklist

- Confirm test names describe behavior rather than implementation details.
- Confirm test coverage maps to the expected user and security flows already implemented.
- Confirm sensitive-field and unauthorized-access coverage exists where applicable.
- Confirm failures are readable and actionable for junior developers.

### Agent Prompt

Before making any changes:

1. Read `docs/ARCHITECTURE.md` completely.
2. Read `docs/CONSTRAINTS.md` completely.
3. Read `docs/PROJECT_DEFINITION.md` completely.
4. Read `docs/PROJECT_SETUP.md` completely.
5. Read `docs/DEVELOPMENT_PLAN.md` completely.

These five documents are the source of truth for the project.

Follow all architecture decisions, constraints, project requirements, setup standards, development workflows, testing requirements, security requirements, and implementation order defined in those documents.

If any instruction in this feature conflicts with those documents, explain the conflict before making changes.

Do not proceed until all documents have been reviewed.

Testing and checking are mandatory for this feature.
Run this feature's Checking And Testing Workflow before reporting completion.
Manual QA is mandatory.
After automated checks pass, perform this feature's Manual QA checks.
Report every manual check as passed, failed, or not applicable.
Do not mark the feature complete unless manual QA has been reported clearly.
Do not mark the feature complete until required checks pass.
If any check cannot be run, explain why and provide the exact manual command I should run.

If frontend files are changed, run the frontend checking workflow:
`cd frontend`
`npm install`
`npm run lint`
`npm run build`
`npm run test`, if tests exist

Strengthen the backend test suite around the current foundation, authentication flows, and security-sensitive behavior. Keep tests readable, focused, and aligned with the FastAPI backend architecture. List affected files first, explain the plan, implement incrementally, run `python -m compileall app tests` and `pytest`, and report any manual checks that still remain.

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

## Feature 12: Backend Documentation

### Goal

Document the backend contracts and development workflow well enough that future feature work stays consistent.

### Scope

- Update backend-facing documentation only
- Document local backend run flow, auth routes, migration flow, and test flow
- Keep docs aligned with actual repo structure and commands

### Security Checks

- Do not place real secrets in documentation
- Keep example environment values clearly marked as placeholders

### Scaling Decisions

- Make backend documentation stable enough to support onboarding
- Keep command and route documentation easy to update as modules grow

### Automated Tests

- None required beyond normal compile/test checks unless code changes are included
- If backend code changes are made during doc alignment, run `python -m compileall app tests` and `pytest`

### Checking And Testing Workflow

Frontend checks, if frontend files are changed:

```bash
cd frontend
npm install
npm run lint
npm run build
```

If frontend tests exist, also run:

```bash
npm run test
```

Documentation and code-alignment checks:

- If this feature changes backend code to resolve a documentation mismatch, run the backend checks below.
- If this feature updates documentation only, record that backend command checks were not run because no backend files changed.

Backend checks when backend files change:

```bash
cd backend
source .venv/bin/activate
python -m compileall app tests
pytest
```

Backend runtime checks when startup or route documentation is verified against the running app:

```bash
python -m uvicorn app.main:app --reload
```

How to test manually:

- Follow the documented backend setup, run, migration, and test commands and confirm they still match the repository structure.
- Check the documented backend routes against the running FastAPI docs and confirm the listed entry points actually exist.
- Confirm the documentation explains the current auth, migration, and testing workflow accurately.
- Confirm documentation examples use placeholder secrets rather than real credentials.
- Confirm backend documentation does not reference missing files, wrong folders, or outdated commands.

### Manual Checklist

- Confirm the documented backend commands are executable as written.
- Confirm the documented routes exist in the running application.
- Confirm the docs match the actual backend folder structure.
- Confirm migration and auth instructions reflect the real workflow.
- Confirm no real secrets appear in documentation examples.

### Agent Prompt

Before making any changes:

1. Read `docs/ARCHITECTURE.md` completely.
2. Read `docs/CONSTRAINTS.md` completely.
3. Read `docs/PROJECT_DEFINITION.md` completely.
4. Read `docs/PROJECT_SETUP.md` completely.
5. Read `docs/DEVELOPMENT_PLAN.md` completely.

These five documents are the source of truth for the project.

Follow all architecture decisions, constraints, project requirements, setup standards, development workflows, testing requirements, security requirements, and implementation order defined in those documents.

If any instruction in this feature conflicts with those documents, explain the conflict before making changes.

Do not proceed until all documents have been reviewed.

Testing and checking are mandatory for this feature.
Run this feature's Checking And Testing Workflow before reporting completion.
Manual QA is mandatory.
After automated checks pass, perform this feature's Manual QA checks.
Report every manual check as passed, failed, or not applicable.
Do not mark the feature complete unless manual QA has been reported clearly.
Do not mark the feature complete until required checks pass.
If any check cannot be run, explain why and provide the exact manual command I should run.

If frontend files are changed, run the frontend checking workflow:
`cd frontend`
`npm install`
`npm run lint`
`npm run build`
`npm run test`, if tests exist

Improve backend-facing documentation so it accurately describes backend setup, migrations, testing, and API entry points. Keep the documentation aligned with the current FastAPI backend and avoid changing application code unless documentation reveals a small structural mismatch that must be corrected. List affected files first, explain the plan, implement incrementally, run verification commands if code changes are made, and report manual doc checks.

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

## Feature 13: Doctor Module

### Goal

Implement the doctor domain so patients can browse clinic doctor and specialist records.

### Scope

- Add `doctors` table, model, schemas, repository, service, and `/api/v1` routes
- Include public read flows and admin-managed write flows
- Represent profile data, specialties, bio, and availability-oriented fields as needed

### Security Checks

- Restrict create, update, and delete operations to admin-only access
- Validate all request payloads with Pydantic
- Do not expose internal-only fields publicly

### Scaling Decisions

- Design doctor data so future scheduling and review links can attach cleanly
- Keep query-heavy filtering logic in repositories

### Automated Tests

- Run `python -m compileall app tests`
- Run `pytest`
- Add tests for list, detail, create, update, and permission checks

### Checking And Testing Workflow

Frontend checks, if frontend files are changed:

```bash
cd frontend
npm install
npm run lint
npm run build
```

If frontend tests exist, also run:

```bash
npm run test
```

Backend checks:

```bash
cd backend
source .venv/bin/activate
python -m compileall app tests
pytest
```

Backend runtime checks:

```bash
python -m uvicorn app.main:app --reload
```

Database checks:

```bash
cd backend
source .venv/bin/activate
alembic revision --autogenerate -m "migration message"
alembic upgrade head
alembic current
```

How to test manually:

- Create one or more doctor records through the intended admin flow and confirm valid payloads are accepted.
- Call the public doctor list and detail endpoints and confirm the expected public-facing fields are returned.
- Attempt doctor create or update actions as a non-admin user and confirm access is rejected.
- Inspect the database or pgAdmin and confirm the `doctors` table exists with the expected columns and relationships.
- Confirm doctor profile, specialty, and availability-oriented fields serialize as intended for public reads.

### Manual Checklist

- Confirm admin users can create and update doctor records.
- Confirm public read endpoints return doctor list and detail data.
- Confirm non-admin users cannot manage doctor records.
- Confirm the `doctors` table matches the implemented model and migration.
- Confirm public doctor responses expose only intended fields.

### Agent Prompt

Before making any changes:

1. Read `docs/ARCHITECTURE.md` completely.
2. Read `docs/CONSTRAINTS.md` completely.
3. Read `docs/PROJECT_DEFINITION.md` completely.
4. Read `docs/PROJECT_SETUP.md` completely.
5. Read `docs/DEVELOPMENT_PLAN.md` completely.

These five documents are the source of truth for the project.

Follow all architecture decisions, constraints, project requirements, setup standards, development workflows, testing requirements, security requirements, and implementation order defined in those documents.

If any instruction in this feature conflicts with those documents, explain the conflict before making changes.

Do not proceed until all documents have been reviewed.

Testing and checking are mandatory for this feature.
Run this feature's Checking And Testing Workflow before reporting completion.
Manual QA is mandatory.
After automated checks pass, perform this feature's Manual QA checks.
Report every manual check as passed, failed, or not applicable.
Do not mark the feature complete unless manual QA has been reported clearly.
Do not mark the feature complete until required checks pass.
If any check cannot be run, explain why and provide the exact manual command I should run.

If frontend files are changed, run the frontend checking workflow:
`cd frontend`
`npm install`
`npm run lint`
`npm run build`
`npm run test`, if tests exist

Implement the Doctor module in the FastAPI backend using SQLAlchemy models, Pydantic schemas, Alembic migrations, service-layer business logic, and versioned REST routes under `/api/v1`. Support public doctor discovery and admin-restricted management operations. List affected files first, explain the plan, implement incrementally, run `python -m compileall app tests` and `pytest`, and report manual doctor-module checks.

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

## Feature 14: Patient Module

### Goal

Implement patient-specific records and link them safely to platform user accounts where appropriate.

### Scope

- Add `patients` table, model, schemas, repository, service, and routes
- Define relationship to `users`
- Support admin and patient-facing access rules as appropriate

### Security Checks

- Protect patient-specific records carefully
- Prevent one patient from reading another patient’s data
- Keep public access disabled for patient records

### Scaling Decisions

- Keep patient data structure ready for future profile expansion
- Separate account identity from patient-domain details cleanly

### Automated Tests

- Run `python -m compileall app tests`
- Run `pytest`
- Add tests for ownership, admin access, and patient record validation

### Checking And Testing Workflow

Frontend checks, if frontend files are changed:

```bash
cd frontend
npm install
npm run lint
npm run build
```

If frontend tests exist, also run:

```bash
npm run test
```

Backend checks:

```bash
cd backend
source .venv/bin/activate
python -m compileall app tests
pytest
```

Backend runtime checks:

```bash
python -m uvicorn app.main:app --reload
```

Database checks:

```bash
cd backend
source .venv/bin/activate
alembic revision --autogenerate -m "migration message"
alembic upgrade head
alembic current
```

How to test manually:

- Create a patient record linked to a valid user account and confirm the linkage is stored correctly.
- Access patient endpoints as the linked patient user and confirm allowed reads or updates succeed.
- Access the same patient endpoints as a different non-admin user and confirm access is denied.
- Access the patient endpoints as an admin user and confirm admin oversight works where intended.
- Inspect the database or pgAdmin and confirm the `patients` table and user relationship match the model.

### Manual Checklist

- Confirm patient records link to the intended user accounts.
- Confirm the owning patient can access allowed patient data.
- Confirm other users cannot access that patient's protected data.
- Confirm admin access behaves as designed.
- Confirm the `patients` table and relationships match the implemented schema.

### Agent Prompt

Before making any changes:

1. Read `docs/ARCHITECTURE.md` completely.
2. Read `docs/CONSTRAINTS.md` completely.
3. Read `docs/PROJECT_DEFINITION.md` completely.
4. Read `docs/PROJECT_SETUP.md` completely.
5. Read `docs/DEVELOPMENT_PLAN.md` completely.

These five documents are the source of truth for the project.

Follow all architecture decisions, constraints, project requirements, setup standards, development workflows, testing requirements, security requirements, and implementation order defined in those documents.

If any instruction in this feature conflicts with those documents, explain the conflict before making changes.

Do not proceed until all documents have been reviewed.

Testing and checking are mandatory for this feature.
Run this feature's Checking And Testing Workflow before reporting completion.
Manual QA is mandatory.
After automated checks pass, perform this feature's Manual QA checks.
Report every manual check as passed, failed, or not applicable.
Do not mark the feature complete unless manual QA has been reported clearly.
Do not mark the feature complete until required checks pass.
If any check cannot be run, explain why and provide the exact manual command I should run.

If frontend files are changed, run the frontend checking workflow:
`cd frontend`
`npm install`
`npm run lint`
`npm run build`
`npm run test`, if tests exist

Implement the Patient module in the FastAPI backend using SQLAlchemy, Alembic, Pydantic schemas, services, repositories where appropriate, and protected REST endpoints under `/api/v1`. Ensure access rules prevent unauthorized patient data access. List affected files first, explain the plan, implement incrementally, run `python -m compileall app tests` and `pytest`, and report manual patient-access checks.

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

## Feature 15: Services Module

### Goal

Implement the clinic service catalog so users can browse rehabilitation and treatment services.

### Scope

- Add `services` table, model, schemas, repository, service, and routes
- Support public read endpoints
- Support admin-managed create, update, and delete flows

### Security Checks

- Restrict write operations to admin users
- Validate pricing or duration fields carefully if included
- Do not mix service management logic into route handlers

### Scaling Decisions

- Design services so appointments and payments can reference them later
- Keep public list and detail queries efficient for future caching

### Automated Tests

- Run `python -m compileall app tests`
- Run `pytest`
- Add tests for public reads, admin writes, and validation errors

### Checking And Testing Workflow

Frontend checks, if frontend files are changed:

```bash
cd frontend
npm install
npm run lint
npm run build
```

If frontend tests exist, also run:

```bash
npm run test
```

Backend checks:

```bash
cd backend
source .venv/bin/activate
python -m compileall app tests
pytest
```

Backend runtime checks:

```bash
python -m uvicorn app.main:app --reload
```

Database checks:

```bash
cd backend
source .venv/bin/activate
alembic revision --autogenerate -m "migration message"
alembic upgrade head
alembic current
```

How to test manually:

- Create service records through the intended admin flow and confirm valid service data is accepted.
- Call the public service list and detail endpoints and confirm the expected service fields are returned.
- Attempt service create, update, or delete actions as a non-admin user and confirm access is denied.
- Verify any pricing, duration, or descriptive fields serialize and validate as intended.
- Inspect the database or pgAdmin and confirm the `services` table matches the implemented schema.

### Manual Checklist

- Confirm admin users can create, update, and delete service records as intended.
- Confirm public users can retrieve service list and detail endpoints.
- Confirm non-admin users cannot manage services.
- Confirm service responses expose only intended public fields.
- Confirm the `services` table matches the model and migration.

### Agent Prompt

Before making any changes:

1. Read `docs/ARCHITECTURE.md` completely.
2. Read `docs/CONSTRAINTS.md` completely.
3. Read `docs/PROJECT_DEFINITION.md` completely.
4. Read `docs/PROJECT_SETUP.md` completely.
5. Read `docs/DEVELOPMENT_PLAN.md` completely.

These five documents are the source of truth for the project.

Follow all architecture decisions, constraints, project requirements, setup standards, development workflows, testing requirements, security requirements, and implementation order defined in those documents.

If any instruction in this feature conflicts with those documents, explain the conflict before making changes.

Do not proceed until all documents have been reviewed.

Testing and checking are mandatory for this feature.
Run this feature's Checking And Testing Workflow before reporting completion.
Manual QA is mandatory.
After automated checks pass, perform this feature's Manual QA checks.
Report every manual check as passed, failed, or not applicable.
Do not mark the feature complete unless manual QA has been reported clearly.
Do not mark the feature complete until required checks pass.
If any check cannot be run, explain why and provide the exact manual command I should run.

If frontend files are changed, run the frontend checking workflow:
`cd frontend`
`npm install`
`npm run lint`
`npm run build`
`npm run test`, if tests exist

Implement the Services module in the FastAPI backend using PostgreSQL, SQLAlchemy, Alembic, Pydantic schemas, service-layer business logic, and `/api/v1` REST routes. Support public service browsing and admin-restricted service management. List affected files first, explain the plan, implement incrementally, run `python -m compileall app tests` and `pytest`, and report manual service-module checks.

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

## Feature 16: Appointment Module

### Goal

Implement appointment scheduling and lifecycle tracking between patients, doctors, and services.

### Scope

- Add `appointments` table, model, schemas, repository, service, and routes
- Support creation, listing, detail, status changes, and future lifecycle tracking
- Link appointments to patient, doctor, and service records

### Security Checks

- Prevent unauthorized appointment access
- Validate ownership and role-based access carefully
- Validate appointment status transitions explicitly

### Scaling Decisions

- Keep appointment lifecycle logic in services
- Design status handling so reminders, notifications, and payments can attach later
- Keep query patterns ready for future filtering by date, doctor, or patient

### Automated Tests

- Run `python -m compileall app tests`
- Run `pytest`
- Add tests for create, list, detail, permission checks, and status transition rules

### Checking And Testing Workflow

Frontend checks, if frontend files are changed:

```bash
cd frontend
npm install
npm run lint
npm run build
```

If frontend tests exist, also run:

```bash
npm run test
```

Backend checks:

```bash
cd backend
source .venv/bin/activate
python -m compileall app tests
pytest
```

Backend runtime checks:

```bash
python -m uvicorn app.main:app --reload
```

Database checks:

```bash
cd backend
source .venv/bin/activate
alembic revision --autogenerate -m "migration message"
alembic upgrade head
alembic current
```

How to test manually:

- Create appointments that reference valid patient, doctor, and service records and confirm creation succeeds.
- Retrieve appointment list and detail endpoints as the owning patient and confirm only allowed records are visible.
- Verify admin users can access the intended oversight views for appointments.
- Attempt invalid appointment status transitions and confirm they are rejected predictably.
- Attempt unauthorized appointment access from another non-admin user and confirm it is blocked.
- Inspect the database or pgAdmin and confirm appointment links to patient, doctor, and service records are stored correctly.

### Manual Checklist

- Confirm appointments can be created for valid linked entities.
- Confirm patient-facing access rules allow only the intended user's records.
- Confirm admin oversight endpoints or behaviors work as designed.
- Confirm invalid status transitions are rejected consistently.
- Confirm unauthorized users cannot access or change other users' appointments.
- Confirm the `appointments` table and foreign-key relationships match the model.

### Agent Prompt

Before making any changes:

1. Read `docs/ARCHITECTURE.md` completely.
2. Read `docs/CONSTRAINTS.md` completely.
3. Read `docs/PROJECT_DEFINITION.md` completely.
4. Read `docs/PROJECT_SETUP.md` completely.
5. Read `docs/DEVELOPMENT_PLAN.md` completely.

These five documents are the source of truth for the project.

Follow all architecture decisions, constraints, project requirements, setup standards, development workflows, testing requirements, security requirements, and implementation order defined in those documents.

If any instruction in this feature conflicts with those documents, explain the conflict before making changes.

Do not proceed until all documents have been reviewed.

Testing and checking are mandatory for this feature.
Run this feature's Checking And Testing Workflow before reporting completion.
Manual QA is mandatory.
After automated checks pass, perform this feature's Manual QA checks.
Report every manual check as passed, failed, or not applicable.
Do not mark the feature complete unless manual QA has been reported clearly.
Do not mark the feature complete until required checks pass.
If any check cannot be run, explain why and provide the exact manual command I should run.

If frontend files are changed, run the frontend checking workflow:
`cd frontend`
`npm install`
`npm run lint`
`npm run build`
`npm run test`, if tests exist

Implement the Appointment module in the FastAPI backend with SQLAlchemy models, Alembic migrations, Pydantic schemas, service-layer lifecycle logic, and protected REST endpoints under `/api/v1`. Link appointments to the core business entities and enforce clear permission and status-transition rules. List affected files first, explain the plan, implement incrementally, run `python -m compileall app tests` and `pytest`, and report manual appointment-flow checks.

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

## Feature 17: Payment Module

### Goal

Implement the payment record foundation for clinic billing workflows.

### Scope

- Add `payments` table, model, schemas, repository, service, and routes
- Track payment status, amount, method, and linked business entity references
- Keep room for future external gateway integration

### Security Checks

- Keep payment-related secrets out of source control
- Do not store raw card details
- Restrict payment management endpoints appropriately
- Validate payment status transitions carefully

### Scaling Decisions

- Store durable payment records in PostgreSQL
- Isolate gateway-specific behavior so future integrations do not leak into route code

### Automated Tests

- Run `python -m compileall app tests`
- Run `pytest`
- Add tests for payment creation, retrieval, authorization, and status changes

### Checking And Testing Workflow

Frontend checks, if frontend files are changed:

```bash
cd frontend
npm install
npm run lint
npm run build
```

If frontend tests exist, also run:

```bash
npm run test
```

Backend checks:

```bash
cd backend
source .venv/bin/activate
python -m compileall app tests
pytest
```

Backend runtime checks:

```bash
python -m uvicorn app.main:app --reload
```

Database checks:

```bash
cd backend
source .venv/bin/activate
alembic revision --autogenerate -m "migration message"
alembic upgrade head
alembic current
```

How to test manually:

- Create payment records for valid linked business entities and confirm required fields such as amount, method, and status behave as intended.
- Retrieve payment records through the intended authorized flows and confirm responses exclude sensitive data.
- Attempt payment access or status changes as an unauthorized user and confirm access is blocked.
- Attempt invalid payment status transitions and confirm they are rejected consistently.
- Inspect the database or pgAdmin and confirm the `payments` table stores durable payment records without raw card data.

### Manual Checklist

- Confirm payment records can be created for valid linked entities.
- Confirm unauthorized users cannot read or change protected payment records.
- Confirm payment status changes follow the intended rules.
- Confirm payment responses do not expose sensitive fields or secrets.
- Confirm the `payments` table stores durable records only and excludes raw card details.

### Agent Prompt

Before making any changes:

1. Read `docs/ARCHITECTURE.md` completely.
2. Read `docs/CONSTRAINTS.md` completely.
3. Read `docs/PROJECT_DEFINITION.md` completely.
4. Read `docs/PROJECT_SETUP.md` completely.
5. Read `docs/DEVELOPMENT_PLAN.md` completely.

These five documents are the source of truth for the project.

Follow all architecture decisions, constraints, project requirements, setup standards, development workflows, testing requirements, security requirements, and implementation order defined in those documents.

If any instruction in this feature conflicts with those documents, explain the conflict before making changes.

Do not proceed until all documents have been reviewed.

Testing and checking are mandatory for this feature.
Run this feature's Checking And Testing Workflow before reporting completion.
Manual QA is mandatory.
After automated checks pass, perform this feature's Manual QA checks.
Report every manual check as passed, failed, or not applicable.
Do not mark the feature complete unless manual QA has been reported clearly.
Do not mark the feature complete until required checks pass.
If any check cannot be run, explain why and provide the exact manual command I should run.

If frontend files are changed, run the frontend checking workflow:
`cd frontend`
`npm install`
`npm run lint`
`npm run build`
`npm run test`, if tests exist

Implement the Payment module in the FastAPI backend using SQLAlchemy, Alembic, Pydantic schemas, services, and `/api/v1` REST routes. Focus on durable payment records, status handling, and security-safe foundations for later gateway integration. List affected files first, explain the plan, implement incrementally, run `python -m compileall app tests` and `pytest`, and report manual payment-module checks.

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

## Feature 18: Review Module

### Goal

Implement patient-submitted reviews and ratings for doctors or services.

### Scope

- Add `reviews` table, model, schemas, repository, service, and routes
- Link reviews to patients and the reviewed target
- Support create and read flows, with moderation-friendly structure

### Security Checks

- Restrict review creation to eligible authenticated users
- Prevent review tampering by unauthorized users
- Validate score ranges and ownership rules

### Scaling Decisions

- Keep review-target relationships explicit
- Design for future moderation, aggregation, and public display workflows

### Automated Tests

- Run `python -m compileall app tests`
- Run `pytest`
- Add tests for eligibility, validation, duplicate prevention rules if any, and public read behavior

### Checking And Testing Workflow

Frontend checks, if frontend files are changed:

```bash
cd frontend
npm install
npm run lint
npm run build
```

If frontend tests exist, also run:

```bash
npm run test
```

Backend checks:

```bash
cd backend
source .venv/bin/activate
python -m compileall app tests
pytest
```

Backend runtime checks:

```bash
python -m uvicorn app.main:app --reload
```

Database checks:

```bash
cd backend
source .venv/bin/activate
alembic revision --autogenerate -m "migration message"
alembic upgrade head
alembic current
```

How to test manually:

- Submit a review as an eligible authenticated patient and confirm valid review data is accepted.
- Retrieve review read endpoints and confirm only intended public or authorized fields are exposed.
- Attempt to submit a review with an invalid rating and confirm validation rejects it.
- Attempt unauthorized review creation, update, or tampering actions and confirm they are blocked.
- Inspect the database or pgAdmin and confirm the `reviews` table links correctly to the intended patient and review target.

### Manual Checklist

- Confirm eligible patients can submit reviews successfully.
- Confirm invalid rating values are rejected consistently.
- Confirm unauthorized users cannot submit or alter protected review content.
- Confirm review read endpoints expose only intended fields.
- Confirm the `reviews` table and target relationships match the model and migration.

### Agent Prompt

Before making any changes:

1. Read `docs/ARCHITECTURE.md` completely.
2. Read `docs/CONSTRAINTS.md` completely.
3. Read `docs/PROJECT_DEFINITION.md` completely.
4. Read `docs/PROJECT_SETUP.md` completely.
5. Read `docs/DEVELOPMENT_PLAN.md` completely.

These five documents are the source of truth for the project.

Follow all architecture decisions, constraints, project requirements, setup standards, development workflows, testing requirements, security requirements, and implementation order defined in those documents.

If any instruction in this feature conflicts with those documents, explain the conflict before making changes.

Do not proceed until all documents have been reviewed.

Testing and checking are mandatory for this feature.
Run this feature's Checking And Testing Workflow before reporting completion.
Manual QA is mandatory.
After automated checks pass, perform this feature's Manual QA checks.
Report every manual check as passed, failed, or not applicable.
Do not mark the feature complete unless manual QA has been reported clearly.
Do not mark the feature complete until all required checks pass.
If any check cannot be run, explain why and provide the exact manual command I should run.

If frontend files are changed, run the frontend checking workflow:
`cd frontend`
`npm install`
`npm run lint`
`npm run build`
`npm run test`, if tests exist

Implement the Review module in the FastAPI backend using SQLAlchemy models, Alembic migrations, Pydantic schemas, service-layer rules, and `/api/v1` routes. Support patient-submitted reviews for doctors or services with careful validation and authorization. List affected files first, explain the plan, implement incrementally, run `python -m compileall app tests` and `pytest`, and report manual review-module checks.

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

## Feature 19: Admin Dashboard

### Goal

Prepare the backend and frontend contract needed for a future admin dashboard without breaking the existing separation of concerns.

### Scope

- Add admin-restricted backend endpoints needed for operational oversight
- Support analytics summaries, doctor management, patient management, appointment oversight, payment oversight, and review oversight as appropriate for the current MVP
- Keep actual frontend admin screens separate from backend admin APIs

### Security Checks

- Require admin-only access for admin endpoints
- Reuse role-based dependencies
- Avoid exposing cross-user data to non-admin users

### Scaling Decisions

- Group admin logic cleanly so future reporting and dashboards can grow without touching public APIs excessively
- Keep admin contracts explicit and RESTful

### Automated Tests

- Run `python -m compileall app tests`
- Run `pytest`
- Add tests for admin access, non-admin rejection, and summary endpoint correctness

### Checking And Testing Workflow

Frontend checks, if frontend files are changed:

```bash
cd frontend
npm install
npm run lint
npm run build
```

If frontend tests exist, also run:

```bash
npm run test
```

Backend checks:

```bash
cd backend
source .venv/bin/activate
python -m compileall app tests
pytest
```

Backend runtime checks:

```bash
python -m uvicorn app.main:app --reload
```

How to test manually:

- Open Swagger and call each admin endpoint with an admin user token to confirm access succeeds.
- Call the same admin endpoints with a normal user token and confirm access is rejected consistently.
- Call the admin endpoints without a token and confirm authentication is required.
- Inspect admin responses and confirm they expose only intended operational data and not secret fields.
- Confirm admin routes remain under `/api/v1` and follow the documented REST structure.

### Manual Checklist

- Confirm admin users can access the intended admin-only endpoints.
- Confirm normal users and anonymous callers cannot access admin-only endpoints.
- Confirm admin responses contain only intended operational data.
- Confirm admin route protection reuses shared auth and role dependencies.
- Confirm no cross-user sensitive data is exposed beyond the intended admin scope.

### Agent Prompt

Before making any changes:

1. Read `docs/ARCHITECTURE.md` completely.
2. Read `docs/CONSTRAINTS.md` completely.
3. Read `docs/PROJECT_DEFINITION.md` completely.
4. Read `docs/PROJECT_SETUP.md` completely.
5. Read `docs/DEVELOPMENT_PLAN.md` completely.

These five documents are the source of truth for the project.

Follow all architecture decisions, constraints, project requirements, setup standards, development workflows, testing requirements, security requirements, and implementation order defined in those documents.

If any instruction in this feature conflicts with those documents, explain the conflict before making changes.

Do not proceed until all documents have been reviewed.

Testing and checking are mandatory for this feature.
Run this feature's Checking And Testing Workflow before reporting completion.
Manual QA is mandatory.
After automated checks pass, perform this feature's Manual QA checks.
Report every manual check as passed, failed, or not applicable.
Do not mark the feature complete unless manual QA has been reported clearly.
Do not mark the feature complete until all required checks pass.
If any check cannot be run, explain why and provide the exact manual command I should run.

If frontend files are changed, run the frontend checking workflow:
`cd frontend`
`npm install`
`npm run lint`
`npm run build`
`npm run test`, if tests exist

Implement the backend foundation for the Admin Dashboard using admin-restricted REST endpoints under `/api/v1`. Reuse JWT authentication and role-based dependencies, keep route handlers thin, and keep operational logic in services. List affected files first, explain the plan, implement incrementally, run `python -m compileall app tests` and `pytest`, and report manual admin-access checks.

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

## Feature 20: Frontend API Integration

### Goal

Connect the existing Next.js frontend to the FastAPI backend through documented REST contracts.

### Scope

- Use `NEXT_PUBLIC_API_BASE_URL`
- Integrate frontend flows with backend auth, doctor, service, appointment, and related endpoints
- Keep frontend work limited to API consumption, forms, and user feedback
- Do not move backend logic into Next.js

### Security Checks

- Do not expose backend secrets in the frontend
- Handle JWT tokens safely in the chosen frontend auth flow
- Keep protected backend operations server-enforced

### Scaling Decisions

- Keep frontend API calls organized and reusable
- Preserve the separated frontend/backend architecture
- Avoid coupling UI too tightly to unstable backend internals

### Automated Tests

- Run backend verification commands if backend contracts change
- Run frontend verification commands appropriate to the repository when frontend work is requested
- Add or update integration-oriented tests where practical

### Checking And Testing Workflow

Frontend checks, if frontend files are changed:

```bash
cd frontend
npm install
npm run lint
npm run build
```

If frontend tests exist, also run:

```bash
npm run test
```

Backend checks when backend contracts change:

```bash
cd backend
source .venv/bin/activate
python -m compileall app tests
pytest
```

Backend runtime checks when end-to-end integration is verified against a running API:

```bash
python -m uvicorn app.main:app --reload
```

How to test manually:

- Confirm the frontend reads `NEXT_PUBLIC_API_BASE_URL` correctly by loading data from the intended backend environment.
- Test public pages that consume backend data and confirm loading, success, and failure states behave correctly.
- Test the frontend registration, login, and authenticated-user flow end to end against the backend.
- Test appointment-related or other integrated UI actions and confirm the frontend behavior matches backend responses.
- Confirm protected backend behavior is still enforced server-side even if frontend state is manipulated.
- Confirm frontend pages remain stable after integration changes on both desktop and mobile-sized layouts.

### Manual Checklist

- Confirm the frontend uses the backend base URL from environment configuration.
- Confirm public pages successfully render backend-driven data.
- Confirm auth flows work end to end from the UI through the backend.
- Confirm appointment-related or equivalent integrated flows behave correctly in the UI.
- Confirm protected operations still rely on backend enforcement.
- Confirm frontend page behavior remains stable after integration changes.

### Agent Prompt

Before making any changes:

1. Read `docs/ARCHITECTURE.md` completely.
2. Read `docs/CONSTRAINTS.md` completely.
3. Read `docs/PROJECT_DEFINITION.md` completely.
4. Read `docs/PROJECT_SETUP.md` completely.
5. Read `docs/DEVELOPMENT_PLAN.md` completely.

These five documents are the source of truth for the project.

Follow all architecture decisions, constraints, project requirements, setup standards, development workflows, testing requirements, security requirements, and implementation order defined in those documents.

If any instruction in this feature conflicts with those documents, explain the conflict before making changes.

Do not proceed until all documents have been reviewed.

Testing and checking are mandatory for this feature.
Run this feature's Checking And Testing Workflow before reporting completion.
Manual QA is mandatory.
After automated checks pass, perform this feature's Manual QA checks.
Report every manual check as passed, failed, or not applicable.
Do not mark the feature complete unless manual QA has been reported clearly.
Do not mark the feature complete until all required checks pass.
If any check cannot be run, explain why and provide the exact manual command I should run.

If frontend files are changed, run the frontend checking workflow:
`cd frontend`
`npm install`
`npm run lint`
`npm run build`
`npm run test`, if tests exist

Integrate the existing Next.js frontend with the FastAPI backend using the documented REST API. Use `NEXT_PUBLIC_API_BASE_URL`, keep the architecture separated, and do not move backend logic into Next.js API routes. List affected files first, explain the plan, implement incrementally, run the appropriate verification commands, and report manual end-to-end UI checks.

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

## Feature 21: Production Hardening And Deployment Readiness

### Goal

Prepare the project for reliable deployment and safe production operation.

### Scope

- Review environment variable completeness
- Review Docker and deployment assumptions
- Confirm PostgreSQL and Redis are externalized per environment
- Review security defaults, CORS, and startup behavior
- Document backup, migration, rollback, and release expectations

### Security Checks

- Confirm no real secrets are committed
- Confirm production secrets are environment-managed
- Confirm auth and CORS defaults are production-appropriate
- Confirm debug-only behavior is not required in production

### Scaling Decisions

- Preserve independent frontend and backend deployment
- Keep infrastructure simple enough for early production while leaving room for later growth
- Plan for monitoring, logs, and background-work expansion without rewriting the core architecture

### Automated Tests

- Run `python -m compileall app tests`
- Run `pytest`
- Run deployment-related validation commands as appropriate

### Checking And Testing Workflow

Frontend checks, if frontend files are changed:

```bash
cd frontend
npm install
npm run lint
npm run build
```

If frontend tests exist, also run:

```bash
npm run test
```

Backend checks:

```bash
cd backend
source .venv/bin/activate
python -m compileall app tests
pytest
```

Database checks when migration or schema changes are part of release readiness:

```bash
cd backend
source .venv/bin/activate
alembic revision --autogenerate -m "migration message"
alembic upgrade head
alembic current
```

Redis checks:

```bash
redis-cli ping
```

Deployment or Docker checks:

```bash
docker compose up --build
```

How to test manually:

- Review the documented environment variables and confirm the production-facing set is complete for frontend, backend, PostgreSQL, and Redis.
- Start the stack in a production-like local setup, such as Docker Compose when appropriate, and confirm the services boot in the expected order.
- Confirm health routes and critical auth flows still work in that production-like setup.
- Confirm PostgreSQL and Redis are treated as externalized services rather than embedded application state.
- Review CORS, secret handling, migration workflow, and release notes or deployment guidance for production safety.
- Confirm frontend pages and backend APIs remain stable in the deployment-oriented setup.

### Manual Checklist

- Confirm environment variables are documented and complete for deployment.
- Confirm Docker and deployment guidance match the intended production posture.
- Confirm migrations are explicitly part of release planning and rollback thinking.
- Confirm health routes and critical auth flows work in a production-like environment.
- Confirm PostgreSQL and Redis are externalized appropriately per environment.
- Confirm no real secrets are present in committed configuration or documentation.

### Agent Prompt

Before making any changes:

1. Read `docs/ARCHITECTURE.md` completely.
2. Read `docs/CONSTRAINTS.md` completely.
3. Read `docs/PROJECT_DEFINITION.md` completely.
4. Read `docs/PROJECT_SETUP.md` completely.
5. Read `docs/DEVELOPMENT_PLAN.md` completely.

These five documents are the source of truth for the project.

Follow all architecture decisions, constraints, project requirements, setup standards, development workflows, testing requirements, security requirements, and implementation order defined in those documents.

If any instruction in this feature conflicts with those documents, explain the conflict before making changes.

Do not proceed until all documents have been reviewed.

Testing and checking are mandatory for this feature.
Run this feature's Checking And Testing Workflow before reporting completion.
Manual QA is mandatory.
After automated checks pass, perform this feature's Manual QA checks.
Report every manual check as passed, failed, or not applicable.
Do not mark the feature complete unless manual QA has been reported clearly.
Do not mark the feature complete until all required checks pass.
If any check cannot be run, explain why and provide the exact manual command I should run.

If frontend files are changed, run the frontend checking workflow:
`cd frontend`
`npm install`
`npm run lint`
`npm run build`
`npm run test`, if tests exist

Harden the DoctorPhysio project for deployment readiness. Focus on configuration safety, production-oriented backend behavior, migration readiness, Docker alignment, and operational documentation. Keep the frontend and backend independently deployable. List affected files first, explain the plan, implement incrementally, run `python -m compileall app tests` and `pytest` where backend changes are involved, and report manual production-readiness checks.

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

## Manual QA Checklist

Complete this checklist before declaring MVP-ready progress:

- Backend starts locally with documented commands
- Frontend starts locally with documented commands
- `GET /health` returns success
- `GET /api/v1/health` returns success
- Registration works
- Login works
- Protected `/api/v1/auth/me` works with a valid token
- Invalid or missing tokens are rejected correctly
- Doctor list and detail flows work
- Services list and detail flows work
- Patient access rules behave correctly
- Appointment creation and lifecycle flows behave correctly
- Payment record flows behave correctly
- Review submission and retrieval behave correctly
- Admin-only endpoints reject non-admin users
- Redis-backed behavior is stable when Redis is available
- Core backend routes return schema-shaped JSON responses
- No secret fields appear in API responses
- Latest migrations apply cleanly
- `python -m compileall app tests` passes
- `pytest` passes

## Final MVP Acceptance Checklist

The MVP is acceptable only when all of the following are true:

- The backend architecture matches `docs/ARCHITECTURE.md`
- The execution style matches `docs/CONSTRAINTS.md`
- The delivered scope matches `docs/PROJECT_DEFINITION.md`
- The setup and run flow matches `docs/PROJECT_SETUP.md`
- The implemented sequence followed this `docs/DEVELOPMENT_PLAN.md`
- Users can register, log in, and retrieve current-user data
- Doctors and services can be browsed through the platform
- Core patient and appointment flows exist
- Payment and review foundations exist
- Admin-restricted operations are protected by role-based access control
- PostgreSQL is the source of truth for business data
- Redis is used only for caching or short-lived support concerns
- All schema changes were delivered with Alembic migrations
- Backend tests and compile checks pass
- Manual QA is completed and documented
- No real secrets are committed

## Recommended Next Step

When resuming implementation, continue from the first incomplete feature in this document. For the current repository state, the next feature should usually be:

`Feature 1: Project Foundation And Backend Verification`

If Feature 1 is already verified in a later session, continue with the next unfinished feature in order rather than skipping ahead arbitrarily.
