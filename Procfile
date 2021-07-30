web: daphne project.asgi:application --port $PORT --bind 0.0.0.0
python manage.py collectstatic --noinput
manage.py migrate