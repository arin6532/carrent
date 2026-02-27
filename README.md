# Car Rental Management System (Full Stack - React + Node + PostgreSQL)

A full-stack car rental web application built using React (SPA) for the frontend and Node.js + Express for the backend, connected to a PostgreSQL database.

This project demonstrates REST API development, relational database design, authentication logic, and modern UI development using Vite and Tailwind CSS.

---

# Project Architecture

This project uses a **single-repository structure (monorepo-style)** where both frontend and backend logic are maintained in the same project directory for simplified development.

Although frontend and backend are not separated into different folders, they are logically divided:

##  Frontend (React - Single Page Application)

- JSX components (Home.jsx, Booking.jsx, profile.jsx, history.jsx, etc.)
- Routing and protected routes (RequireAuth.jsx)
- Navigation components (login_nav.jsx, user_nav.jsx)
- Built using React + Vite
- Styled with Tailwind CSS

##  Backend (Node.js + Express)

- `all_server.js` → Main Express server entry
- `db_connect.js` → PostgreSQL connection configuration
- `*_back.js` files → Backend route handlers
  - login_back.js
  - profile_back.js
  - regis_back.js
  - rentcar_detail.js
  - etc.

The backend provides RESTful APIs consumed by the React frontend.

Future improvement:
- Separate frontend and backend into `/client` and `/server` directories for scalable deployment.

---

#  Tech Stack

## Frontend
- React.js (SPA)
- Vite
- Tailwind CSS

## Backend
- Node.js
- Express.js
- pg (PostgreSQL client)
- dotenv
- cors
- nodemon (development)

## Database
- PostgreSQL
- Custom schema: `carrent`

## Tools
- VS Code
- Git & GitHub
- pgAdmin4
- npm

---

#  Core Features

- User Registration & Login
- Role-based system (Customer)
- Car listing with availability status
- Car rental booking system
- Daily & weekly pricing calculation
- Rental history tracking
- Protected routes (authentication required pages)
- Profile management
- Maintenance tracking
- RESTful API communication

---
## Database Configuration

Before running the project, open `db_connect.js` 
and update the PostgreSQL password:

password: 'your_password'

Replace `your_password` with your actual PostgreSQL password.

# Database Design
1. users (System user)
CREATE TABLE carrent.carrent_users (
  user_id INT GENERATED ALWAYS AS IDENTITY (START WITH 10000) PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(10) NOT NULL,
  users_role VARCHAR(20) DEFAULT 'customer',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

2. cars — (List of rental cars)
CREATE TABLE carrent.cars (
  cars_id SERIAL PRIMARY KEY,
  brand VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  license_plate VARCHAR(20) UNIQUE NOT NULL,
  year INT,
  price_per_day DECIMAL(10, 2),
  price_per_week DECIMAL(10, 2),
  status VARCHAR(20) DEFAULT 'available', -- 'available', 'rented', 'maintenance'
  image_url TEXT
);

3. rentals — (Car reservation)
CREATE TABLE carrent.rentals (
  rentals_id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES carrent.carrent_users(user_id),
  cars_id INT NOT NULL REFERENCES carrent.cars(cars_id),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'completed' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMP DEFAULT NOW(),
  rental_type VARCHAR(20),
  CHECK (end_date > start_date),
  UNIQUE (user_id, cars_id, start_date, end_date)
);

4. payments — (For payment)
CREATE TABLE carrent.payments (
  payment_id SERIAL PRIMARY KEY,
  rental_id INT REFERENCES carrent.rentals(rentals_id),
  amount DECIMAL(10, 2),
  method VARCHAR(50), -- เช่น 'credit_card', 'cash'
  paid_at TIMESTAMP DEFAULT NOW()
);

5. maintenance — (Vehicle maintenance information.)
CREATE TABLE carrent.maintenance (
  mainten_id SERIAL PRIMARY KEY,
  cars_id INT REFERENCES carrent.cars(cars_id),
  description TEXT,
  maintenance_date DATE,
  cost DECIMAL(10, 2)
);

# Installation & Setup

Follow the steps below to run this project locally.

---

## 1 Prerequisites

Make sure you have the following installed:

- Node.js
- PostgreSQL
- Git (optional)
- VS Code (recommended)

Verify installation:

```bash
node -v
npm -v
psql --version
git --version
```
---

## 2 Install Dependencies
npm install

---

## 3 Run Project
npm run dev:all (run project)