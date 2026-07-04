# Expense Tracker

A full-stack expense tracking application built with **Django REST Framework** and **React**. The application allows users to securely manage their personal expenses through a clean, responsive interface with session-based authentication.

---

## Features

- User registration and login
- Secure session-based authentication
- CSRF-protected API requests
- Add and view personal expenses
- Predefined expense categories
- RESTful API built with Django REST Framework
- Responsive React frontend
- Clean separation between frontend and backend

---

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router

### Backend

- Django
- Django REST Framework

### Database

- SQLite

---

## Project Structure

```text
Expense-Tracker/
│
├── backend/
│   ├── expenses/
│   ├── manage.py
│   └── requirements.txt
│
└── frontend/
    └── my-react-app/
        ├── src/
        ├── package.json
        └── vite.config.js
```

---


# Running Locally

## 1. Clone the repository

```bash
git clone https://github.com/Sub-47/Expense-Tracker.git
cd Expense-Tracker
```

---

## 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv .venv
```

### Windows

```bash
.venv\Scripts\activate
```

### Linux/macOS

```bash
source .venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Apply migrations

```bash
python manage.py migrate
```

Start the server

```bash
python manage.py runserver
```

The backend runs at:

```
http://127.0.0.1:8000
```

---

## 3. Frontend Setup

Open a new terminal.

```bash
cd frontend/my-react-app

npm install

npm run dev
```

The frontend runs at:

```
http://localhost:5173
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/register/` | Register a new user |
| POST | `/api/login/` | Login |
| POST | `/api/logout/` | Logout |
| GET | `/api/categories/` | Retrieve all expense categories |
| GET | `/api/expenses/` | Retrieve user's expenses |
| POST | `/api/expenses/add/` | Add a new expense |

---

## Security

- Session-based authentication
- CSRF protection for all POST requests
- Django ORM prevents SQL injection
- Protected API endpoints for authenticated users

---

## Future Improvements

- Edit and delete expenses
- Expense analytics with charts
- Budget tracking
- Search and filter expenses
- Monthly summaries
- Export expenses to CSV/PDF
- PostgreSQL support
- Docker deployment
- Production deployment on Render or Railway

---

## What I Learned

Through this project I gained experience with:

- Django REST Framework
- Building REST APIs
- React frontend integration
- Session authentication
- CSRF protection
- API consumption using React
- Routing with React Router
- Organizing a full-stack application

---

## License

This project is licensed under the MIT License.

---

## Author

**Subham Chapagain**

GitHub: https://github.com/Sub-47
