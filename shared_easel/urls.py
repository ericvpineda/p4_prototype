from . import views
from django.urls import path
from django.conf.urls import url

urlpatterns = [
    path('', views.home, name='home'),
    path('login', views.login, name='login'),
    path('game', views.game, name='game'),
    path('add-users', views.add_users, name='add-users'),
]

