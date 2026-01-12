export const CreateElement = (() => {
  const createNavListItem = (className, textContent) => {
    const listItem = document.createElement('li');
    listItem.classList.add(className);
    listItem.textContent = textContent;
    return listItem;
  }

  const createButton = (className) => {
    const button = document.createElement('button');
    button.classList.add(className)
    return button;
  }
  return { createNavListItem, createButton }
})()
