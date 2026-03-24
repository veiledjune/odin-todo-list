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

export const app = (() => {
  const defaultProject = new Project('My Day', 'default-project');
  const projectsArr = [defaultProject];

  let selectedProject = projectsArr[0];

  let todoToEdit = null;

  const getProjects = () => projectsArr;

  const addProject = (title) => projectsArr.push(new Project(title));

  const deleteProject = (projectIndex) => projectsArr.splice(projectIndex, 1);

  const getProjectIndex = (projectId) =>
    projectsArr.findIndex((project) => project.id === projectId);

  const getSelectedProject = () => selectedProject;

  const setSelectedProject = (project) => (selectedProject = project);

  const setTodoToEdit = (todo) => (todoToEdit = todo);

  const getTodoToEdit = () => todoToEdit;

  return {
    getProjects,
    addProject,
    deleteProject,
    getProjectIndex,
    getSelectedProject,
    setSelectedProject,
    setTodoToEdit,
    getTodoToEdit,
  };
})();
