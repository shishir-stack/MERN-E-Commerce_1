# 🛒 MERN E-Commerce Application

A full-stack **E-Commerce web application** built with the **MERN Stack** — MongoDB, Express.js, React.js, and Node.js.

This project provides a complete online shopping experience where users can browse products, manage their shopping cart, authenticate securely, and place orders. The application follows a modern full-stack architecture with a React frontend, RESTful API backend, and MongoDB database.

---

## 📌 Project Overview

The **MERN E-Commerce Application** is designed to demonstrate a complete online store workflow.

Users can:

- Create an account
- Login securely
- Browse products
- View product details
- Add products to cart
- Manage cart items
- Place orders
- Track order information

Administrators can manage products, users, and orders through backend controls.

---

# ✨ Features

## 👥 User Features

✅ User registration  
✅ User login/logout  
✅ JWT-based authentication  
✅ Protected routes  
✅ Browse products  
✅ View product details  
✅ Add products to shopping cart  
✅ Update cart quantity  
✅ Remove products from cart  
✅ Place orders  
✅ View order history  
✅ Manage profile information  

---

## 🛍️ Product Features

✅ Product listing  
✅ Product details page  
✅ Product images  
✅ Product categories  
✅ Price management  
✅ Product availability tracking  

---

## 🔐 Authentication & Authorization

- JSON Web Token (JWT) authentication
- Secure password encryption
- User role management
- Protected API routes
- Authorization middleware

---

## 📦 Order System

- Add products to order
- Checkout workflow
- Store customer information
- Track order status
- Manage customer orders

---

## 🧑‍💼 Admin Features

- Manage products
- Add new products
- Update product information
- Delete products
- Manage users
- Manage orders
- Update order status

---

# 🏗️ Application Architecture

```
                 User
                  |
                  |
            React Frontend
                  |
                  |
             REST API
                  |
                  |
        Node.js + Express Server
                  |
                  |
              MongoDB
```

---

# 🛠️ Technology Stack

## Frontend

| Technology | Purpose |
|------------|---------|
| React.js | User interface |
| React Router | Navigation |
| Axios | API communication |
| JavaScript | Frontend logic |
| HTML5 | Structure |
| CSS3 | Styling |

---

## Backend

| Technology | Purpose |
|------------|---------|
| Node.js | Runtime environment |
| Express.js | Backend framework |
| MongoDB | Database |
| Mongoose | Database modeling |
| JWT | Authentication |
| REST API | Communication |

---

# 📂 Project Structure

```
MERN-E-Commerce_1

│
├── frontend
│   │
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── assets
│   │   └── App.js
│   │
│   └── package.json
│
│
├── backend
│   │
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   ├── config
│   ├── server.js
│   └── package.json
│
└── README.md
```

---


# 📸 Screenshots

## Home Page

<img width="1920" height="6268" alt="image" src="https://github.com/user-attachments/assets/86e958d3-4845-4ef0-a371-e8c931a2c9f5" />


---

## Product Details

<img width="1920" height="2329" alt="image" src="https://github.com/user-attachments/assets/fa21b50b-896a-4746-be27-14ec7844d969" />


---

## Shopping Cart

<img width="1920" height="982" alt="image" src="https://github.com/user-attachments/assets/6fa61968-ac6d-4a63-98e9-34b35b02f8d2" />


---

## Login Page

<img width="1920" height="957" alt="image" src="https://github.com/user-attachments/assets/147f18b0-2b27-42ec-ae71-dc79a508117f" />


---


# ⚙️ Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/shishir-stack/MERN-E-Commerce_1.git
```

---

## 2. Enter Project Directory

```bash
cd MERN-E-Commerce_1
```

---

# Backend Setup

Go to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Run backend server:

```bash
npm start
```

Backend will start on:

```
http://localhost:5000
```

---

# Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start React application:

```bash
npm start
```

Frontend will run on:

```
http://localhost:3000
```

---

# 🔑 Environment Variables

Backend requires the following environment variables:

| Variable | Description |
|----------|-------------|
| PORT | Backend server port |
| MONGO_URI | MongoDB database connection |
| JWT_SECRET | Authentication secret key |

Example:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce
JWT_SECRET=mysecretkey
```

---

# 🔌 API Endpoints

## User Authentication

| Method | Endpoint | Description |
|-|-|-|
| POST | `/api/users/register` | Create new account |
| POST | `/api/users/login` | Login user |
| GET | `/api/users/profile` | Get user profile |

---

## Products

| Method | Endpoint | Description |
|-|-|-|
| GET | `/api/products` | Get all products |
| GET | `/api/products/:id` | Get single product |
| POST | `/api/products` | Create product |
| PUT | `/api/products/:id` | Update product |
| DELETE | `/api/products/:id` | Delete product |

---

## Orders

| Method | Endpoint | Description |
|-|-|-|
| POST | `/api/orders` | Create order |
| GET | `/api/orders` | Get orders |
| GET | `/api/orders/:id` | Get order details |
| PUT | `/api/orders/:id` | Update order |




---

# 🚀 Deployment

The application can be deployed using:

### Frontend

- Vercel
- Netlify

### Backend

- Render
- Railway
- AWS

### Database

- MongoDB Atlas



---


# 👨‍💻 Author

**Shishir Stack**

GitHub:

https://github.com/shishir-stack

---



Thank you for visiting this project! 🚀
