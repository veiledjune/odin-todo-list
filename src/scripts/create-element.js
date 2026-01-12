export const CreateElement = (() => {
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
  return { createImage, createElement }
})()
