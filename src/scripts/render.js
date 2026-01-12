import { App } from './app'
import { CreateElement } from './create-element'
import deleteIcon from '../icons/delete-icon.svg'

export const Render = (() => {
  const renderNav = () => {
    const projectsArr = App.getProjects()
    const navProjectList = document.querySelector('.nav-project-list');
    navProjectList.textContent = '';
    projectsArr.forEach(project => {
      const listItem = CreateElement.createNavListItem('nav-project-item', project.title)
      if (project.id === 'default-project') {
        navProjectList.appendChild(listItem)
        return;
      }
      const deleteBtn = CreateElement.createButton('project-delete-btn');
      deleteBtn.dataset.id = project.id;
      deleteBtn.addEventListener('click', () => {
        const projectId = deleteBtn.dataset.id;
        const projectIndex = projectsArr.findIndex(project => project.id === projectId)
        App.deleteProject(projectIndex);
        renderNav();
      })
      const deleteImg = CreateElement.createImage(deleteIcon);
      deleteBtn.appendChild(deleteImg)
      listItem.appendChild(deleteBtn);
      navProjectList.appendChild(listItem)
    })
  }
  return { renderNav }
})()