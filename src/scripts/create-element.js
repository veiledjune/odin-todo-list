export const CreateElement = (() => {
  const createNavListItem = (className, textContent) => {
    const listItem = document.createElement('li');
    listItem.classList.add(className);
    listItem.textContent = textContent;
    return listItem;
  }
  return { createNavListItem }
})()
