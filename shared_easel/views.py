from django.shortcuts import render
import logging

logger = logging.getLogger('app_api')
# logger.info(sys.path)

pics = {"profile_pics" : ["cat.jpg", "chicken.jpg", "cow.jpg", "deer.jpg", "dog.jpg", "fox.jpg", "monkey.jpg", "panda.jpg", "pig.jpg"]}

# Create your views here.
def home(request):
    return render(request, 'home.html') 

def login(request):
    return render(request, 'login.html') 

def add_users(request):
    return render(request, 'add-users.html', pics) 

def game(request):
    return render(request, 'game.html') 
