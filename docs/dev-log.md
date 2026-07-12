# 2026-07-07

## Objective
Initialize the FastAPI backend and development environment.

## Completed
- Set up FastAPI using `uv`.
- Initialized the project structure.
- Added API routers.
- Created `core/config.py`.
- Verified the development server.

## Learned
- `uv` for dependency management.
- FastAPI project structure.
- API routers.
- Separation of configuration from application logic.

## Challenges
- VS Code was using the wrong Python interpreter.

## Solution
- Configured the correct virtual environment.

## Next
- PostgreSQL
- SQLAlchemy
- Alembic

---

# 2026-07-08

## Objective
Connect FastAPI with PostgreSQL using SQLAlchemy and Alembic.

## Completed
- Created the `User` model.
- Added authentication-related fields.
- Configured SQLAlchemy Base.
- Integrated Alembic.
- Generated and applied the initial migration.

## Learned
- ORM fundamentals.
- Alembic migrations.
- Password hashing concepts.
- Database constraints.
- Soft deletion using `is_active`.

## Challenges
- Configuring Alembic with the application settings.

## Solution
- Connected Alembic to the project's configuration and metadata.

## Next
- Repository layer.
- Authentication service.

---

# 2026-07-09

## Objective
Build the repository and service layer for authentication.

## Completed
- Implemented `get_user_by_email()`.
- Implemented `create_user()`.
- Fixed `db.refresh()`.
- Created the authentication service structure.
- Added password hashing utilities.

## Learned
- Repository Pattern.
- Database sessions.
- Repository-Service-Route architecture.
- Password hashing with bcrypt.
- Library versions can affect application behavior.
- Always verify dependency compatibility when integrating authentication libraries.

## Challenges
- Separating business logic from database logic.
- Correct usage of `db.refresh()`.
- Encountered a compatibility issue between `passlib` and `bcrypt` that caused password hashing to fail.

## Solution
- Moved persistence to the repository layer.
- Kept business logic inside the service layer.
- Downgraded `bcrypt` to a compatible version after identifying a version mismatch with `passlib`.

## Next
- Complete user registration.
- Implement JWT authentication.
- Protect API routes.


# 2026-07-10 to 2026-07-12

## Objective
Implement JWT-based authentication for user login.

## Completed
- Added JWT configuration using environment variables.
- Implemented JWT token generation.
- Implemented JWT token decoding.
- Added login request and token response schemas.
- Implemented `login_user()` service.
- Added `/auth/login` endpoint.
- Verified password authentication using bcrypt.
- Successfully tested JWT login using Swagger.

## Learned
- JWT structure (Header, Payload, Signature).
- Stateless authentication.
- Standard JWT claims (`sub`, `exp`).
- Why secrets should be stored in environment variables.
- Why authentication should return generic error messages.

## Challenges
- Faced compatibility issues between `passlib` and `bcrypt`.
- Understanding how JWT differs from session-based authentication.

## Solution
- Used a compatible bcrypt version.
- Configured JWT secrets using `.env`.
- Implemented token generation and verification using `python-jose`.

## Next
- Build authentication dependencies.
- Protect API endpoints.
- Retrieve the currently logged-in user from the JWT.