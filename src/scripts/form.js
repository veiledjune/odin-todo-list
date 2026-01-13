import { App } from './app';
import { Render } from './render';

export const FormEvents = (() => {
  const openForm = (dialog) => {
    const dialogElement = document.querySelector(dialog);
    dialogElement.showModal();
  };

  const closeForm = (dialog) => {
    const dialogElement = document.querySelector(dialog);
    dialogElement.close();
  };

  const resetForm = (form) => {
    const formElement = document.querySelector(form);
    formElement.reset();
  };

  const handleValidity = (form) => {
    const formElement = document.querySelector(form);
    const isValid = formElement.checkValidity();
    if (!isValid) formElement.reportValidity();
    return isValid;
  };

  const formEvents = (
    dialogSelector,
    formSelector,
    openBtn,
    closeBtn,
    addBtn
  ) => {
    const formOpenBtn = document.querySelector(openBtn);
    if (formOpenBtn)
      formOpenBtn.addEventListener('click', () => openForm(dialogSelector));

    const formCloseBtn = document.querySelector(closeBtn);
    formCloseBtn.addEventListener('click', () => {
      resetForm(formSelector);
      closeForm(dialogSelector);
    });

    const projectAddBtn = document.querySelector(addBtn);
    projectAddBtn.addEventListener('click', () => {
      const isValid = handleValidity(formSelector);
      if (!isValid) return;
      if (formSelector.includes('project')) {
        projectFormEvents();
        Render.renderNav();
      } else if (formSelector.includes('todo')) {
        todoFormEvents();
      } else editFormEvents();
      resetForm(formSelector);
      closeForm(dialogSelector);
    });
  };

  const projectFormEvents = () => {
    const projectTitle = document.getElementById('project-title').value;
    App.addProject(projectTitle);
  };

  const todoFormEvents = () => {
    const projectIndex = App.getCurrentProjectIndex()
    const todoTitle = document.getElementById('todo-title').value;
    const todoDescription = document.getElementById('todo-description').value;
    const todoDueDate = document.getElementById('todo-due-date').value;
    const todoPriority = document.getElementById('todo-priority').value;
    App.addTodo(
      projectIndex,
      todoTitle,
      todoDescription,
      todoDueDate,
      todoPriority
    );
    Render.renderProject(projectIndex);
  };

  const editFormButtonEvents = (todoObject) => {
    const titleInput = document.getElementById('edit-title');
    const descriptionInput = document.getElementById('edit-description');
    const dueDateInput = document.getElementById('edit-due-date');
    titleInput.value = todoObject.title;
    descriptionInput.value = todoObject.description;
    dueDateInput.valueAsDate = new Date();
  };

  const editFormEvents = () => {
    const currentProjectIndex = App.getCurrentProjectIndex();
    const todo = App.getActiveTodo();
    const title = document.getElementById('edit-title').value;
    const description = document.getElementById('edit-description').value;
    const dueDate = document.getElementById('edit-due-date').value;
    const priority = document.getElementById('edit-priority').value;
    App.editTodo(
      todo,
      title,
      description,
      dueDate,
      priority
    );
    Render.renderProject(currentProjectIndex);
  };
  return { openForm, closeForm, formEvents, editFormButtonEvents };
})();
