# Architecture

This document explains the high-level structure of the project, where to find code, and how the main components interact.

Project layout (important files/folders):

- `Hostel/` — Django project settings and WSGI/ASGI entry points
  - `settings.py` — configuration (modify to use env vars in production)
  - `urls.py` — project routes
  - `wsgi.py`, `asgi.py`
- `hostel_app/` — the main application
  - `models.py` — Room, Guest, Booking models
  - `views.py` — request handlers (index, book_room, checkout_room, show_data, auth views)
  - `templates/` — Django templates for pages
  - `static/` — CSS, JS, images
  - `admin.py` — model admin registrations
- `manage.py` — Django management CLI
- `db.sqlite3` — local DB (development)

Request flow (example: booking)

1. User visits `/` (index view). The view retrieves available rooms and renders `index.html`.
2. User fills booking form and submits POST to `book_room` URL.
3. View validates input, creates `Guest` and `Booking` records, then redirects with a success message.
4. Staff can access `/data/` (protected by `login_required`) to see stats and records.

Templates

- `index.html` — main booking page, shows gallery, form, stats
- `login.html` / `register.html` — authentication forms
- `data.html` — protected data viewer (requires login)

Static assets

- `static/css/` — main CSS files (`style.css`, `professional.css`) and optional 3D CSS (removed from templates)
- `static/js/` — `main.js` (UI logic), optional `forms-3d.js` (not loaded)

Notes

- Views are intentionally kept simple for clarity and learning; it is straightforward to add APIs or REST endpoints later (Django REST Framework).
- For production, use PostgreSQL and configure persistent storage for media/static files if needed.
