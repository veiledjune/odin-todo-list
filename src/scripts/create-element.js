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

  const createImage = (src) => {
    const image = document.createElement('img');
    image.src = src;
    return image;
  }

  const createElement = (type, className, textContent) => {
    const element = document.createElement(type);
    element.classList.add(className);
    if (!textContent) return element;
    element.textContent = textContent;
    return element;
  }
  return { createNavListItem, createButton, createImage, createElement }
})()
