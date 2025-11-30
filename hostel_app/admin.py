from django.contrib import admin
from .models import Room, Guest, Booking

class RoomAdmin(admin.ModelAdmin):
    list_display = ('room_number', 'room_type', 'capacity', 'price_per_night', 'status')
    list_filter = ('room_type', 'status')
    search_fields = ('room_number',)
    readonly_fields = ('created_at', 'updated_at')

class GuestAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone')
    search_fields = ('name', 'email')
    readonly_fields = ('created_at',)

class BookingAdmin(admin.ModelAdmin):
    list_display = ('id', 'guest', 'room', 'check_in_date', 'check_out_date', 'status', 'total_price')
    list_filter = ('status', 'check_in_date')
    search_fields = ('guest__name', 'room__room_number')
    readonly_fields = ('created_at', 'updated_at')

admin.site.register(Room, RoomAdmin)
admin.site.register(Guest, GuestAdmin)
admin.site.register(Booking, BookingAdmin)