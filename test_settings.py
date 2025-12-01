import os
import sys

# Add your project to path
sys.path.append('.')

# Test the settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Hostel.settings')

try:
    from django.conf import settings
    print(" Successfully loaded settings")
    print(f"DEBUG: {settings.DEBUG}")
    print(f"ALLOWED_HOSTS: {settings.ALLOWED_HOSTS}")
    print(f"Has SECRET_KEY: {hasattr(settings, 'SECRET_KEY')}")
    print(f"Has DATABASES: {hasattr(settings, 'DATABASES')}")
except Exception as e:
    print(f" Error: {e}")
