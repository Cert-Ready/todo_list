import Project from '../class/Project';
import ProjectList from '../class/ProjectList';
import { preventDefault, toggleElement, resetModal, fadeInElement, findProject, parseHtml } from './utility';

const handleProject = (() => {
  const addProjectBtn = document.querySelector('.add-project');
  const modalContainer = document.querySelector('.modal');
  const modal = document.querySelector('.formV01');

  preventDefault();

  // event listeners
  addProjectBtn.addEventListener('click', () => {
    // display modal
    openAddProject(modalContainer, modal);
  });

  // methods
  const openAddProject = (modalContainer, modal) => {
    const btnAdd = document.querySelector('.add-project-submit-btn ');
    const txtProjectName = document.querySelector('#project-title');
    const addProjectModal = document.querySelector('.formV01-add-project');
    const closeBtn = document.querySelector('.add-project-close-btn');

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
    const addTaskEl = document.querySelector('#add-task');

    projectEls.forEach((el, i) => {
      el.addEventListener('click', (e) => {
        // delete project
        if (e.target.classList.contains('fa-trash')) {
          ProjectList.deleteProject(i);
          renderProjectList();
        } else {
          // render project name in DOM
          projectTitleEl.textContent = ProjectList._projectList[i].name;

          // render add task element
          if (addTaskEl.classList.contains('hidden')) {
            toggleElement(addTaskEl);
          }
        }
      });
    });
  }
})();

export default handleProject;
