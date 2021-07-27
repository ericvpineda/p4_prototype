# note: build asgi application for websocket 
from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.security.websocket import AllowedHostsOriginValidator
from django.core.asgi import get_asgi_application
import shared_easel.routing

import django
django.setup()


application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    'websocket' : AllowedHostsOriginValidator(
        AuthMiddlewareStack(
            URLRouter(
                shared_easel.routing.websocket_urlpatterns
            )
        )
    )
})