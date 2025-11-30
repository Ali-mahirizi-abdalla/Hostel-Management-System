# Contributing

Thank you for considering contributing to this project. Contributions can include bug fixes, feature enhancements, documentation improvements, and design tweaks.

Guidelines

1. Fork the repository and create a new branch for your change:

```bash
git checkout -b feat/your-feature-name
```

2. Follow the existing code style:
   - Python: PEP8 (use a linter like `flake8` locally).
   - Templates: keep Django templating conventions.
   - CSS/JS: consistent style with the existing files.

3. Keep secrets out of commits — use `.env` and `.env.example`.

4. Add or update tests where relevant.

5. Submit a pull request describing:
   - What you changed
   - Why it matters
   - Any migration or manual steps required

Code ownership

- `hostel_app/models.py` — core data models
- `hostel_app/views.py` — application logic and request handlers
- `hostel_app/templates/` — UI templates

If you're unsure about a change, open an issue first to discuss.
