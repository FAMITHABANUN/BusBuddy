# 🚌 BusBuddy – College Transport Issue Tracking & Resolution System

## 📌 Project Overview

BusBuddy is a web-based college transport issue tracking system that allows students to report problems related to college buses and helps staff/admin monitor, update, and resolve those issues.

The system provides a simple connection between students and transport administrators.

### 🔄 Basic Workflow

Student → Report Issue → Database → Staff/Admin → Update Status → Student Tracks Resolution

---

## 🎯 Problem Statement

Students may face transport-related problems such as:

- Bus delays
- Overcrowding
- Damaged seats
- Route problems
- Maintenance issues
- Other transport-related issues

Traditional reporting methods may make it difficult to track whether an issue has been received, processed, or resolved.

BusBuddy provides a centralized digital platform for reporting and managing these issues.

---

## 🎯 Objectives

1. Allow students to report transport problems easily.
2. Store issue information securely in a database.
3. Allow staff/admin to view reported issues.
4. Provide status updates for reported issues.
5. Support complete CRUD operations.
6. Provide search and filtering facilities.
7. Validate user input before storing data.
8. Improve communication between students and transport administrators.

---

## 🛠️ Technology Stack

| Component | Technology |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Django |
| API | Django REST Framework |
| Database | SQLite |
| API Testing | Postman |
| Version Control | Git & GitHub |

---

# 🏗️ System Architecture

