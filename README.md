# ManageRestaurantOrder

## Project Description

ManageRestaurantOrder is a backend-only REST API designed to manage orders in a fast food restaurant system.

The project follows a layered architecture to ensure separation of concerns, maintainability, and scalability. It provides a structured backend capable of handling order processing, business logic, and persistent data storage.

The objective is to deliver a clean and extensible backend system suitable for real-world food service management scenarios.

---

## Architecture

The application follows a layered architecture:

Client
   |
   v
Routes
   |
   v
Controllers
   |
   v
Services
   |
   v
Repositories
   |
   v
MySQL Database

---

### Project Structure

ManageRestaurantOrder/
│
├── src/
│   │
│   ├── config/         # Database and environment configuration
│   ├── routes/         # API route definitions
│   ├── controllers/    # HTTP request handling
│   ├── services/       # Business logic layer
│   ├── repositories/   # Database queries (mysql2)
│   ├── middlewares/    # Custom middlewares (auth, error handling)
│   ├── utils/          # Utility functions
│   └── app.js          # Express configuration
│
├── server.js           # Application entry point
├── .env                # Environment variables (not committed)
├── package.json
└── README.md

---

### Architectural Principles

- Functional approach (no object-oriented programming)
- Strict separation of concerns
- No SQL queries outside repositories
- No business logic inside controllers
- Centralized error handling
- RESTful API design

---

## Tech Stack

- Node.js – JavaScript runtime for server-side execution
- Express.js – Web framework for REST API development
- MySQL – Relational database management system
- mysql2 – MySQL client with Promise support
- Nodemon – Development server auto-reload tool
- OpenAPI / Swagger – API documentation interface

---


## Requirements
- Node.js (v18+ recommended)
- npm
- MySQL server

### Node.js Version
---
It is recommended to use a stable LTS version:

`node -v`

Minimum: Node.js 16+
Recommended: Node.js 18+

### Database
---
- MySQL 8+ recommended

- A database matching the configuration in .env

- Required tables created before starting the API

## Installation

### 1. Install dependencies

npm install

### 2. Configure environment variables

Create a .env file in the root directory (copy the .env.example):

---

## Available Scripts

### Start development server (with Nodemon)

npm run dev

### Start production server

npm start

---

## API Documentation

If Swagger is enabled, access the API documentation at:

http://localhost:3000/api-docs

---

## Database

The project uses MySQL as the relational database system.

Ensure:

- MySQL is installed and running
- The database defined in .env exists
- Required tables are created before starting the server

---

## Development Guidelines

- Follow RESTful naming conventions
- Use prepared statements for all SQL queries
- Do not commit .env
- Follow Conventional Commits
- Maintain separation between controllers, services, and repositories

---

## License

This project is intended for educational and academic purposes.
