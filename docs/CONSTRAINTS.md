Before making any code changes, Codex must read this file and follow it.

# CONSTRAINTS

## 1. General development rules

- make small, focused, reversible changes
- preserve working behavior unless the task explicitly changes it
- prefer clarity and maintainability over cleverness
- keep architecture consistent with `docs/ARCHITECTURE.md`

## 2. Do not modify frontend unless requested

- frontend code must remain untouched unless the user explicitly asks for frontend work

## 3. Do not delete working backend code

- do not remove functioning backend logic without explicit reason and clear replacement

## 4. Always inspect existing files before editing

- read the current implementation before patching it
- do not assume architecture or conventions

## 5. Always follow docs/ARCHITECTURE.md before implementing features

- treat `docs/ARCHITECTURE.md` as the architectural source of truth

## 6. Always follow docs/CONSTRAINTS.md before implementing features

- treat this file as an execution policy for Codex work

## 7. Keep backend beginner-readable

- write code that a junior developer can follow
- favor explicit structure and readable naming

## 8. Use small, focused changes

- avoid broad rewrites when a narrow fix is enough
- separate concerns clearly

## 9. Use environment variables, never hardcode secrets

- secrets, credentials, and tokens must come from environment variables or settings

## 10. Use PostgreSQL through SQLAlchemy only

- do not bypass SQLAlchemy for normal application persistence

## 11. Use Alembic for all database schema changes

- every schema change must be represented by a migration

## 12. Do not manually create tables outside migrations

- do not rely on ad hoc table creation in production workflows

## 13. Use Pydantic schemas for request and response validation

- request bodies and API responses must be validated through schemas

## 14. Do not return hashed_password or secrets in API responses

- never expose internal secrets, password hashes, or signing keys

## 15. Keep routes under /api/v1

- new backend endpoints must stay under the versioned API namespace

## 16. Keep authentication reusable through dependencies

- avoid embedding auth logic directly inside route handlers
- use shared dependency functions

## 17. Keep business logic inside services

- routes should remain thin
- services should coordinate business workflows

## 18. Keep database queries inside repositories where appropriate

- when complexity grows, move query logic into repositories rather than route handlers

## 19. Run compile checks after changes

- after backend changes, run compile or validation checks
- report whether the checks passed

## 20. Explain what changed after every task

- every task response must describe:
  - what files changed
  - what was implemented
  - what to run next when relevant
