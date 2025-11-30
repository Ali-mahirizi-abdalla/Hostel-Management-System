from django.db import models

class Room(models.Model):
    ROOM_TYPE_CHOICES = [
        ('single', 'Single'),
        ('double', 'Double'),
        ('dorm', 'Dorm (4 beds)'),
        ('suite', 'Suite'),
    ]
    
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('occupied', 'Occupied'),
        ('maintenance', 'Maintenance'),
    ]
    
    room_number = models.CharField(max_length=10, unique=True)
    room_type = models.CharField(max_length=20, choices=ROOM_TYPE_CHOICES)
    capacity = models.IntegerField()
    price_per_night = models.DecimalField(max_digits=8, decimal_places=2)
    amenities = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Room {self.room_number} - {self.get_room_type_display()}"
    
    class Meta:
        ordering = ['room_number']


class Guest(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=15)
    address = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['name']


class Booking(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('checked_in', 'Checked In'),
        ('checked_out', 'Checked Out'),
        ('cancelled', 'Cancelled'),
    ]
    
    guest = models.ForeignKey(Guest, on_delete=models.CASCADE, related_name='bookings')
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='bookings')
    check_in_date = models.DateField()
    check_out_date = models.DateField()
    number_of_guests = models.IntegerField()
    special_requests = models.TextField(blank=True, null=True)
    total_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Booking {self.id} - {self.guest.name} in Room {self.room.room_number}"
    
    class Meta:
        ordering = ['-created_at']
