# Deployment Guide

This file summarizes two deployment methods: Render (recommended) and Docker + VPS.

## Common preparation

1. Ensure `requirements.txt` is up to date:

```powershell
pip install -r requirements.txt
pip freeze > requirements.txt
```

2. Ensure `Procfile` exists in repo root (for Render):

```
web: gunicorn Hostel.wsgi:application --log-file -
```

3. Move secrets to environment variables (do not commit `.env` to repo).

4. If using WhiteNoise, ensure `STATIC_ROOT` and middleware are configured.

---

## Deploy to Render (recommended)

1. Push repo to GitHub.
2. Create a new **Web Service** on Render and connect to repo.
3. Build command: `pip install -r requirements.txt`
4. Start command: `gunicorn Hostel.wsgi:application --log-file -`
5. Add environment variables in the Render dashboard (e.g., `DJANGO_SECRET_KEY`, `DJANGO_DEBUG`, `ALLOWED_HOSTS`, `DATABASE_URL`).
6. Add Postgres add-on, or provide `DATABASE_URL` pointing to a managed Postgres.
7. Use Render's shell to run:

```bash
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py createsuperuser
```

---

## Docker + VPS (DigitalOcean or other)

1. Add a `Dockerfile` and optionally `docker-compose.yml` (examples in README).
2. Build an image and push it to a registry (Docker Hub, GitHub Container Registry):

```bash
docker build -t yourname/hostel .
docker push yourname/hostel
```

3. On your VPS, pull the image and run it (or use `docker-compose up -d`).
4. Use Nginx as a reverse proxy and obtain SSL certificates with Let's Encrypt.
5. Run migrations and collectstatic in the running container or via one-off commands.

---

## Post-deploy checklist

- Verify `DEBUG=False`.
- Check `ALLOWED_HOSTS` contains the deployed host name.
- Confirm static assets load (collectstatic completed).
- Regular backups for DB.
- Monitor logs for errors during startup.

If you'd like, I can generate a `Dockerfile` and `docker-compose.yml` now and patch `settings.py` to use environment variables safely.