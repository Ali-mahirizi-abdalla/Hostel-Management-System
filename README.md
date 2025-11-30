# Hostel Management (Django)

A full-stack Django application for managing hostel rooms, guests, and bookings. This repository contains the web app, templates, static assets, and deployment helpers to run locally or on cloud hosts.

---

## Features

- Room management (single, double, dorm, suite)
- Guest records and bookings
- Simple booking form with validation
- Protected admin / data viewer (login required)
- Responsive, modern UI with professional styles

---

## Quick Local Setup (Windows PowerShell)

1. Create and activate a virtual environment:

```powershell
cd 'C:\Users\jamal\OneDrive\Desktop\Hostel'
python -m venv .venv
.venv\Scripts\Activate.ps1
```

2. Install dependencies:

```powershell
pip install -U pip
pip install -r requirements.txt
```

3. Prepare the database and create a superuser:

```powershell
python manage.py migrate
python manage.py createsuperuser
```

4. Run the development server:

```powershell
python manage.py runserver
```

Open http://127.0.0.1:8000/ in your browser.

---

## Environment Variables

Copy `.env.example` to `.env` (do NOT commit `.env`):

```text
DJANGO_SECRET_KEY=replace-with-your-secret-key
DJANGO_DEBUG=False
ALLOWED_HOSTS=127.0.0.1 localhost
DATABASE_URL=sqlite:///db.sqlite3
```

- `DJANGO_SECRET_KEY`: keep this secret in production.
- `DJANGO_DEBUG`: `False` for production.
- `ALLOWED_HOSTS`: space-separated hostnames for production.
- `DATABASE_URL`: Postgres URL in production is recommended.

---

## Static Files

This project uses WhiteNoise for serving static files in production. When deploying, remember to run:

```powershell
python manage.py collectstatic --noinput
```

Static files will be collected into `STATIC_ROOT` (configured in `settings.py`).

---

## Database

The project currently uses SQLite for local development (`db.sqlite3`). For production, provision a PostgreSQL database and set `DATABASE_URL` accordingly. Use `dj-database-url` (already included in `requirements.txt`) to parse the URL.

Migrate on the server after setting the environment variables:

```bash
python manage.py migrate
```

---

## Deployment Options

Below are two recommended deployment paths. Pick one and follow the steps.

### Option A — Render (easy, recommended)

1. Push your repository to GitHub.
2. In Render, create a new **Web Service** and connect your GitHub repo.
3. Set the build and start commands:

   - Build command: `pip install -r requirements.txt`
   - Start command: `web: gunicorn Hostel.wsgi:application --log-file -`

4. Add environment variables in Render (Settings → Environment):
   - `DJANGO_SECRET_KEY` (your secret)
   - `DJANGO_DEBUG` = `False`
   - `ALLOWED_HOSTS` = your Render URL (or space-separated list)

5. Add a managed Postgres add-on on Render (or provide an external `DATABASE_URL`).
6. After the service is live, run migrations and collectstatic from Render's shell:

```bash
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
```

Render will serve your app with Gunicorn; WhiteNoise handles static assets.

### Option B — Docker + VPS (DigitalOcean / any Docker host)

1. Add a `Dockerfile` and `docker-compose.yml` (examples below). Do not store secrets in the image — use environment variables or a secret manager.

Example `Dockerfile` (minimal):

```dockerfile
FROM python:3.11-slim
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
WORKDIR /app
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt
COPY . /app/
RUN python manage.py collectstatic --noinput
CMD ["gunicorn", "Hostel.wsgi:application", "--bind", "0.0.0.0:8000"]
```

Example `docker-compose.yml` (local development):

```yaml
version: '3.8'
services:
  web:
    build: .
    ports:
      - "8000:8000"
    env_file: .env
    depends_on:
      - db
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: hostel_db
      POSTGRES_USER: hostel
      POSTGRES_PASSWORD: secretpassword
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

2. Deploy the image to your VPS or a container hosting platform, configure Nginx as a reverse proxy, and obtain TLS certificates (Let's Encrypt recommended).

3. Run migrations and create a superuser on the server.

---

## Recommended Production Settings

- `DEBUG = False`
- Secure and rotate `SECRET_KEY`
- Use PostgreSQL (managed service recommended)
- Use HTTPS (Let's Encrypt)
- Configure `ALLOWED_HOSTS`
- Monitor logs and set up backups for the DB

---

## Git / GitHub

If you haven't pushed this project yet, run:

```powershell
git init
git add .
git commit -m "Initial commit - hostel management system"
git branch -M main
# then add remote and push (example):
git remote add origin https://github.com/<your-username>/hostel-management.git
git push -u origin main
```

If you have the GitHub CLI installed, you can create and push in one step:

```powershell
gh repo create hostel-management --private --source=. --remote=origin --push
```

---

## Cleaning up 3D assets

The project previously included optional 3D form styles and JS. They have been removed from templates; the files remain in `static/` in case you want to restore them later.

---

## Troubleshooting

- If assets 404 after deployment, ensure `collectstatic` ran and `STATIC_ROOT` is served correctly.
- If migrations fail on the server, verify database credentials and that the DB is reachable.
- For debug: set `DJANGO_DEBUG=True` locally only.

---

## Contributing

Feel free to open issues or pull requests. Keep sensitive data out of commits.

---

## License

This project does not include a license file. Add one if you intend to publish or share the code.

---

If you want, I can now:

- Patch `Hostel/settings.py` to read config from environment variables (I can make a safe, reversible change),
- Add a `Dockerfile` and `docker-compose.yml` to the repo,
- Remove the unused 3D static files from `static/`.

Which of these would you like me to do next?
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
