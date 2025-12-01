web: python manage.py migrate --noinput && gunicorn Hostel.wsgi --workers=2 --bind 0.0.0.0:$PORT
release: python manage.py collectstatic --noinput
