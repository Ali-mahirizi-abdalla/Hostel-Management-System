# API / Endpoints

This app primarily uses server-rendered views (no REST API by default). Below are the key routes and what they do.

Routes (project `urls.py` maps these):

- `/` (GET) — `index` view. Renders booking form, room gallery, and quick stats.
- `/book/` (POST) — `book_room` view. Accepts booking form submissions (name, email, phone, roomtype, checkin, checkout, guests, message). Creates Guest and Booking records.
- `/checkout/<booking_id>/` (GET/POST) — `checkout_room` view. Marks a booking as checked-out.
- `/data/` (GET) — `show_data` view. Protected by `login_required`. Shows rooms, guests, bookings, and stats.
- `/login/`, `/register/`, `/logout/` — authentication views.
- `/admin/` — Django admin (requires staff user).

Form behavior (index booking form)

- Fields: `name`, `email`, `phone`, `roomtype`, `checkin`, `checkout`, `guests`, `message`.
- Validation: Basic HTML required attributes are used; server validates dates and availability.
- On success: creates or reuses a `Guest` record, creates `Booking`, and redirects with a success message.

Return values

- HTML pages using Django templates. Redirects after POSTs to avoid double-submits.

Extending with an API

- To add an API, install Django REST Framework and create serializers for `Room`, `Guest`, and `Booking`.
- Protect endpoints with token authentication or JWT for mobile/third-party clients.

If you want, I can scaffold a minimal DRF API and add simple endpoint examples (list rooms, create booking) and document them here.