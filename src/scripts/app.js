class Project {
  constructor(title, id = crypto.randomUUID()) {
    this.title = title;
    this.id = id;
    this.todos = []
  }
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
  toggleCheck() {
    this.check = !this.check
  }
}