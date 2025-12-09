release: python manage.py makemigrations --noinput && python manage.py migrate --noinput && python manage.py collectstatic --noinput
web: gunicorn Hostel.wsgi --workers=2 --bind 0.0.0.0:$PORT
web: gunicorn Hostel.wsgi:application --log-file -
