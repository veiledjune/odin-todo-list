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

export const App = (() => {
  const defaultProject = new Project('My Day', 'default-project')
  const projectsArr = [defaultProject];
  const getProjects = () => projectsArr
  const addProject = (title) => projectsArr.push(new Project(title))
  
  return { getProjects, addProject }
})()