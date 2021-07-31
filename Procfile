release: python manage.py migrate
web: daphne shared_easel.asgi:application --port $PORT --bind 0.0.0.0 -v2
chatworker: python manage.py runworker --settings=shared_easel.settings -v2