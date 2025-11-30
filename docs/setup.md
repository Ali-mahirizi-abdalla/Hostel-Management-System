# Local Setup

This guide covers preparing your machine, installing requirements, and running the app locally.

Prerequisites

- Python 3.11+ (project tested on 3.11/3.12)
- Git (optional, for version control)

Steps (Windows PowerShell)

```powershell
cd 'C:\Users\jamal\OneDrive\Desktop\Hostel'
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -U pip
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Environment variables

Copy `.env.example` to `.env` and update values for local testing. Example:

```
DJANGO_SECRET_KEY=dev-secret
DJANGO_DEBUG=True
ALLOWED_HOSTS=127.0.0.1 localhost
DATABASE_URL=sqlite:///db.sqlite3
```

Static files

When you change static assets, run:

```powershell
python manage.py collectstatic --noinput
```

Testing

- Use the Django admin (`/admin/`) to inspect models.
- Use the UI to create bookings and verify entries in the database. 

Notes

- Keep `.env` out of version control.
- For production, set `DJANGO_DEBUG=False` and use a strong `DJANGO_SECRET_KEY`.
