"""
Django settings for Hostel project (Optimized for Railway/Render Deployment).
"""

import os
from pathlib import Path
import environ
import dj_database_url

# === BASE PATH ===
BASE_DIR = Path(__file__).resolve().parent.parent

# === ENVIRONMENT SETUP ===
env = environ.Env()
env_file = BASE_DIR / '.env'

if env_file.exists():
    environ.Env.read_env(env_file)

# === SECURITY / CORE CONFIG ===
SECRET_KEY = env('SECRET_KEY', default='django-insecure-dev-key')

DEBUG = env.bool('DEBUG', default=False)

# Auto-detect Railway domain
RAILWAY_PUBLIC_DOMAIN = os.environ.get('RAILWAY_PUBLIC_DOMAIN')

if RAILWAY_PUBLIC_DOMAIN:
    ALLOWED_HOSTS = [
        RAILWAY_PUBLIC_DOMAIN,
        f'.{RAILWAY_PUBLIC_DOMAIN}',
        'localhost',
        '127.0.0.1'
    ]
    CSRF_TRUSTED_ORIGINS = [
        f'https://{RAILWAY_PUBLIC_DOMAIN}'
    ]
else:
    ALLOWED_HOSTS = env.list("ALLOWED_HOSTS", default=["localhost", "127.0.0.1"])
    CSRF_TRUSTED_ORIGINS = env.list(
        "CSRF_TRUSTED_ORIGINS",
        default=["http://localhost", "http://127.0.0.1"]
    )

# === INSTALLED APPS ===
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'hostel_app',  # your app
]

# === MIDDLEWARE ===
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Serve static files on Railway/Render

    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMidd
