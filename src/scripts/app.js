class Project {
  constructor(title, id = crypto.randomUUID()) {
    this.title = title;
    this.id = id;
    this.todos = [];
  }

  addTodo = (title, description, dueDate, priority) =>
    this.todos.push(new Todo(title, description, dueDate, priority));

  deleteTodo = (todoIndex) => this.todos.splice(todoIndex, 1);

  getTodoIndex = (todoId) => this.todos.findIndex((todo) => todo.id === todoId);

  editTodo = (todo, title, description, dueDate, priority) => {
    todo.title = title;
    todo.description = description;
    todo.dueDate = dueDate;
    todo.priority = priority;
  };
}

class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.id = crypto.randomUUID();
    this.check = false;
  }
}
