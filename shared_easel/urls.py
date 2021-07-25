from . import views
from django.urls import path 

urlpatterns = [
    path('', views.home, name='home'),
    path('add-users', views.add_users, name='add-users'),
    path('game', views.game, name='game')
]