```text
┌───────────────────────┐
│       Student         │
│   Web Browser / UI    │
└───────────┬───────────┘
            │
            │ HTTP Requests
            ▼
┌───────────────────────┐
│      Frontend         │
│ HTML + CSS + JS       │
└───────────┬───────────┘
            │
            │ REST API
            ▼
┌───────────────────────┐
│       Django          │
│     REST API          │
└───────────┬───────────┘
            │
            │ ORM
            ▼
┌───────────────────────┐
│       SQLite          │
│       Database        │
└───────────┬───────────┘
            │
            │
            ▼
┌───────────────────────┐
│     Staff / Admin     │
│    Dashboard & UI     │
└───────────────────────┘
````

---

# 🗄️ Database Design

## TransportIssue Table

| Field       | Type      | Description                |
| ----------- | --------- | -------------------------- |
| id          | Integer   | Primary key                |
| bus_number  | CharField | Bus identification number  |
| route       | CharField | Bus route                  |
| issue_type  | CharField | Type of transport issue    |
| description | TextField | Detailed issue description |
| reported_by | CharField | Student/reporter name      |
| status      | CharField | Current issue status       |
| priority    | CharField | Issue priority             |
| created_at  | DateTime  | Issue creation time        |
| updated_at  | DateTime  | Last update time           |

### ER Diagram

```text
┌─────────────────────────────┐
│       TransportIssue        │
├─────────────────────────────┤
│ PK  id                      │
│     bus_number              │
│     route                   │
│     issue_type              │
│     description             │
│     reported_by             │
│     status                  │
│     priority                │
│     created_at              │
│     updated_at              │
└─────────────────────────────┘
```

---

# 🔐 User Roles

## 👨‍🎓 Student

Students can:

* Login
* Report a transport issue
* View their reported issues
* Search issues
* Track issue status
* Logout

## 👨‍💼 Staff / Admin

Staff/Admin can:

* Login
* View reported issues
* Search issues
* Filter by status
* Filter by priority
* Edit issue information
* Change issue status
* Mark issues as resolved
* Delete issues
* Logout

---

# 🔄 CRUD Operations

BusBuddy implements complete CRUD functionality.

### Create

Students can submit a new transport issue.

```http
POST /api/issues/
```

### Read

Retrieve all issues:

```http
GET /api/issues/
```

Retrieve a specific issue:

```http
GET /api/issues/{id}/
```

### Update

Update an existing issue:

```http
PUT /api/issues/{id}/
```

or

```http
PATCH /api/issues/{id}/
```

### Delete

Delete an issue:

```http
DELETE /api/issues/{id}/
```

---

# 🔌 API Endpoints

| Method | Endpoint            | Purpose                |
| ------ | ------------------- | ---------------------- |
| GET    | `/api/issues/`      | Get all issues         |
| POST   | `/api/issues/`      | Create issue           |
| GET    | `/api/issues/{id}/` | Get one issue          |
| PUT    | `/api/issues/{id}/` | Update issue           |
| PATCH  | `/api/issues/{id}/` | Partially update issue |
| DELETE | `/api/issues/{id}/` | Delete issue           |
| POST   | `/api/login/`       | User login             |

---

# ✅ Input Validation

The application validates user input before submitting data.

### Bus Number

* Required
* Maximum 20 characters
* Allows letters, numbers, spaces and hyphens

### Route

* Required
* Minimum 2 characters

### Issue Type

* Required
* Must be one of the supported issue types

### Description

* Required
* Minimum 10 characters
* Maximum 500 characters

### Priority

Supported values:

* Low
* Medium
* High

### Status

Supported values:

* Reported
* In Progress
* Resolved

Invalid values are rejected by the backend API.

---

# 🔎 Search & Filtering

The system provides:

* Issue search
* Status filtering
* Priority filtering
* Issue type information
* Dashboard statistics

This helps staff quickly locate specific transport complaints.

---

# 🧪 Testing

The application was tested using Postman and the web interface.

| Test Case            | Expected Result            | Result   |
| -------------------- | -------------------------- | -------- |
| Create valid issue   | Issue created              | ✅ Passed |
| Create invalid issue | Validation error           | ✅ Passed |
| Get all issues       | Issues returned            | ✅ Passed |
| Get single issue     | Specific issue returned    | ✅ Passed |
| Update valid issue   | Issue updated              | ✅ Passed |
| Update invalid data  | Validation error           | ✅ Passed |
| Delete valid issue   | Issue deleted              | ✅ Passed |
| Delete invalid ID    | Error response             | ✅ Passed |
| Student login        | Dashboard opens            | ✅ Passed |
| Admin login          | Admin dashboard opens      | ✅ Passed |
| Search issues        | Matching issues displayed  | ✅ Passed |
| Status filtering     | Filtered results displayed | ✅ Passed |

---

# 🖥️ User Interface

## Home Page

The home page provides:

* Navigation
* Project introduction
* Report Issue button
* View Issues button
* Recent issue information
* Search and filtering

## Student Dashboard

Students can:

* View dashboard statistics
* Report issues
* View reported issues
* Track issue status
* Search issues

## Staff/Admin Dashboard

Staff/Admin can:

* View all issues
* Search issues
* Filter issues
* Edit issues
* Resolve issues
* Delete issues

---

# ⚙️ Installation & Execution

## 1. Clone the Repository

```bash
git clone https://github.com/FAMITHABANUN/BusBuddy.git
```

```bash
cd BusBuddy
```

## 2. Create Virtual Environment

```bash
python -m venv venv
```

## 3. Activate Virtual Environment

### Windows

```bash
venv\Scripts\activate
```

## 4. Install Dependencies

```bash
pip install -r requirements.txt
```

## 5. Apply Database Migrations

```bash
python manage.py migrate
```

## 6. Start Django Server

```bash
python manage.py runserver
```

The backend will run at:

```text
http://127.0.0.1:8000/
```

## 7. Open Frontend

Open the `frontend` folder using VS Code Live Server.

The frontend communicates with the Django REST API running locally.

---

# 📁 Project Structure

```text
BusBuddy/
│
├── config/
│   ├── settings.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
│
├── issues/
│   ├── migrations/
│   ├── admin.py
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py
│   └── views.py
│
├── frontend/
│   ├── index.html
│   ├── login.html
│   ├── student-dashboard.html
│   ├── staff-dashboard.html
│   ├── script.js
│   └── style.css
│
├── manage.py
├── requirements.txt
├── .gitignore
└── README.md
```

---

# 🔒 Security

The project follows basic security practices:

* Sensitive environment variables are not committed.
* `.env` files are ignored using `.gitignore`.
* Database credentials are not stored in frontend code.
* Backend validation is implemented.
* Django authentication is used for login.
* Database operations are handled through Django ORM.

---

# 🚧 Challenges & Solutions

### Challenge 1: Connecting Frontend and Backend

**Solution:**
REST API endpoints were created using Django REST Framework and connected to the JavaScript frontend using HTTP requests.

### Challenge 2: Invalid User Input

**Solution:**
Both frontend and backend validation were implemented.

### Challenge 3: Managing Issue Status

**Solution:**
A status workflow was implemented:

```text
Reported → In Progress → Resolved
```

### Challenge 4: Different User Roles

**Solution:**
The login system identifies users as Student, Staff, or Admin and redirects them to the appropriate dashboard.

---

# 🚀 Future Enhancements

Future versions can include:

* Email notifications
* Push notifications
* QR-based bus identification
* GPS-based bus tracking
* Student authentication using college accounts
* Image upload for reporting damaged bus facilities
* Analytics dashboard
* Mobile application
* Automatic issue prioritization

---

# 📌 Project Information

**Project Name:** BusBuddy

**Project Type:** Mini Web Application

**Domain:** College Transportation

**Department:** Information Technology

**Institution:** V.S.B. Engineering College

**Academic Year:** 2026

---

# 👩‍💻 Repository

GitHub Repository:

[https://github.com/FAMITHABUNAN/BusBuddy](https://github.com/FAMITHABUNAN/BusBuddy)

---

# 📜 License

This project was developed as an academic mini web application project.

```

