import { preventDefault, findProject, parseHtml, resetModal, toggleElement, fadeInElement } from './utility';
import { hasTask } from './taskActions';
import Task from '../class/Task';
import { hasLocalStorage, updateLocalStorage } from './localStorage';

const addTaskEl = document.querySelector('#add-task');
const modalContainer = document.querySelector('.modal');
const modal = document.querySelector('.formV01');
const btnAdd = document.querySelector('.add-task-submit-btn ');
const btnClose = document.querySelector('.add-task-btn-close');
const addTaskModal = document.querySelector('.formV01-add-task');

preventDefault();

// event listeners
addTaskEl.addEventListener('click', () => {
  openAddTask(modalContainer);
});

// add project
btnAdd.onclick = () => {
  const projectTitleEl = document.querySelector('.project-title');
  const taskPrio = document.querySelector('input[name="priority"]:checked').value;
  const taskName = document.querySelector('#task-title');
  const taskDesc = document.querySelector('#task-description');
  const taskDate = document.querySelector('#task-date');

  // check for empty fields description is optional
  if (taskName.value === '') {
    alert('Error: please enter task name');
    return;
  }

  if (taskDate.value === '') {
    alert('Error: please select date');
    return;
  }

  // push task to project
  findProject(projectTitleEl.textContent).element.pushTask(
    new Task(parseHtml(taskName.value), parseHtml(taskDesc.value), taskDate.value, taskPrio)
  );

  if (hasLocalStorage) {
    updateLocalStorage();
  }

  // render task
  hasTask(projectTitleEl.textContent);

  // close modal
  resetModal(modal);
  toggleElement(modalContainer);
  toggleElement(addTaskModal);
};

// close modal
btnClose.onclick = () => {
  resetModal(modal);
  toggleElement(modalContainer);
  toggleElement(addTaskModal);
};

// methods
function openAddTask(modalContainer) {
  // open modal
  toggleElement(modalContainer);
  toggleElement(addTaskModal);
  fadeInElement(modalContainer);
}
