import Project from '../class/Project';
import ProjectList from '../class/ProjectList';
import { preventDefault, toggleElement, resetModal, fadeInElement, findProject } from './utility';

const handleProject = (() => {
  const addProjectBtn = document.querySelector('.add-project');
  const modalContainer = document.querySelector('.modal');
  const modal = document.querySelector('.formV01');

  preventDefault();

  // event listeners
  // toggle modal depending on area clicked
  modalContainer.addEventListener('click', (e) => {
    const closeBtn = document.querySelector('.formV01-btn-close');

    // close modal if clicked out of bounds
    if (e.target === modalContainer || e.target === closeBtn) {
      toggleElement(modalContainer);
      resetModal(modal);
    }
  });

  addProjectBtn.addEventListener('click', () => {
    // display modal
    openAddProject(modalContainer, modal);
  });

  // methods
  const openAddProject = (modalContainer, modal) => {
    const btnAdd = document.querySelector('.add-project-submit-btn ');
    const txtProjectName = document.querySelector('#project-title');
    const addProjectModal = document.querySelector('.formV01-add-project');
    let parseName = '';

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

      if (findProject(txtProjectName.value).hasProject) {
        alert('Error: please enter a different project name.');
        return;
      }

      // parse html as entities
      parseName = txtProjectName.value.replace(/</g, '&lt;').replace(/>/g, '&gt;');

      // add project to project list
      ProjectList.addProject(new Project(parseName));

      // render project list
      renderProjectList();

      // reset & close modal
      resetModal(modal);
      toggleElement(modalContainer);
    };
  };

  function renderProjectList() {
    const projectListEl = document.querySelector('.project-list');
    let list = '';

    ProjectList._projectList.forEach((project) => {
      list += `<li class= "buttonV01 buttonV02 project"><i class="fa-sharp fa-solid fa-trash"></i> <i class="fa-solid fa-list-check" aria-hidden="true"></i> ${project.name}</li>`;
    });

    projectListEl.innerHTML = list;

    if (list !== '') {
      projectActions();
    }
  }

  function projectActions() {
    const projectEls = document.querySelectorAll('.project');
    const projectTitleEl = document.querySelector('.project-title');

    projectEls.forEach((el, i) => {
      el.addEventListener('click', (e) => {
        // delete project
        if (e.target.classList.contains('fa-trash')) {
          ProjectList.deleteProject(i);
          renderProjectList();
        } else {
          // render project name in DOM
          projectTitleEl.textContent = ProjectList._projectList[i].name;
        }
      });
    });
  }
})();

export default handleProject;
