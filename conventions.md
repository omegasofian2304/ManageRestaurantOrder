# Repository Conventions -- RestaurantManageOrder (Backend Node.js)

This document defines the technical and organizational conventions of
the project to ensure clean, consistent, readable, and maintainable
code.

------------------------------------------------------------------------

## 1. Branching Strategy

### Branches

-   `main` → stable production branch\
-   `develop` → integration branch\
-   `feature/<feature-name>` → new feature\
-   `fix/<bug-name>` → bug fix\
-   `refactor/<module-name>` → refactoring

### Examples

-   `feature/order-management`
-   `feature/auth-middleware`
-   `fix/order-validation`
-   `refactor/database-layer`

------------------------------------------------------------------------

## 2. Conventional Commits

This project follows the Conventional Commits specification.

### Format

`<type>`{=html}(scope): `<description>`{=html}

### Allowed types

-   `feat` → new feature\
-   `fix` → bug fix\
-   `refactor` → code refactoring\
-   `perf` → performance improvement\
-   `docs` → documentation\
-   `style` → formatting only (no logic changes)\
-   `test` → tests\
-   `chore` → configuration or tooling

### Examples

-   `feat(order): add create order endpoint`
-   `fix(auth): fix token validation`
-   `refactor(database): separate query logic`
-   `docs(readme): update installation guide`

------------------------------------------------------------------------

## 3. Project Structure

The project follows a layered architecture to ensure modularity and
scalability.

src/ │ ├── config/ \# Database & environment configuration ├──
controllers/ \# Request handling logic ├── services/ \# Business logic
├── repositories/ \# Database queries (mysql2) ├── routes/ \# API routes
definitions ├── middlewares/ \# Custom middleware (auth, validation,
error) ├── utils/ \# Utility functions └── app.js \# Express app
configuration

server.js \# Application entry point

### Architecture Rules

-   Controllers must not contain SQL queries.
-   Business logic must remain inside services.
-   Database logic must remain inside repositories.
-   Routes must only define endpoints and attach controllers.
-   The project follows a functional approach (no object-oriented
    programming).

------------------------------------------------------------------------

## 4. Naming Conventions

### Global Rules

-   English only\
-   Explicit and descriptive names\
-   No unclear abbreviations\
-   No generic names such as `temp`, `test`, `dataStuff`

### Files

-   JavaScript files → `camelCase.js`
-   Folders → `lowercase`
-   Route files → `<resource>Routes.js`
-   Controller files → `<resource>Controller.js`
-   Service files → `<resource>Service.js`
-   Repository files → `<resource>Repository.js`
-   Middleware files → `<name>Middleware.js`

### Variables

-   `camelCase`
-   Constants → `UPPER_SNAKE_CASE`

Example:

const MAX_ORDER_ITEMS = 20; let orderTotalPrice;

### Functions

-   `camelCase()`
-   Use verbs for actions

Examples:

createOrder() getOrderById() validateUser() calculateTotalPrice()

------------------------------------------------------------------------

## 5. Express Conventions

### REST Principles

-   Use plural resource names.
-   Do not include verbs in routes.
-   Respect HTTP methods semantics.

### Correct Examples

-   `GET /orders`
-   `GET /orders/:id`
-   `POST /orders`
-   `PUT /orders/:id`
-   `DELETE /orders/:id`

### Incorrect Examples

-   `GET /getOrders`
-   `POST /createOrder`

### Controller Rules

Controllers must:

-   Extract request data
-   Call services
-   Format responses
-   Handle HTTP status codes

Controllers must not:

-   Contain business logic
-   Execute SQL queries directly

------------------------------------------------------------------------

## 6. MySQL and mysql2 Conventions

### Database Naming

-   Table names → `snake_case`
-   Column names → `snake_case`
-   Primary key → `id`
-   Foreign keys → `<entity>_id`

Example:

users orders order_items

### Queries

-   Use prepared statements.
-   Never concatenate SQL strings manually.
-   Always use `async/await`.

Example:

const \[rows\] = await db.execute( "SELECT \* FROM orders WHERE id = ?",
\[orderId\] );

------------------------------------------------------------------------

## 7. Environment and Configuration

-   Use `.env` for:
    -   Database credentials
    -   Port
    -   Secrets
-   Never commit the `.env` file.
-   Access environment variables via `process.env`.

------------------------------------------------------------------------

## 8. Development Tools

### Nodemon

-   Used only in development.
-   Never used in production.

Example:

"scripts": { "dev": "nodemon server.js", "start": "node server.js" }

------------------------------------------------------------------------

## 9. Documentation and Source Usage

### AI Assistance

When AI is used to generate code or text, indicate it in the following
format:

Source AI: ChatGPT

Prompt: Generate a Node.js repository pattern example

### External Sources

When referencing official documentation or external websites:

Source: https://expressjs.com/

Sources must be indicated directly above the code that uses them.

------------------------------------------------------------------------

## 10. Code Quality Rules

-   No duplicated logic\
-   Small and focused functions\
-   Single responsibility per file\
-   Consistent formatting (Prettier recommended)\
-   ESLint recommended

------------------------------------------------------------------------

## Living Document

This document is subject to change.\
Any modification must be validated by the team before adoption.
