# Hostel Management (Django)

This is a Django-based Hostel Management / Booking system.

Quick local setup (Windows PowerShell):

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -U pip
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Files important for deployment:
- `Procfile` - for hosting platforms using Gunicorn (e.g., Render).
- `.env.example` - example env file (copy to `.env` locally and fill secrets).
- `.gitignore` - ignore local files and secrets.

Deployment: recommend Render, Railway, or Docker + VPS. See project owner notes for more.
