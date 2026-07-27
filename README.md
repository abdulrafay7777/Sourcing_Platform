# PakSource Connect — Starter Scaffold

## Backend (FastAPI)

```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Runs on http://localhost:8000. Uses SQLite by default (`paksource.db` file, auto-created).
To use PostgreSQL instead, set the `DATABASE_URL` env var before running, e.g.:
`postgresql://user:password@localhost:5432/paksource`

API docs available at http://localhost:8000/docs (FastAPI auto-generated Swagger UI).

### Key endpoint
`POST /api/sourcing-requests` — accepts multipart form data matching the SRS request form
fields (company_name, contact_person, phone, email, city, product_name, description,
specifications, quantity, target_price, deadline, files[]). Returns a generated Request ID.

`GET /api/sourcing-requests/{request_id}` — fetch a request's current status.

## Frontend (React + Vite + Plain CSS + Framer Motion)

```bash
cd frontend
npm install
npm run dev
```

Runs on http://localhost:5173 and talks to the backend at http://localhost:8000 by default.
To point at a different backend URL, create a `.env` file with:
`VITE_API_BASE=http://your-backend-url`

## What's implemented
- Home page with animated hero + "how it works" steps
- Request Sourcing form wired to the FastAPI backend, including file upload
- Navbar with scroll-aware background and animated mobile menu
- Placeholder About / Services / More pages (content only, ready for copy)

## What's next (not yet built)
- Admin dashboard (view requests, upload supplier comparisons/quotations)
- Payment proof upload + confirmation flow
- Email/WhatsApp notification triggers (hook into the TODO in `sourcing.py`)
- Customer request-status lookup page (uses the GET endpoint already built)
- Auth (OTP for customers, JWT for admin)
