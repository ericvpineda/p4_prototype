from django.shortcuts import render
from django.template.defaulttags import register
import random
import logging
import uuid 

logger = logging.getLogger('app_api')
# logger.info(sys.path)

id = {
    "profile_pics" : ["cat.jpg", "chicken.jpg", "cow.jpg", "deer.jpg", "dog.jpg", "fox.jpg", "monkey.jpg", "panda.jpg", "pig.jpg"],
    "id" : uuid.uuid4()
    }

numbers = [2, 3, 7, 6, 2, 5, 7, 0, 0, 1, 3, 5, 6, 4, 8, 9]
letters = ["H", "P", "A", "I", "E", "L", "R", "T", "G", "B", "Z", "M", "N", "O", "C", "F"]
random.shuffle(numbers)
random.shuffle(letters)

dominos = {
    "letter" : letters,
    "num" : numbers,
    "range" : range(16)
}

@register.filter 
def get_item(d, key):
    return d[key]

# Create your views here.
def home(request):
    return render(request, 'home.html') 

def login(request):
    return render(request, 'login.html') 

def add_users(request):
    return render(request, 'add-users.html', id) 

def game(request):
    return render(request, 'game.html') 

def individualGameScreen(request):
    return render(request, 'individualGameScreen.html', dominos) 
