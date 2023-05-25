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
      resetModal(modal);
    }
  });
}

function fadeInElement(element) {
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
  const addProjectModal = document.querySelector('.formV01-add-project');

  // display modal
  // check if add project modal is hidden
  if (addProjectModal.classList.contains('hidden')) {
    toggleElement(addProjectModal);
  }

  toggleElement(modalContainer);
  fadeInElement(modalContainer);

  // create project from modal fields
  btnAdd.onclick = () => {
    // check for empty fields
    if (txtProjectName.value === '') {
      alert('Error: please enter project name');
      return;
    }

    // console.log(typeof findProject(txtProjectName.value));
    if (findProject(txtProjectName.value).hasProject) {
      alert('Error: please enter a different project name.');
      return;
    }

    // add project to project list
    ProjectList.addProject(new Project(txtProjectName.value));

    // render project list
    renderProjectList();

    // reset & close modal
    resetModal(modal);
    toggleElement(modalContainer);
  };
}

function findProject(name) {
  let hasProject = false;
  let index = null;
  let element = null;

  ProjectList._projectList.forEach((el, i) => {
    if (Object.values(el).includes(name)) {
      hasProject = true;
      index = i;
      element = el;
    }
  });

  return { hasProject, index, element };
}

function resetModal(modal) {
  return modal.reset();
}

function renderProjectList() {
  const projectListEl = document.querySelector('.project-list');
  let list = '';

  ProjectList._projectList.forEach((project) => {
    list += `<li class= "buttonV01 buttonV02 project"><i class="fa-sharp fa-solid fa-trash"></i> <i class="fa-solid fa-list-check" aria-hidden="true"></i> ${project.name}</li>`;
  });

  projectListEl.innerHTML = list;

  const projectEls = document.querySelectorAll('.project');

  projectEls.forEach((el, i) => {
    el.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-trash')) {
        ProjectList.deleteProject(i);
        renderProjectList();
      }
    });
  });
}

function toggleElement(element) {
  return element.classList.toggle('hidden');
}

function preventDefault() {
  const modalButtons = document.querySelectorAll('.formV01-btn');
  modalButtons.forEach((btn) => btn.addEventListener('click', (e) => e.preventDefault()));
}
