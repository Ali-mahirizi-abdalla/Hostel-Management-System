from django.http import HttpResponse

def index(request):
    return HttpResponse(' Hostel Management System - WORKING!<br><br>'
                       'Database setup may be needed.<br>'
                       'Run: python manage.py migrate')
