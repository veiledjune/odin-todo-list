export const FormEvents = (() => {
  const openForm = (dialog) => {
    const dialogElement = document.querySelector(dialog);
    dialogElement.showModal();
  }

  const closeForm = (dialog) => {
    const dialogElement = document.querySelector(dialog);
    dialogElement.close();
  }
  return { openForm, closeForm }
})();