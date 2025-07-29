# 👥 Real-Time User Management App (MERN + Socket.IO)

This is a full-stack MERN application with real-time updates built as part of a technical assignment for a MERN Stack Developer position.

## 📌 Assignment Brief

**Objective**: Build a user management system with real-time notifications using the MERN stack and Socket.IO.

### 🛠 Tech Stack
- **Frontend**: React.js (with Materialize CSS)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Real-time**: Socket.IO
- **Dev Tools**: Docker (optional), concurrently, dotenv

---

## 📦 Features

### ✅ Core Requirements
- **Add New User** via a form (name, email, role)
- **Admin Dashboard** displays user list
- **Real-Time Notification**: When a user is added, all connected admin dashboards receive a toast alert
- **Live Search Filter**: Search through users by name or email
- **Materialize Styling**: Clean UI with badges, icons, and responsive table
- **Toast Notifications**: Socket-based updates when new users are added

## 🚀 Getting Started

### 📁 Folder Structure
```
user-management-app/
├── backend/
│ ├── .env
│ ├── server.ts
│ └── ... (routes, models, sockets)
├── frontend/
│ ├── src/
│ └── ... (components, App.tsx)
├── docker-compose.yml (optional)
└── README.md
```


---

## ⚙️ Setup Instructions

### Prerequisites
- Node.js
- MongoDB Atlas URI
- Docker (optional)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/user-management-app.git
cd user-management-app
```

### Configure Environment Variables
```
Create a .env file inside the /backend folder with:
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```
### Start Backend and Frontend
With NPM Scripts (recommended):

### From project root
docker-compose up --build


