# 2026-07-07

## Objective

Initialize the MediaShield backend project and establish the development environment.

## Tasks Completed

- Set up the FastAPI backend project using `uv`.
- Initialized the Python project with `pyproject.toml`.
- Installed FastAPI and Uvicorn.
- Created the initial project structure.
- Organized API endpoints using routers.
- Separated configuration into a dedicated `core/config.py` module.
- Verified the FastAPI server was running successfully.

## Concepts Learned

### Python

- Modern dependency management using `uv`.
- Project configuration with `pyproject.toml`.
- Virtual environments and dependency isolation.

### FastAPI

- Application entry point (`main.py`).
- API Routers.
- Modular project structure.

### Backend Architecture

- Separation of concerns.
- Why configuration should not be hardcoded.
- Organizing code into maintainable modules.

### Linux

- Services and background processes.
- Why backend applications rely on system services.

## Problems Faced

- Python packages were not initially detected by VS Code because the correct interpreter was not selected.
- Learned how to activate and use the project's virtual environment.

## Solutions

- Configured VS Code to use the project's virtual environment.
- Verified FastAPI installation by successfully running the development server.

## Key Takeaways

- Every backend project should begin with a clean, modular structure.
- Configuration should be separated from application logic.
- Dependency management is simpler and faster with `uv`.
- Routers help keep API endpoints organized and maintainable.

## Next Session Goals

- Learn PostgreSQL.
- Connect FastAPI with PostgreSQL.
- Understand SQLAlchemy and ORM fundamentals.




# 2026-07-08

## Objective
Set up SQLAlchemy and Alembic to connect FastAPI with PostgreSQL and create the first database model.

## Tasks Completed

- Designed the initial `User` SQLAlchemy model.
- Added fields:
  - `id`
  - `full_name`
  - `email`
  - `hashed_password`
  - `is_active`
  - `is_verified`
- Learned why passwords are stored as hashes instead of plain text.
- Learned why `email` should have a unique database constraint.
- Learned the concept of soft deletion using `is_active`.
- Created the SQLAlchemy `Base` class.
- Configured Alembic to use `Base.metadata`.
- Connected Alembic with the application's `.env` configuration.
- Generated the initial migration for the `users` table.
- Applied the migration using:
  ```bash
  uv run alembic upgrade head