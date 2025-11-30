# Models

This document lists the data models and key fields. See `hostel_app/models.py` for the exact implementation.

## Room

- `room_number` (string/int): unique identifier for the room
- `room_type` (choice): `single`, `double`, `dorm`, `suite`
- `capacity` (int)
- `price_per_night` (decimal)
- `amenities` (text)
- `status` (choice): `available`, `occupied`, `maintenance`

## Guest

- `name` (string)
- `email` (email)
- `phone` (string)
- `notes` (text)

## Booking

- `guest` (ForeignKey to Guest)
- `room` (ForeignKey to Room)
- `check_in_date` (date)
- `check_out_date` (date)
- `status` (choice): `booked`, `checked_in`, `checked_out`, `cancelled`
- `created_at` (datetime)
- `special_requests` (text)

Relations

- `Guest` 1:N `Booking` (a guest can have many bookings)
- `Room` 1:N `Booking` (a room can have many bookings over time)

Notes

- Business logic such as availability checks are implemented in views; consider moving to model methods or services for larger apps.
- Indexes can be added on fields used frequently in filters (dates, room_number).
