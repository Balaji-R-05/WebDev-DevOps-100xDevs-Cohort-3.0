# Week 05: Headers, Express, Middleware

## 1. Express.js Basics
Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

### Setting up a Server
To set up a basic Express server:
```javascript
import express from "express";

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

---

## 2. Middleware
Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the next middleware function in the application’s request-response cycle (`next`).

### Key Concepts
*   **`req`**: The request object.
*   **`res`**: The response object.
*   **`next`**: A function that, when invoked, executes the middleware succeeding the current middleware.

### Types of Middleware

#### A. Global Middleware
Applied to all routes.
```javascript
const requestLogger = (req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next(); // Pass control to the next handler
};

app.use(requestLogger);
```

#### B. Route-Specific Middleware
Applied to specific routes only.
```javascript
const verifyAdmin = (req, res, next) => {
    if (req.headers.role === "admin") {
        next();
    } else {
        res.status(403).json({ msg: "Not Authorized" });
    }
};

app.get("/admin", verifyAdmin, (req, res) => {
    res.json({ msg: "Welcome Admin" });
});
```

### Useful Middleware Libraries
*   **`helmet`**: Helps secure your apps by setting various HTTP headers.
    ```javascript
    import helmet from "helmet";
    app.use(helmet());
    ```
*   **`morgan`**: HTTP request logger middleware for node.js.
    ```javascript
    import morgan from "morgan";
    app.use(morgan("tiny"));
    ```
*   **`cors`**: Enable Cross-Origin Resource Sharing.
    ```javascript
    import cors from "cors";
    app.use(cors());
    ```
*   **`compression`**: Node.js compression middleware.
    ```javascript
    import compression from "compression";
    app.use(compression());
    ```
*   **`cookie-parser`**: Parse Cookie header and populate `req.cookies`.
    ```javascript
    import cookieParser from "cookie-parser";
    app.use(cookieParser());
    ```
*   **`express-rate-limit`**: Basic rate-limiting middleware.

---

## 3. Routing & Request Data
Express provides different ways to extract data from requests.

### A. Query Parameters (`req.query`)
Used for filtering or sorting (e.g., `?a=10&b=20`).
```javascript
// GET /sum?a=10&b=20
app.get("/sum", (req, res) => {
    const { a, b } = req.query;
    res.json({ ans: parseInt(a) + parseInt(b) });
});
```

### B. Route Parameters (`req.params`)
Used for identifying specific resources (e.g., `/user/:id`).
```javascript
// GET /mul/5/10
app.get("/mul/:a/:b", (req, res) => {
    const { a, b } = req.params;
    res.json({ ans: parseInt(a) * parseInt(b) });
});
```

### C. Request Body (`req.body`)
Used for sending data in POST/PUT requests. **Requires `app.use(express.json())`**.
```javascript
// POST /sum
// Body: { "a": 10, "b": 20 }
app.post("/sum", (req, res) => {
    const { a, b } = req.body;
    res.json({ ans: a + b });
});
```

---

## 4. Frontend Integration

### Axios vs Fetch
| Feature | Axios | Fetch API |
| :--- | :--- | :--- |
| **Environment** | Node.js & Browser | Browser Native (Node 18+) |
| **JSON Parsing** | Automatic | Manual (`.json()`) |
| **Error Handling** | Rejects on HTTP errors (4xx, 5xx) | Only rejects on network failure |
| **Syntax** | `axios.get(url)` | `fetch(url)` |
| **Interceptors** | Built-in support | No built-in support |

### Example: Using Fetch
```javascript
async function getData() {
    try {
        const response = await fetch("http://localhost:3000/sum?a=5&b=10");
        const data = await response.json(); // Manual JSON parsing
        console.log(data);
    } catch (error) {
        console.error("Error:", error);
    }
}
```

### Example: Using Axios
```javascript
async function getData() {
    try {
        const response = await axios.get("http://localhost:3000/sum?a=5&b=10");
        console.log(response.data); // Automatic JSON parsing
    } catch (error) {
        console.error("Error:", error);
    }
}
```

---

## 5. Git & Collaboration Basics

### Basic Commands
*   **`git remote -v`**: Check configured remote repositories.
*   **`git branch`**: List local branches.
*   **`git checkout -b <branch-name>`**: Create and switch to a new branch.
*   **`git status`**: Check the status of your files.
*   **`git add .`**: Stage all changes.
*   **`git commit -m "message"`**: Commit staged changes.

### Collaboration & Merging
*   **`git fetch`**: Download objects and refs from another repository.
*   **`git pull origin main`**: Fetch and merge changes from the remote `main` branch.
*   **`git merge <branch-name>`**: Merge the specified branch into the current branch.
    *   *Usage*: Switch to `main`, then `git merge feature-branch`.
*   **`git rebase <base-branch>`**: Re-apply commits on top of another base tip.
    *   *Usage*: Keeps history linear. `git checkout feature`, `git rebase main`.

### Working with Remotes
*   **`git clone <url>`**: Clone a repository.
*   **`git push origin <branch-name>`**: Push your branch to the remote server.