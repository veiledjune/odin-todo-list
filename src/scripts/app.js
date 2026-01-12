class Project{
  constructor(title, id = crypto.randomUUID()) {
    this.title = title;
    this.id = id;
    this.todos = []
  }
}