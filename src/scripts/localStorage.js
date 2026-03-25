export const handleLocalStorage = (() => {
  const saveProjects = (projectsArr) =>
    localStorage.setItem('projectsArr', JSON.stringify(projectsArr));

  const getProjects = () => JSON.parse(localStorage.getItem('projectsArr'));

  return { saveProjects, getProjects };
})();
