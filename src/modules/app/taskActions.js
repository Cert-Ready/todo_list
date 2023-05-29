import { findProject, clearContent, toggleElement, fadeInElement } from './utility';
const modalContainer = document.querySelector('.modal');
const viewModal = document.querySelector('.formV01-view-task');
const btnViewClose = document.querySelector('.view-task-btn-close');
const viewTitleEl = document.querySelector('.view-title');
const viewDescEl = document.querySelector('.view-desc');
const viewDateEl = document.querySelector('.view-date');
const viewPrioEl = document.querySelector('.view-prio');

export function hasTask(project) {
  const taskListEl = document.querySelector('.task-list');

  if (findProject(project).element.taskList.length > 0) {
    renderTaskList(project, taskListEl);
  } else {
    clearContent(taskListEl);
  }
}

function renderTaskList(project, taskListEl) {
  let list = '';

  findProject(project).element.taskList.forEach((task) => {
    list += `
        <li class="buttonV01 buttonV02 task flex">
          <div><i class="fa-solid fa-circle task-state buttonV03"></i></div>
          <div class="task-name">${task.title}</div>
          <div class="task-date">${task.date}</div>
          <div class="task-view"><i class="fa-solid fa-eye buttonV03" aria-hidden="true"></i></div>          
          <div class="task-delete"><i class="fa-sharp fa-solid fa-trash buttonV03" aria-hidden="true"></i></div>
        </li>      
      `;
  });

  taskListEl.innerHTML = list;

  if (list !== '') {
    addEvent(taskListEl);
  }
}

function addEvent(taskListEl) {
  const taskEls = document.querySelectorAll('.task');

  taskEls.forEach((el, i) => {
    handleEvents(el, i, taskListEl);
  });
}

function handleEvents(el, i, taskListEl) {
  const projectTitleEl = document.querySelector('.project-title');

  el.addEventListener('click', (e) => {
    // delete task
    // delete completed task
    if (e.target.classList.contains('fa-trash') || e.target.classList.contains('task-state')) {
      findProject(projectTitleEl.textContent).element.deleteTask(i);
      renderTaskList(projectTitleEl.textContent, taskListEl);
    }

    // view task
    if (e.target.classList.contains('fa-eye')) {
      toggleViewModal(findProject(projectTitleEl.textContent).element.taskList[i]);
    }
  });
}

function toggleViewModal(el) {
  populateModal(el);
  toggleElement(modalContainer);
  toggleElement(viewModal);
  fadeInElement(modalContainer);
}

function populateModal(el) {
  viewTitleEl.textContent = el.title;
  viewDescEl.textContent = el.desc;
  viewDateEl.textContent = el.date;
  viewPrioEl.textContent = el.priority;
}

function clearModal() {
  viewTitleEl.textContent = '';
  viewDescEl.textContent = '';
  viewDateEl.textContent = '';
  viewPrioEl.textContent = '';
}

btnViewClose.onclick = () => {
  clearModal();
  toggleElement(modalContainer);
  toggleElement(viewModal);
};
