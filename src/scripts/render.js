import { App } from './app';
import { CreateElement } from './create-element';
import { FormEvents } from './form';
import { format, parse } from 'date-fns';
import deleteIcon from '../icons/delete-icon.svg';
import uncheckIcon from '../icons/uncheck-icon.svg';
import checkIcon from '../icons/check-icon.svg';
import editIcon from '../icons/edit-icon.svg';

export const Render = (() => {
  const projectsArr = App.getProjects();
  const renderNav = () => {
    const navProjectList = document.querySelector('.nav-project-list');
    navProjectList.textContent = '';
    projectsArr.forEach((project) => {
      const listItem = CreateElement.createElement(
        'li',
        'nav-project-item',
        project.title
      );
      const currentProject = App.getCurrentProject();
      if (project.id === currentProject.id) addSelectedClass(listItem);
      listItem.addEventListener('click', () => {
        App.updateCurrentProject(project);
        addSelectedClass(listItem);
        renderProject();
      });
      if (project.id === 'default-project') {
        navProjectList.appendChild(listItem);
        return;
      }
      const deleteBtn = CreateElement.createElement(
        'button',
        'project-delete-btn'
      );
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const currentProject = App.getCurrentProject();
        if (project === currentProject) {
          App.updateCurrentProject(projectsArr[0]);
          renderProject();
        }
        const projectIndex = App.getProjectIndex(project.id);
        App.deleteProject(projectIndex);
        renderNav();
      });
      const deleteImg = CreateElement.createImage(deleteIcon);
      deleteBtn.appendChild(deleteImg);
      listItem.appendChild(deleteBtn);
      navProjectList.appendChild(listItem);
    });
  };

  const renderProject = () => {
    const currentProject = App.getCurrentProject();
    const projectTitleElement = document.querySelector('.project-title');
    projectTitleElement.textContent = currentProject.title;
    const todoListContainer = document.querySelector('.todo-list-container');
    todoListContainer.textContent = '';
    currentProject.todos.forEach((todo) => {
      const todoDiv = CreateElement.createElement('div', 'todo-card');
      const todoCheckBtn = CreateElement.createElement(
        'button',
        'todo-check-btn'
      );
      todoCheckBtn.addEventListener('click', () => {
        App.toggleCheck(todo);
        renderProject();
      });
      const todoCheckImg = todo.check
        ? CreateElement.createImage(checkIcon)
        : CreateElement.createImage(uncheckIcon);
      todoCheckBtn.appendChild(todoCheckImg);
      const todoTitle = CreateElement.createElement(
        'h4',
        'todo-title',
        `Title: ${todo.title}`
      );
      const todoDescription = CreateElement.createElement(
        'p',
        'todo-description',
        todo.description
      );
      const dateObject = parse(todo.dueDate, 'yyyy-MM-dd', new Date());
      const todoDueDate = CreateElement.createElement(
        'span',
        'todo-due-date',
        `Due: ${format(dateObject, 'dd-MM-yyyy')}`
      );
      const todoPriority = CreateElement.createElement(
        'span',
        'todo-priority',
        `Priority: ${todo.priority}`
      );
      if (todo.priority === 'Low') {
        todoPriority.classList.add('--low');
      } else todoPriority.classList.add('--high');
      const todoEditBtn = CreateElement.createElement(
        'button',
        'todo-edit-btn'
      );
      todoEditBtn.addEventListener('click', () => {
        App.updateActiveTodo(todo);
        FormEvents.openForm('.edit-dialog');
        FormEvents.editFormButtonEvents(todo);
      });
      const todoEditIcon = CreateElement.createImage(editIcon);
      todoEditBtn.appendChild(todoEditIcon);
      const todoDeleteBtn = CreateElement.createElement(
        'button',
        'todo-delete-btn'
      );
      todoDeleteBtn.addEventListener('click', () => {
        const currentProject = App.getCurrentProject();
        const todoIndex = App.getTodoIndex(currentProject, todo);
        App.deleteTodo(currentProject, todoIndex);
        renderProject();
      });
      const todoDeleteImg = CreateElement.createImage(deleteIcon);
      todoDeleteBtn.appendChild(todoDeleteImg);
      todoDiv.append(
        todoCheckBtn,
        todoTitle,
        todoDueDate,
        todoPriority,
        todoEditBtn,
        todoDeleteBtn,
        todoDescription
      );
      todoListContainer.appendChild(todoDiv);
    });
  };

  const addSelectedClass = (listItem) => {
    const listItems = document.querySelectorAll('.nav-project-item');
    listItems.forEach((item) => {
      if (item.classList.contains('--selected'))
        item.classList.remove('--selected');
    });
    listItem.classList.add('--selected');
  };
  return { renderNav, renderProject };
})();
