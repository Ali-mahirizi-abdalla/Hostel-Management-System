from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.views.decorators.http import require_http_methods
from .models import Room, Guest, Booking
from datetime import datetime

def index(request):
    """Display hostel management dashboard"""
    rooms = Room.objects.all()
    bookings = Booking.objects.all()
    
    # Calculate stats
    total_rooms = rooms.count()
    occupied_rooms = rooms.filter(status='occupied').count()
    available_rooms = rooms.filter(status='available').count()
    total_guests = bookings.filter(status__in=['checked_in', 'confirmed']).count()
    
    context = {
        'rooms': rooms,
        'bookings': bookings,
        'total_rooms': total_rooms,
        'occupied_rooms': occupied_rooms,
        'available_rooms': available_rooms,
        'total_guests': total_guests,
    }
    
    return render(request, 'index.html', context)


@require_http_methods(["POST"])
def book_room(request):
    """Handle room booking"""
    name = request.POST.get('name')
    email = request.POST.get('email')
    phone = request.POST.get('phone')
    room_type = request.POST.get('roomtype')
    check_in = request.POST.get('checkin')
    check_out = request.POST.get('checkout')
    num_guests = request.POST.get('guests')
    special_requests = request.POST.get('message', '')
    
    try:
        # Get or create guest
        guest, created = Guest.objects.get_or_create(
            email=email,
            defaults={
                'name': name,
                'phone': phone,
            }
        )
        
        # Find available room
        room = Room.objects.filter(
            room_type=room_type,
            status='available'
        ).first()
        
        if room:
            # Convert date strings to date objects
            check_in_date = datetime.strptime(check_in, '%Y-%m-%d').date()
            check_out_date = datetime.strptime(check_out, '%Y-%m-%d').date()
            
            # Calculate total price
            num_nights = (check_out_date - check_in_date).days
            if num_nights <= 0:
                messages.error(request, '❌ Check-out date must be after check-in date!')
                return redirect('index')
            
            total_price = float(room.price_per_night) * num_nights
            
            # Create booking
            booking = Booking.objects.create(
                guest=guest,
                room=room,
                check_in_date=check_in_date,
                check_out_date=check_out_date,
                number_of_guests=num_guests,
                special_requests=special_requests,
                total_price=total_price,
                status='confirmed'
            )
            
            # Update room status
            room.status = 'occupied'
            room.save()
            
            # Add success message
            messages.success(
                request, 
                f'✅ BOOKING CONFIRMED! Room {room.room_number} booked for {name} | Dates: {check_in_date} to {check_out_date} | Total: ${total_price}'
            )
        else:
            messages.error(request, f'❌ No {room_type} rooms available. Please try another room type or date.')
    except ValueError as e:
        messages.error(request, f'❌ Invalid date format. Please use YYYY-MM-DD')
    except Exception as e:
        messages.error(request, f'❌ Booking failed: {str(e)}')
    
    return redirect('index')


@require_http_methods(["GET"])
def checkout_room(request, booking_id):
    """Handle guest checkout"""
    try:
        booking = Booking.objects.get(id=booking_id)
        room = booking.room
        guest_name = booking.guest.name
        
        # Update booking status
        booking.status = 'checked_out'
        booking.save()
        
        # Update room status
        room.status = 'available'
        room.save()
        
        messages.success(request, f'✅ CHECKED OUT! {guest_name} from Room {room.room_number} - Room is now available.')
    except Exception as e:
        messages.error(request, f'❌ Checkout failed: {str(e)}')
    
    return redirect('index')


@login_required(login_url='login')
def show_data(request):
    """Display all stored data in the database - Authenticated users only"""
    rooms = Room.objects.all()
    guests = Guest.objects.all()
    bookings = Booking.objects.all()
    occupied_count = rooms.filter(status='occupied').count()
    
    context = {
        'rooms': rooms,
        'guests': guests,
        'bookings': bookings,
        'occupied_count': occupied_count,
    }
    
    return render(request, 'data.html', context)


def login_page(request):
    """Handle user login"""
    if request.user.is_authenticated:
        return redirect('index')
    
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            messages.success(request, f'✅ Welcome back, {username}!')
            return redirect('index')
        else:
            messages.error(request, '❌ Invalid username or password.')
    
    return render(request, 'login.html')


def register_page(request):
    """Handle user registration"""
    if request.user.is_authenticated:
        return redirect('index')
    
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        password_confirm = request.POST.get('password_confirm')
        
        # Validation
        if not username or not email or not password:
            messages.error(request, '❌ All fields are required.')
            return redirect('register')
        
        if password != password_confirm:
            messages.error(request, '❌ Passwords do not match.')
            return redirect('register')
        
        if len(password) < 6:
            messages.error(request, '❌ Password must be at least 6 characters.')
            return redirect('register')
        
        if User.objects.filter(username=username).exists():
            messages.error(request, '❌ Username already exists.')
            return redirect('register')
        
        if User.objects.filter(email=email).exists():
            messages.error(request, '❌ Email already exists.')
            return redirect('register')
        
        # Create user
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )
        
        messages.success(request, '✅ Account created successfully! Please log in.')
        return redirect('login')
    
    return render(request, 'register.html')


def logout_page(request):
    """Handle user logout"""
    logout(request)
    messages.success(request, '✅ You have been logged out successfully.')
    return redirect('index')
