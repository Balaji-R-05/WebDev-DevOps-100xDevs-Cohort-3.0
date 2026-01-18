# Todo App Backend (Week 7 - MongoDB)

This is a backend application for a Todo List, built as part of the 100xDevs Cohort 3.0 (Week 7). It provides a RESTful API for user authentication and todo management, backed by MongoDB.

## Features

- **User Authentication**: Sign up and sign in functionality using JWT (JSON Web Tokens).
- **Secure Failures**: Password hashing using `bcrypt`.
- **Validation**: Input validation using `zod`.
- **Todo Management**: Create and retrieve todos protected by authentication middleware.
- **Database**: Data persistence with MongoDB and Mongoose.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: `jsonwebtoken` (JWT), `bcrypt`
- **Validation**: `zod`
- **Environment**: `dotenv`

## Prerequisites

- Node.js installed
- MongoDB instance (local or Atlas)

## Installation & Setup

1. **Clone the repository** (or navigate to the project directory):
   ```bash
   cd "Week-07 MongoDb"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/todo-app
   PORT=5000
   JWT_SECRET=your_super_secret_key
   ```

4. **Start the Server**:
   ```bash
   node index.js
   ```
   The server will start on port 5000 (or the port specified in `.env`).

## API Endpoints

### Auth

#### Sign Up
- **URL**: `/sign-up`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Validation**:
  - `name`: Min 3 chars
  - `email`: Valid email
  - `password`: Min 6 chars

#### Sign In
- **URL**: `/sign-in`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**: Returns a JWT `token`.

### Todos (Protected)
*Headers required: `Authorization: <token>`*

#### Create Todo
- **URL**: `/todos`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "title": "Learn MongoDB",
    "description": " Understand schemas and models"
  }
  ```
- **Validation**:
  - `title`: Required, min 1 char
  - `description`: Optional

#### Get Todos
- **URL**: `/todos`
- **Method**: `GET`
- **Response**: Array of todo objects created by the authenticated user.
