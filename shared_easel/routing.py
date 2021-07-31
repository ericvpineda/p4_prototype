from django.conf.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'wss$', consumers.DrawConsumer.as_asgi())
]