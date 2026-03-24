export const createDomElements = (() => {
  const createLabel = (labelFor, labelText) => {
    const label = document.createElement('label');
    label.htmlFor = labelFor;
    label.textContent = labelText;
    return label;
  };

  const createInput = (id, placeholder, type = 'text', maxLength) => {
    const input = document.createElement('input');
    input.id = id;
    input.type = type;
    if (placeholder) input.placeholder = placeholder;
    if (maxLength) input.maxLength = maxLength;
    input.autocomplete = 'off';
    input.required = true;
    return input;
  };

  const createSelect = (id) => {
    const select = document.createElement('select');
    select.id = id;
    const low = document.createElement('option');
    low.textContent = 'Low';
    low.value = 'Low';
    const high = document.createElement('option');
    high.textContent = 'High';
    high.value = 'High';
    select.append(low, high);
    select.required = true;
    return select;
  };

  const createBasicElement = (type, className, textContent) => {
    const element = document.createElement(type);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    return element;
  };

  const createImage = (src) => {
    const image = document.createElement('img');
    image.src = src;
    return image;
  };
  return {
    createLabel,
    createInput,
    createSelect,
    createBasicElement,
    createImage,
  };
})();
