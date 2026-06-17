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

`Read docs/ARCHITECTURE.md, docs/CONSTRAINTS.md, docs/PROJECT_DEFINITION.md, docs/PROJECT_SETUP.md, and docs/DEVELOPMENT_PLAN.md before making changes.`

Codex must always:

- List affected files before implementation.
- Explain the implementation plan.
- Implement incrementally.
- Avoid unrelated refactors.
- Add or update tests when required.
- Run verification commands.
- Report manual test steps.
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

### Manual Checklist

- Start the backend locally
- Visit `GET /health`
- Visit `GET /api/v1/health`
- Confirm the application boots without structural import errors

### Agent Prompt

Read `docs/ARCHITECTURE.md`, `docs/CONSTRAINTS.md`, `docs/PROJECT_DEFINITION.md`, `docs/PROJECT_SETUP.md`, and `docs/DEVELOPMENT_PLAN.md` before making changes.

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

### Manual Checklist

- Copy `.env.example` to `.env`
- Confirm the backend loads settings successfully
- Confirm PostgreSQL connection values match the chosen local setup
- Confirm Docker Compose variables align with documented behavior

### Agent Prompt

Read `docs/ARCHITECTURE.md`, `docs/CONSTRAINTS.md`, `docs/PROJECT_DEFINITION.md`, `docs/PROJECT_SETUP.md`, and `docs/DEVELOPMENT_PLAN.md` before making changes.

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

### Manual Checklist

- Generate a migration in a safe development context when needed
- Review the generated migration
- Apply the migration with `alembic upgrade head`
- Confirm Alembic reads the configured `DATABASE_URL`

### Agent Prompt

Read `docs/ARCHITECTURE.md`, `docs/CONSTRAINTS.md`, `docs/PROJECT_DEFINITION.md`, `docs/PROJECT_SETUP.md`, and `docs/DEVELOPMENT_PLAN.md` before making changes.

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

### Manual Checklist

- Confirm create and read schemas represent only intended fields
- Confirm UUIDs, email validation, and boolean flags behave correctly
- Confirm output schemas do not include secret fields

### Agent Prompt

Read `docs/ARCHITECTURE.md`, `docs/CONSTRAINTS.md`, `docs/PROJECT_DEFINITION.md`, `docs/PROJECT_SETUP.md`, and `docs/DEVELOPMENT_PLAN.md` before making changes.

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

### Manual Checklist

- Review the migration file before applying
- Run `alembic upgrade head`
- Inspect the resulting `users` table in PostgreSQL
- Confirm constraints behave as expected

### Agent Prompt

Read `docs/ARCHITECTURE.md`, `docs/CONSTRAINTS.md`, `docs/PROJECT_DEFINITION.md`, `docs/PROJECT_SETUP.md`, and `docs/DEVELOPMENT_PLAN.md` before making changes.

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

### Manual Checklist

- Confirm password hashing changes the stored value
- Confirm a valid token decodes successfully
- Confirm an invalid token is rejected
- Confirm expiration settings come from configuration

### Agent Prompt

Read `docs/ARCHITECTURE.md`, `docs/CONSTRAINTS.md`, `docs/PROJECT_DEFINITION.md`, `docs/PROJECT_SETUP.md`, and `docs/DEVELOPMENT_PLAN.md` before making changes.

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

### Manual Checklist

- Call a protected route without a token
- Call a protected route with an invalid token
- Call a protected route with a valid token
- Confirm unauthorized access is rejected consistently

### Agent Prompt

Read `docs/ARCHITECTURE.md`, `docs/CONSTRAINTS.md`, `docs/PROJECT_DEFINITION.md`, `docs/PROJECT_SETUP.md`, and `docs/DEVELOPMENT_PLAN.md` before making changes.

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

### Manual Checklist

- Register a new user
- Log in with that user
- Call `/api/v1/auth/me` with the returned token
- Confirm bad credentials return the expected error shape

### Agent Prompt

Read `docs/ARCHITECTURE.md`, `docs/CONSTRAINTS.md`, `docs/PROJECT_DEFINITION.md`, `docs/PROJECT_SETUP.md`, and `docs/DEVELOPMENT_PLAN.md` before making changes.

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

### Manual Checklist

- Confirm allowed frontend origins work
- Confirm requests still reach versioned routes
- Confirm health and auth routes behave the same after middleware changes

### Agent Prompt

Read `docs/ARCHITECTURE.md`, `docs/CONSTRAINTS.md`, `docs/PROJECT_DEFINITION.md`, `docs/PROJECT_SETUP.md`, and `docs/DEVELOPMENT_PLAN.md` before making changes.

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

### Manual Checklist

- Start Redis and confirm backend boots
- Temporarily stop Redis and confirm expected startup behavior
- Confirm health routes still return predictable responses

### Agent Prompt

Read `docs/ARCHITECTURE.md`, `docs/CONSTRAINTS.md`, `docs/PROJECT_DEFINITION.md`, `docs/PROJECT_SETUP.md`, and `docs/DEVELOPMENT_PLAN.md` before making changes.

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

