import { format } from 'date-fns';
class Project {
  constructor(title, id = crypto.randomUUID()) {
    this.title = title;
    this.id = id;
    this.todos = [];
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
    this.check = !this.check;
  }
}

export const App = (() => {
  const defaultProject = new Project('My Day', 'default-project');
  const projectsArr = [defaultProject];
  let currentProject = projectsArr[0];
  let currentTodo;
  const getProjects = () => projectsArr;
  const addProject = (title) => projectsArr.push(new Project(title));
  const deleteProject = (projectIndex) => projectsArr.splice(projectIndex, 1);
  const addTodo = (projectIndex, title, description, dueDate, priority) => {
    projectsArr[projectIndex].todos.push(
      new Todo(title, description, dueDate, priority)
    );
  };
  const editTodo = (todo, title, description, dueDate, priority) => {
    todo.title = title;
    todo.description = description;
    todo.dueDate = dueDate;
    todo.priority = priority;
  };
  const deleteTodo = (project, todoIndex) => project.todos.splice(todoIndex, 1);
  const getCurrentProject = () => currentProject;
  const updateCurrentProject = (newProject) => (currentProject = newProject);
  const getProjectIndex = (id) => {
    const projectIndex = projectsArr.findIndex((project) => project.id === id);
    return projectIndex;
  };
  const getCurrentProjectIndex = () => {
    const projectIndex = projectsArr.findIndex(
      (project) => project === currentProject
    );
    return projectIndex;
  };
  const getTodoIndex = (currentProject, todoObject) => {
    const todoIndex = currentProject.todos.findIndex(
      (todo) => todo.id === todoObject.id
    );
    return todoIndex;
  };
  const updateActiveTodo = (todo) => (currentTodo = todo);
  const getActiveTodo = () => currentTodo;
  return {
    getProjects,
    addProject,
    deleteProject,
    addTodo,
    deleteTodo,
    editTodo,
    getCurrentProject,
    updateCurrentProject,
    getProjectIndex,
    getCurrentProjectIndex,
    getTodoIndex,
    updateActiveTodo,
    getActiveTodo,
  };
})();
