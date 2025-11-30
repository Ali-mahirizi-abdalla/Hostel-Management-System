import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Hostel.settings')
django.setup()

from hostel_app.models import Room

# Create sample rooms
rooms_data = [
    {
        'room_number': '101',
        'room_type': 'single',
        'capacity': 1,
        'price_per_night': 45,
        'amenities': 'WiFi, AC, Private Bathroom'
    },
    {
        'room_number': '102',
        'room_type': 'double',
        'capacity': 2,
        'price_per_night': 65,
        'amenities': 'WiFi, AC, Private Bathroom, TV'
    },
    {
        'room_number': '103',
        'room_type': 'dorm',
        'capacity': 4,
        'price_per_night': 25,
        'amenities': 'WiFi, Shared Bathroom, Lockers'
    },
    {
        'room_number': '104',
        'room_type': 'suite',
        'capacity': 3,
        'price_per_night': 95,
        'amenities': 'WiFi, AC, Private Bathroom, TV, Kitchenette'
    },
    {
        'room_number': '201',
        'room_type': 'double',
        'capacity': 2,
        'price_per_night': 65,
        'amenities': 'WiFi, AC, Private Bathroom, TV'
    },
    {
        'room_number': '202',
        'room_type': 'single',
        'capacity': 1,
        'price_per_night': 45,
        'amenities': 'WiFi, AC, Private Bathroom'
    },
]

# Add rooms to database
for room_data in rooms_data:
    room, created = Room.objects.get_or_create(**room_data)
    if created:
        print(f"✓ Created Room {room.room_number}")
    else:
        print(f"- Room {room.room_number} already exists")

print("\nAll rooms added successfully!")
