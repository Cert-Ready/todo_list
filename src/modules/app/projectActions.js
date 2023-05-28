import { hasTask } from './taskActions';
import ProjectList from '../class/ProjectList';
import { toggleElement } from './utility';

export function renderProjectList() {
  const projectListEl = document.querySelector('.project-list');
  let list = '';

  ProjectList._projectList.forEach((project) => {
    list += `<li class= "buttonV01 buttonV02 project"><i class="fa-sharp fa-solid fa-trash buttonV03" aria-hidden="true"></i> <i class="fa-solid fa-list-check" aria-hidden="true"></i> ${project.name}</li>`;
  });

  projectListEl.innerHTML = list;

  if (list !== '') {
    addEvent();
  }
}

function addEvent() {
  const projectEls = document.querySelectorAll('.project');

  projectEls.forEach((el, i) => {
    handleEvents(el, i);
  });
}

function handleEvents(el, i) {
  const projectTitleEl = document.querySelector('.project-title');
  const addTaskEl = document.querySelector('#add-task');

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

      hasTask(projectTitleEl.textContent);
    }
  });
}
