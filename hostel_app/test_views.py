from django.http import HttpResponse
from django.shortcuts import render

def test_simple(request):
    return HttpResponse('TEST: Django is working!')
    
def test_template(request):
    return render(request, 'index.html', {
        'total_rooms': 10,
        'occupied_rooms': 3,
        'available_rooms': 7,
        'total_guests': 5,
        'rooms': [],
        'bookings': []
    })
