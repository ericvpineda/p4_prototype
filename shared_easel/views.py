from django.shortcuts import render

# Create your views here.
def home(request):
    return render(request, 'home.html') 

def add_users(request):
    return render(request, 'add-users.html') 

def game(request):
    return render(request, 'game.html') 
