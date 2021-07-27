from django.conf.urls import re_path
from . import consumers

websocket_urlpatterns = [re_path(r'ws$', consumers.DrawConsumer.as_asgi())]