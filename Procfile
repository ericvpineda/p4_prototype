web: daphne p4_prototype.asgi:application --port $PORT --bind 0.0.0.0 -v2
python manage.py collectstatic --noinput
manage.py migrate