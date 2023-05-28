import Project from '../class/Project';
import ProjectList from '../class/ProjectList';
import { renderProjectList } from './projectActions';
import { preventDefault, findProject, parseHtml, resetModal, toggleElement, fadeInElement } from './utility';

const addProjectBtn = document.querySelector('.add-project');
const modalContainer = document.querySelector('.modal');
const modal = document.querySelector('.formV01');
const addProjectModal = document.querySelector('.formV01-add-project');
const btnAdd = document.querySelector('.add-project-submit-btn');
const closeBtn = document.querySelector('.add-project-close-btn');

preventDefault();

// event listeners
addProjectBtn.addEventListener('click', () => {
  // display modal
  openAddProject(modalContainer, modal);
});

// create project from modal fields
btnAdd.onclick = () => {
  const txtProjectName = document.querySelector('#project-title');

  // check for empty fields
  if (txtProjectName.value === '') {
    alert('Error: please enter project name');
    return;
  }

  if (findProject(txtProjectName.value).hasProject) {
    alert('Error: please enter a different project name.');
    return;
  }

  // parse html as entities
  // add project to project list
  ProjectList.addProject(new Project(parseHtml(txtProjectName.value)));

  // render project list
  renderProjectList();

  // reset & close modal
  resetModal(modal);
  toggleElement(modalContainer);
  toggleElement(addProjectModal);
};

closeBtn.onclick = () => {
  toggleElement(addProjectModal);
  toggleElement(modalContainer);
};

// methods
const openAddProject = (modalContainer) => {
  // display modal
  // check if add project modal is hidden
  if (addProjectModal.classList.contains('hidden')) {
    toggleElement(addProjectModal);
  }

  toggleElement(modalContainer);
  fadeInElement(modalContainer);
};
