import Project from '../class/Project';
import Task from '../class/Task';
import ProjectList from '../class/ProjectList';

export function app() {
  const addProjectBtn = document.querySelector('.add-project');
  const modalContainer = document.querySelector('.modal');
  const modal = document.querySelector('.formV01');

  preventDefault();

  addProjectBtn.addEventListener('click', () => {
    // display modal
    openAddProject(modalContainer, modal);
  });

  // toggle modal depending on area clicked
  modalContainer.addEventListener('click', (e) => {
    const closeBtn = document.querySelector('.formV01-btn-close');

    // close modal if clicked out of bounds
    if (e.target === modalContainer || e.target === closeBtn) {
      toggleElement(modalContainer);
    }
  });
}

function fadeInElement(element) {
  if (!element) return;

  let classToggle = 'fadeIn';
  const animationDuration = '250';

  element.classList.toggle(classToggle);
  element.style.animationDuration = `${animationDuration}ms`;

  setTimeout(() => {
    element.classList.toggle(classToggle);
  }, `${animationDuration}`);
}

function openAddProject(modalContainer, modal) {
  const btnAdd = document.querySelector('.add-project-submit-btn ');
  const txtProjectName = document.querySelector('#project-title');

  // display modal
  toggleElement(modalContainer);
  fadeInElement(modalContainer);

  // create project from modal fields
  btnAdd.onclick = () => {
    // check for empty fields
    if (txtProjectName.value === '') {
      alert('Error please enter project name');
      return;
    }

    // add project to project list
    ProjectList.addProject(new Project(txtProjectName.value));

    // render project list
    renderProjectList();

    // reset & close modal
    modal.reset();
    toggleElement(modalContainer);
  };
}

function renderProjectList() {
  const projectListEl = document.querySelector('.project-list');
  let list = '';

  ProjectList._projectList.forEach((project) => {
    list += `<li class= "buttonV01 buttonV02"><i class="fa-sharp fa-solid fa-trash"></i> <i class="fa-solid fa-list-check" aria-hidden="true"></i> ${project.name}</li>`;
  });

  projectListEl.innerHTML = list;
}

function toggleElement(element) {
  element.classList.toggle('hidden');
}

function preventDefault() {
  const modalButtons = document.querySelectorAll('.formV01-btn');
  modalButtons.forEach((btn) => btn.addEventListener('click', (e) => e.preventDefault()));
}
