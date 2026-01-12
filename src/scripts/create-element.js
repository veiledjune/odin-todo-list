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
  return { createNavListItem, createButton, createImage }
})()
