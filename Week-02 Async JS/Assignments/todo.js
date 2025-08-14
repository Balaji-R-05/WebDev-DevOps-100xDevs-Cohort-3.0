class Todo {
    constructor() {
        this.todos = [];
    }

    add(todo) {
        if (typeof todo !== "string" || todo.trim() === "") {
            throw new Error("Todo must be a non-empty string");
        }
        this.todos.push(todo);
    }

    remove(index) {
        if (index < 0 || index >= this.todos.length) {
            throw new Error("Invalid index");
        }
        this.todos.splice(index, 1);
    }

    update(index, updatedTodo) {
        if (index < 0 || index >= this.todos.length) {
            throw new Error("Invalid index");
        }
        if (typeof updatedTodo !== "string" || updatedTodo.trim() === "") {
            throw new Error("Updated todo must be a non-empty string");
        }
        this.todos[index] = updatedTodo;
    }

    getAll() {
        return [...this.todos];
    }

    get(index) {
        if (index < 0 || index >= this.todos.length) {
            throw new Error("Invalid index");
        }
        return this.todos[index];
    }

    clear() {
        this.todos = [];
    }
}

const myTodos = new Todo();
myTodos.add("Learn JavaScript");
myTodos.add("Build a project");
console.log(myTodos.getAll());           
myTodos.update(0, "Master JavaScript");
console.log(myTodos.get(0));             
myTodos.remove(1);
console.log(myTodos.getAll());           
myTodos.clear();
console.log(myTodos.getAll());          
