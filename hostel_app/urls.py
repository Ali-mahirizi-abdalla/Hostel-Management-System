from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('book/', views.book_room, name='book_room'),
    path('checkout/<int:booking_id>/', views.checkout_room, name='checkout_room'),
    path('data/', views.show_data, name='show_data'),
    path('login/', views.login_page, name='login'),
    path('register/', views.register_page, name='register'),
    path('logout/', views.logout_page, name='logout'),
]
