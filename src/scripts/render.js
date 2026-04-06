import { createDomElements } from './create-dom';
import { app } from './app';
import { format, parse } from 'date-fns';
import { events } from './events';

import deleteSrc from '../icons/delete.svg';
import checkmarkSrc from '../icons/checkmark.svg';
import circleSrc from '../icons/circle.svg';
import editSrc from '../icons/edit.svg';

export const render = (() => {
  const renderForm = (formType = false) => {
    const formContent = document.querySelector('.form-content');
    formContent.textContent = '';
    const formData = {
      projectForm: [
        {
          inputId: 'project-title',
          labelText: 'Name: *',
          inputPlaceholder: 'Name',
          maxLength: 20,
        },
      ],
      todoForm: [
        {
          inputId: 'todo-title',
          labelText: 'Name: *',
          inputPlaceholder: 'Name',
          maxLength: 20,
        },
        {
          inputId: 'todo-description',
          labelText: 'Description: *',
          inputPlaceholder: 'Description',
          maxLength: 60,
        },
        {
          inputId: 'todo-due-date',
          labelText: 'Due: *',
          inputType: 'date',
        },
        {
          inputId: 'todo-priority',
          labelText: 'Priority: *',
          inputType: 'select',
        },
      ],
    };
    if (formType === 'project') {
      formData.projectForm.forEach((data) => {
        const formTitle = document.querySelector('.form-title');
        formTitle.textContent = 'Add New Project';
        const label = createDomElements.createLabel(
          data.inputId,
          data.labelText,
        );
        const input = createDomElements.createInput(
          data.inputId,
          data.inputPlaceholder,
        );

        const div = createDomElements.createBasicElement(
          'div',
          'form-content-container',
        );

        div.append(label, input);
        formContent.appendChild(div);
      });
    } else {
      const formTitle = document.querySelector('.form-title');
      formData.todoForm.forEach((data) => {
        const label = createDomElements.createLabel(
          data.inputId,
          data.labelText,
        );

        const input =
          data.inputType === 'select'
            ? createDomElements.createSelect(data.inputId)
            : createDomElements.createInput(
                data.inputId,
                data.inputPlaceholder,
                data.inputType,
                data.maxLength,
              );

        const div = createDomElements.createBasicElement(
          'div',
          'form-content-container',
        );
        div.append(label, input);
        formContent.appendChild(div);
        if (formType === 'todo') {
          formTitle.textContent = 'Add New Todo';
        } else formTitle.textContent = 'Edit Todo';
      });
    }
  };

  const renderNav = () => {
    const projectsArr = app.getProjects();
    const selectedProject = app.getSelectedProject();
    const navList = document.querySelectorAll('.nav-list');
    navList.forEach((list) => {
      list.textContent = '';
      projectsArr.forEach((project) => {
        const listItem = createDomElements.createBasicElement(
          'li',
          'nav-list-item',
        );
        const listItemButton = createDomElements.createBasicElement(
          'button',
          'list-item-button',
          project.title,
        );
        listItemButton.setAttribute(
          'aria-label',
          `View ${project.title} project`,
        );
        listItem.appendChild(listItemButton);
        if (project.id === selectedProject.id) {
          listItem.classList.add('--selected');
          listItemButton.setAttribute('aria-selected', 'true');
        } else listItemButton.setAttribute('aria-selected', 'false');
        listItem.addEventListener('click', () => {
          app.setSelectedProject(project);
          renderNav();
          renderProject();
        });
        if (project.id === 'default-project') {
          list.appendChild(listItem);
          return;
        }
        const deleteButton = createDomElements.createBasicElement(
          'button',
          'project-delete-button',
        );
        deleteButton.setAttribute(
          'aria-label',
          `Delete ${project.title} project`,
        );
        deleteButton.addEventListener('click', (event) => {
          event.stopPropagation();
          events.projectDeleteButtonEvent(project.id);
        });
        const deleteIcon = createDomElements.createImage(deleteSrc);
        deleteButton.appendChild(deleteIcon);
        listItem.appendChild(deleteButton);
        list.appendChild(listItem);
      });
    });
  };

  const renderProject = () => {
    const selectedProject = app.getSelectedProject();
    const projectTitleElement = document.querySelector('.project-title');
    projectTitleElement.textContent = selectedProject.title;
    const todoListContainer = document.querySelector('.todo-card-container');
    todoListContainer.textContent = '';
    selectedProject.todos.forEach((todo) => {
      const todoCard = createDomElements.createBasicElement('div', 'todo-card');
      const todoCardLeft = createDomElements.createBasicElement(
        'div',
        'todo-card-left',
      );
      const todoCardRight = createDomElements.createBasicElement(
        'div',
        'todo-card-right',
      );
      const todoCardRightHeader = createDomElements.createBasicElement(
        'div',
        'todo-card-right-header',
      );
      const checkButton = createDomElements.createBasicElement(
        'button',
        'todo-check-button',
      );
      checkButton.setAttribute(
        'aria-label',
        todo.check
          ? `Mark ${todo.title} todo as incomplete`
          : `Mark ${todo.title} todo as complete`,
      );
      checkButton.addEventListener('click', () =>
        events.checkButtonEvent(todo),
      );
      const checkmarkIcon = createDomElements.createImage(checkmarkSrc);
      const circleIcon = createDomElements.createImage(circleSrc);
      if (!todo.check) {
        checkmarkIcon.classList.add('--hidden');
        checkmarkIcon.setAttribute('aria-hidden', 'true');
      }
      checkButton.append(checkmarkIcon, circleIcon);
      checkmarkIcon.alt = `Mark ${todo.title} as incomplete`;
      circleIcon.alt = `Mark ${todo.title} as complete`;
      const title = createDomElements.createBasicElement(
        'h4',
        'todo-title',
        `Title: ${todo.title}`,
      );

      const description = createDomElements.createBasicElement(
        'p',
        'todo-description',
        todo.description,
      );

      const dateObject = parse(todo.dueDate, 'yyyy-MM-dd', new Date());
      const dueDate = createDomElements.createBasicElement(
        'span',
        'todo-due-date',
        `Due: ${format(dateObject, 'dd-MM-yyyy')}`,
      );

      const priority = createDomElements.createBasicElement(
        'span',
        'todo-priority',
        `Priority: ${todo.priority}`,
      );
      if (todo.priority === 'Low') {
        priority.classList.add('--low');
      } else priority.classList.add('--high');

      const editButton = createDomElements.createBasicElement(
        'button',
        'todo-edit-button',
      );
      editButton.setAttribute('aria-label', `Edit ${todo.title} todo`);
      const editButtonTooltip = createDomElements.createBasicElement(
        'span',
        'tooltip',
        'Edit Todo',
      );
      editButton.appendChild(editButtonTooltip);
      editButton.addEventListener('click', () => events.editButtonEvent(todo));
      const editIcon = createDomElements.createImage(editSrc);
      editIcon.alt = `Edit ${todo.title} todo`;
      editButton.appendChild(editIcon);

      const deleteButton = createDomElements.createBasicElement(
        'button',
        'todo-delete-button',
      );
      deleteButton.setAttribute('aria-label', `Delete ${todo.title} todo`);
      const deleteButtonTooltip = createDomElements.createBasicElement(
        'span',
        'tooltip',
        'Delete Todo',
      );
      deleteButton.appendChild(deleteButtonTooltip);
      deleteButton.addEventListener('click', () =>
        events.todoDeleteButtonEvent(selectedProject, todo.id),
      );

      const todoDeleteImg = createDomElements.createImage(deleteSrc);
      todoDeleteImg.alt = `Delete ${todo.title} todo`;
      deleteButton.appendChild(todoDeleteImg);
      todoCardLeft.appendChild(checkButton);
      todoCardRightHeader.append(
        title,
        dueDate,
        priority,
        editButton,
        deleteButton,
      );

      todoCardRight.append(todoCardRightHeader, description);
      todoCard.append(todoCardLeft, todoCardRight);
      todoListContainer.appendChild(todoCard);
    });
  };
  return { renderForm, renderNav, renderProject };
})();
