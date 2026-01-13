import { App } from './app';
import { CreateElement } from './create-element';
import deleteIcon from '../icons/delete-icon.svg';
import uncheckIcon from '../icons/uncheck-icon.svg';
import checkIcon from '../icons/check-icon.svg';
import editIcon from '../icons/edit-icon.svg';

export const Render = (() => {
  const projectsArr = App.getProjects();
  let currentProject = projectsArr[0];
  const renderNav = () => {
    const navProjectList = document.querySelector('.nav-project-list');
    navProjectList.textContent = '';
    projectsArr.forEach(project => {
      const listItem = CreateElement.createElement('li', 'nav-project-item', project.title);
      listItem.dataset.id = project.id;
      listItem.addEventListener('click', () => {
        currentProject = project;
        const projectId = listItem.dataset.id;
        const projectIndex = projectsArr.findIndex(project => project.id === projectId);
        renderProject(projectIndex)
      })
      if (project.id === 'default-project') {
        navProjectList.appendChild(listItem)
        return;
      }
      const deleteBtn = CreateElement.createElement('button', 'project-delete-btn');
      deleteBtn.dataset.id = project.id;
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentProject === project) renderProject(0)
        const projectId = deleteBtn.dataset.id;
        const projectIndex = projectsArr.findIndex(project => project.id === projectId)
        App.deleteProject(projectIndex);
        renderNav();
      });
      const deleteImg = CreateElement.createImage(deleteIcon);
      deleteBtn.appendChild(deleteImg)
      listItem.appendChild(deleteBtn);
      navProjectList.appendChild(listItem)
    });
  }

  const renderProject = (projectIndex) => {
    const project = projectsArr[projectIndex];
    const projectTitleElement = document.querySelector('.project-title');
    projectTitleElement.textContent = project.title;
    const todoListContainer = document.querySelector('.todo-list-container');
    todoListContainer.textContent = '';
    const todoAddBtn = document.querySelector('.todo-add-btn');
    todoAddBtn.dataset.id = project.id;
    project.todos.forEach(todo => {
      const todoDiv = CreateElement.createElement('div', 'todo-card');
      const todoCheckBtn = CreateElement.createElement('button', 'todo-check-btn');
      const todoCheckimg = todo.check ? 
        CreateElement.createImage(checkIcon) : CreateElement.createImage(uncheckIcon);
      todoCheckBtn.appendChild(todoCheckimg)
      const todoTitle = CreateElement.createElement('h4', 'todo-title', `Title: ${todo.title}`)
      const todoDescription = CreateElement.createElement('p', 'todo-description', todo.description);
      const todoDueDate= CreateElement.createElement('span', 'todo-due-date', `Due: ${todo.dueDate}`);
      const todoPriority = CreateElement.createElement('span', 'todo-priority', `Priority: ${todo.priority}`);
      if (todo.priority === 'Low') {
        todoPriority.classList.add('--low')
      } else todoPriority.classList.add('--high');
      const todoEditBtn = CreateElement.createElement('button', 'todo-edit-btn');
      const todoDeleteBtn = CreateElement.createElement('button', 'todo-delete-btn');
      todoDeleteBtn.dataset.id = todo.id;
      todoDeleteBtn.addEventListener('click', () => {
        const todoId = todoDeleteBtn.dataset.id;
        const todoIndex = project.todos.findIndex(todo => todo.id === todoId);
        App.deleteTodo(project, todoIndex);  
        renderProject(projectIndex);
      })
      const todoDeleteImg = CreateElement.createImage(deleteIcon);
      todoDeleteBtn.appendChild(todoDeleteImg);
      todoDiv.append(todoCheckBtn, todoTitle, todoDueDate, todoPriority, todoEditBtn, todoDeleteBtn, todoDescription)
      todoListContainer.appendChild(todoDiv);
    })
    
  }
  return { renderNav, renderProject }
})()