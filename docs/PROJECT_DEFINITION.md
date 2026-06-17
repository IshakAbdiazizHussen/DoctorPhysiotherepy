# PROJECT DEFINITION

## 1. Project overview

DoctorPhysio is a healthcare platform for a physiotherapy and rehabilitation clinic. The project uses a separated architecture:

- `frontend/`: a Next.js web application for the patient-facing experience
- `backend/`: a FastAPI REST API for business logic, authentication, integrations, and operational workflows
- PostgreSQL: the system of record for persistent clinic data
- Redis: a support service for caching and short-lived operational state

The platform is intended to help patients discover services, explore doctors, book appointments, and interact with the clinic through a modern web experience. It is also designed to support future clinic administration, payments, reviews, and operational reporting.

## 2. Project vision

Build a reliable, secure, and easy-to-use digital platform that helps a rehabilitation clinic deliver better patient access, smoother scheduling, and stronger operational control.

The long-term vision is to create a system that serves both patients and clinic staff without forcing major architectural rewrites as the product grows.

## 3. Business objectives

- Increase clinic visibility through a professional online presence
- Make it easier for patients to discover doctors and services
- Reduce manual appointment coordination
- Create a secure foundation for patient and staff workflows
- Prepare the business for future online payments and reviews
- Support future administrative reporting and operational oversight

## 4. Target users

- Patients looking for physiotherapy or rehabilitation services
- Family members helping patients compare doctors or services
- Clinic administrators managing operational workflows
- Doctors or staff members who may later manage availability and patient interactions

## 5. User roles

### Public visitor

- Can browse clinic information, services, and doctors
- Can view public-facing pages without authentication

### Patient user

- Can create an account and sign in
- Can view their own profile and future appointment-related data
- Can book appointments and later review services or doctors

### Admin user

- Can manage protected operational workflows
- Can oversee doctors, patients, appointments, services, payments, and reviews in future phases

### Future staff or doctor role

- May manage schedules, availability, and limited operational data
- Must be handled through role-based access control when introduced

## 6. Core features

- Responsive clinic website with service and doctor discovery
- REST API under `/api/v1`
- User registration, login, and current-user access
- Role-aware authentication foundation
- PostgreSQL-backed business records through SQLAlchemy
- Alembic-based schema migration workflow
- Redis-backed caching and temporary operational support
- Future modules for appointments, services, payments, reviews, and administration

## 7. Functional requirements

### Patient-facing requirements

- Users must be able to browse doctors and services
- Users must be able to access clinic information from the web interface
- Users must be able to register and log in securely
- Authenticated users must be able to retrieve their current profile
- The system must support future appointment booking workflows

### Clinic operations requirements

- The backend must expose versioned REST endpoints under `/api/v1`
- Business logic must live in services and not directly in route handlers
- Data persistence must flow through SQLAlchemy models and database sessions
- Complex query logic should be isolated in repositories where appropriate
- Database schema changes must be tracked through Alembic migrations

### Growth requirements

- The platform must support future doctor, patient, appointment, service, payment, and review modules
- The system must support role-based access control for protected operations
- The architecture must allow a future admin dashboard without restructuring the core backend

## 8. Non-functional requirements

- Security: protect credentials, tokens, and patient-related data
- Reliability: maintain predictable API behavior and stable environment-based configuration
- Maintainability: keep modules clear, separated, and beginner-readable
- Scalability: allow new business modules to be added incrementally
- Performance: use Redis for caching and short-lived coordination where needed
- Usability: keep the patient experience responsive and easy to understand
- Deployability: frontend and backend must remain independently deployable

## 9. Technology stack

### Frontend

- Next.js 16
- React 19
- Tailwind CSS 4
- Framer Motion

### Backend

- FastAPI
- SQLAlchemy 2
- Alembic
- Pydantic Settings
- Passlib
- Python-JOSE
- Uvicorn

### Data and infrastructure

- PostgreSQL
- Redis
- Docker
- Docker Compose

### Testing

- Pytest for backend testing
- HTTPX and FastAPI test client utilities

## 10. Security requirements

- Never store plaintext passwords
- Always hash passwords before persistence
- Never return `hashed_password` or secrets in API responses
- JWT tokens must be signed with `SECRET_KEY`
- Token expiration must be controlled by configuration
- Protected routes must use reusable authentication dependencies
- Role checks must be reusable and consistent
- Secrets and service credentials must come from environment variables
- PostgreSQL remains the source of truth for persistent records
- Redis must not be treated as the source of truth for business data

## 11. Success criteria

- Developers can run the frontend, backend, PostgreSQL, and Redis locally
- The system exposes stable health and authentication foundations
- The product supports a clear path to doctor, patient, appointment, and service modules
- Future admin and payment capabilities can be added without architecture changes
- The documentation allows a new developer to understand the product and get started quickly

## 12. Future roadmap

- Doctor management and availability handling
- Patient profile and patient management features
- Appointment scheduling lifecycle and operational workflows
- Service catalog management
- Online or assisted payment workflows
- Reviews and ratings
- Admin dashboard and analytics
- Reporting, notifications, and performance optimizations

## 13. Out-of-scope items

- Native mobile applications
- Real-time telemedicine or video consultation features
- Full electronic medical record functionality
- Insurance claim management
- External partner marketplace features
- Non-clinic business domains unrelated to physiotherapy and rehabilitation

## 14. Risks and assumptions

### Risks

- Healthcare workflows can expand quickly and increase scope
- Security expectations are high because the domain involves sensitive user data
- Payment and review features may introduce compliance and moderation complexity
- Future admin requirements may grow faster than the current public-facing product

### Assumptions

- The clinic will continue using a separated frontend and backend architecture
- PostgreSQL will remain the system of record
- Redis will be used only for temporary or performance-oriented support concerns
- JWT-based authentication will remain the foundation for access control
- Development will continue using environment-driven configuration and Alembic migrations

## 15. Why this project exists

This project exists to give a physiotherapy and rehabilitation clinic a scalable digital foundation. It is being built to improve patient access, reduce operational friction, and create a secure platform that can grow into scheduling, payments, reviews, and administration over time.
