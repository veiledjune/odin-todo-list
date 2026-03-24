import { render } from './render';
import { app } from './app';

export const events = (() => {
  const form = document.querySelector('.form');
  const formDialog = document.querySelector('.form-dialog');
  let formType;
  const formEvents = () => {
    const closeButton = document.querySelector('.form-close-button');
    closeButton.addEventListener('click', () => resetForm());

    const addProjectButton = document.querySelectorAll('.add-button.project');
    addProjectButton.forEach((button) => {
      button.addEventListener('click', () => {
        formType = 'project';
        render.renderForm(formType);
        formDialog.showModal();
      });
    });

    const addTodoButton = document.querySelector('.add-button.todo');
    addTodoButton.addEventListener('click', () => {
      formType = 'todo';
      render.renderForm(formType);
      formDialog.showModal();
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const selectedProject = app.getSelectedProject();
      if (formType === 'project') {
        const titleInput = document.getElementById('project-title');
        app.addProject(titleInput.value);
        render.renderNav();
        resetForm();
      } else {
        const titleInput = document.getElementById('todo-title');
        const descriptionInput = document.getElementById('todo-description');
        const dueDateInput = document.getElementById('todo-due-date');
        const priorityInput = document.getElementById('todo-priority');
        if (formType === 'todo') {
          selectedProject.addTodo(
            titleInput.value,
            descriptionInput.value,
            dueDateInput.value,
            priorityInput.value,
          );
          render.renderProject();
          resetForm();
        } else {
          const todoToEdit = app.getTodoToEdit();
          selectedProject.editTodo(
            todoToEdit,
            titleInput.value,
            descriptionInput.value,
            dueDateInput.value,
            priorityInput.value,
          );
          render.renderProject();
          resetForm();
        }
      }
    });
  };

  const resetForm = () => {
    form.reset();
    formDialog.close();
  };

  const editButtonEvent = (todo) => {
    formType = 'edit';
    render.renderForm(formType);
    const titleInput = document.getElementById('todo-title');
    const descriptionInput = document.getElementById('todo-description');
    const dueDateInput = document.getElementById('todo-due-date');
    const priorityInput = document.getElementById('todo-priority');
    titleInput.value = todo.title;
    descriptionInput.value = todo.description;
    dueDateInput.value = todo.dueDate;
    priorityInput.value = todo.priority;
    formDialog.showModal();
    app.setTodoToEdit(todo);
  };

  const projectDeleteButtonEvent = (projectId) => {
    const projectsArr = app.getProjects();
    const projectIndex = app.getProjectIndex(projectId);
    const selectedProject = app.getSelectedProject();
    if (projectsArr[projectIndex].id === selectedProject.id) {
      app.setSelectedProject(projectsArr[0]);
      render.renderProject();
    }
    app.deleteProject(projectIndex);
    render.renderNav();
  };

  const todoDeleteButtonEvent = (project, todoId) => {
    project.deleteTodo(project.getTodoIndex(todoId));
    render.renderProject();
  };

  const checkButtonEvent = (todo) => {
    todo.check = !todo.check;
    render.renderProject();
  };

  let navExpanded = false;
  const menuButtonEvent = () => {
    const headerNavButton = document.querySelector('.nav-menu-button');
    const headerNav = document.querySelector('.header-nav');
    headerNavButton.addEventListener('click', () => {
      if (!navExpanded) {
        headerNav.classList.add('--nav-expanded');
        headerNavButton.classList.add('--expand-nav');
      } else {
        headerNav.classList.remove('--nav-expanded');
        headerNavButton.classList.remove('--expand-nav');
      }
      navExpanded = !navExpanded;
    });
  };

  return {
    formEvents,
    editButtonEvent,
    projectDeleteButtonEvent,
    todoDeleteButtonEvent,
    checkButtonEvent,
    menuButtonEvent,
  };
})();
