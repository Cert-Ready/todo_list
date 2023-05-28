import { findProject, clearContent } from './utility';

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
          <div class="task-state"></div>
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
    if (e.target.classList.contains('fa-trash')) {
      findProject(projectTitleEl.textContent).element.deleteTask(i);
      renderTaskList(projectTitleEl.textContent, taskListEl);
    }
  });
}
