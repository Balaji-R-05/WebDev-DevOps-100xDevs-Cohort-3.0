import express from "express";
import fs from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(express.json());

// ESM-safe __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to todos file
const filePath = path.join(__dirname, "todos.json");

async function readTodos() {
  const data = await fs.readFile(filePath, "utf8");
  return JSON.parse(data);
}

async function writeTodos(todos) {
  await fs.writeFile(filePath, JSON.stringify(todos, null, 2), "utf8");
}


app.get("/todos", async (req, res) => {
  try {
    const todos = await readTodos();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to read todos" });
  }
});


app.post("/todos", async (req, res) => {
  try {
    const todos = await readTodos();
    const newTodo = {
      id: Date.now(),
      text: req.body.text,
      completed: false
    };
    todos.push(newTodo);
    await writeTodos(todos);
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to add todo" });
  }
});


app.put("/todos/:id", async (req, res) => {
  try {
    const todos = await readTodos();
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) return res.status(404).json({ error: "Todo not found" });

    todos[todoIndex].completed = req.body.completed;
    await writeTodos(todos);
    res.json(todos[todoIndex]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update todo" });
  }
});


app.delete("/todos/:id", async (req, res) => {
  try {
    const todos = await readTodos();
    const filteredTodos = todos.filter(t => t.id !== parseInt(req.params.id));
    if (filteredTodos.length === todos.length) {
      return res.status(404).json({ error: "Todo not found" });
    }
    await writeTodos(filteredTodos);
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

// Start server
app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
