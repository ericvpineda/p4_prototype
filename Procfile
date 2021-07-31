release: python manage.py migrate
web: daphne p4_prototype.asgi:application --port $PORT --bind 0.0.0.0 -v2
chatworker: python manage.py runworker --settings=p4_prototype.settings -v2