# 📘 Companies Directory

A modern, responsive full-stack web application for browsing and managing a directory of companies. It includes powerful filtering, searching, sorting, and pagination features to easily find companies by name, location, or industry.

Built with React on the frontend and Node.js, Express, and MongoDB Atlas on the backend.

---

## 🚀 Live Demo

- Frontend: [View Live Demo](https://companies-directory-ochre.vercel.app)
- Backend API: `https://companies-directory-39z3.onrender.com`

---

## ✨ Features

### Frontend
- Search companies by name or description
- Filter companies by location and industry
- Sort companies alphabetically (A-Z, Z-A)
- Pagination for easy browsing
- Fast loading with skeleton screens
- Fully responsive design

### Backend
- REST API built with Express
- MongoDB Atlas database for storage
- CRUD operations for companies
- CORS protection configured
- Deployed on Render

---

## 🛠️ Tech Stack

### Frontend
- JavaScript (ES6+)
- React 18
- Tailwind CSS
- Vite
- Vercel

### Backend
- JavaScript (Node.js)
- Express.js
- MongoDB Atlas
- Mongoose
- Render

---

## 📦 Installation

1. Clone the repository
2. Install dependencies for frontend and backend
3. Configure environment variables
4. Run backend server and frontend development server

---

## 🔧 Usage

- Use the search bar and filters to find companies
- Click on company cards for more details
- Admin routes available for adding, updating, and deleting companies (authentication not implemented yet)

---

## 📄 API Endpoints

- `GET /api/companies` - List all companies with optional search and filter query parameters
- `GET /api/companies/:id` - Get details of a single company
- `POST /api/companies` - Create a new company
- `PUT /api/companies/:id` - Update a company
- `DELETE /api/companies/:id` - Delete a company
- `GET /api/companies/industries` - Get list of industries

---

## 📞 Contact

For questions or support, please contact the project maintainer.