### Manual Checklist

- Review test names for readability
- Confirm test coverage reflects expected user flows
- Confirm failures are easy for junior developers to understand

### Agent Prompt

Read `docs/ARCHITECTURE.md`, `docs/CONSTRAINTS.md`, `docs/PROJECT_DEFINITION.md`, `docs/PROJECT_SETUP.md`, and `docs/DEVELOPMENT_PLAN.md` before making changes.

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

### Manual Checklist

- Confirm documented commands work
- Confirm documented routes exist
- Confirm docs match the actual folder structure

### Agent Prompt

Read `docs/ARCHITECTURE.md`, `docs/CONSTRAINTS.md`, `docs/PROJECT_DEFINITION.md`, `docs/PROJECT_SETUP.md`, and `docs/DEVELOPMENT_PLAN.md` before making changes.

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

### Manual Checklist

- Create a doctor record through an admin flow
- Retrieve doctor list and detail endpoints
- Confirm unauthorized users cannot change doctor records
- Confirm public users can access intended read endpoints

### Agent Prompt

Read `docs/ARCHITECTURE.md`, `docs/CONSTRAINTS.md`, `docs/PROJECT_DEFINITION.md`, `docs/PROJECT_SETUP.md`, and `docs/DEVELOPMENT_PLAN.md` before making changes.

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

### Manual Checklist

- Create a patient record linked to a user
- Confirm the correct user can access allowed data
- Confirm other users cannot access that patient record
- Confirm admin workflows operate as expected

### Agent Prompt

Read `docs/ARCHITECTURE.md`, `docs/CONSTRAINTS.md`, `docs/PROJECT_DEFINITION.md`, `docs/PROJECT_SETUP.md`, and `docs/DEVELOPMENT_PLAN.md` before making changes.

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

### Manual Checklist

- Create service records as an admin
- Retrieve public service list and detail views
- Confirm unauthorized users cannot manage services

### Agent Prompt

Read `docs/ARCHITECTURE.md`, `docs/CONSTRAINTS.md`, `docs/PROJECT_DEFINITION.md`, `docs/PROJECT_SETUP.md`, and `docs/DEVELOPMENT_PLAN.md` before making changes.

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

### Manual Checklist

- Create appointments for valid patient, doctor, and service combinations
- Confirm patient-facing access rules
- Confirm admin oversight flows
- Confirm invalid status transitions are rejected

### Agent Prompt

Read `docs/ARCHITECTURE.md`, `docs/CONSTRAINTS.md`, `docs/PROJECT_DEFINITION.md`, `docs/PROJECT_SETUP.md`, and `docs/DEVELOPMENT_PLAN.md` before making changes.

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

### Manual Checklist

- Create payment records linked to valid appointments or services
- Confirm unauthorized access is blocked
- Confirm payment states update predictably
- Confirm sensitive fields are not exposed

### Agent Prompt

Read `docs/ARCHITECTURE.md`, `docs/CONSTRAINTS.md`, `docs/PROJECT_DEFINITION.md`, `docs/PROJECT_SETUP.md`, and `docs/DEVELOPMENT_PLAN.md` before making changes.

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

### Manual Checklist

- Submit a review as an eligible patient
- Confirm invalid rating values are rejected
- Confirm unauthorized users cannot submit or alter protected review content
- Confirm read endpoints expose only intended fields

### Agent Prompt

Read `docs/ARCHITECTURE.md`, `docs/CONSTRAINTS.md`, `docs/PROJECT_DEFINITION.md`, `docs/PROJECT_SETUP.md`, and `docs/DEVELOPMENT_PLAN.md` before making changes.

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

### Manual Checklist

- Confirm admin users can access admin endpoints
- Confirm normal users cannot
- Confirm admin responses contain only intended operational data

### Agent Prompt

Read `docs/ARCHITECTURE.md`, `docs/CONSTRAINTS.md`, `docs/PROJECT_DEFINITION.md`, `docs/PROJECT_SETUP.md`, and `docs/DEVELOPMENT_PLAN.md` before making changes.

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

### Manual Checklist

- Confirm the frontend reads the backend base URL from environment config
- Confirm public pages load backend data correctly
- Confirm auth flows work end-to-end
- Confirm appointment-related flows behave as expected in the UI

### Agent Prompt

Read `docs/ARCHITECTURE.md`, `docs/CONSTRAINTS.md`, `docs/PROJECT_DEFINITION.md`, `docs/PROJECT_SETUP.md`, and `docs/DEVELOPMENT_PLAN.md` before making changes.

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

### Manual Checklist

- Review Docker Compose usage versus production deployment needs
- Confirm migrations are part of release planning
- Confirm environment variables are documented and complete
- Confirm health routes and critical auth flows work in a production-like environment

### Agent Prompt

Read `docs/ARCHITECTURE.md`, `docs/CONSTRAINTS.md`, `docs/PROJECT_DEFINITION.md`, `docs/PROJECT_SETUP.md`, and `docs/DEVELOPMENT_PLAN.md` before making changes.

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
