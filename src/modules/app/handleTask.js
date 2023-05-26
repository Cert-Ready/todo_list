import { preventDefault, toggleElement, resetModal, findProject, parseHtml } from './utility';
import Task from '../class/Task';

const handleTask = (() => {
  const projectTitleEl = document.querySelector('.project-title');
  const addTaskEl = document.querySelector('#add-task');
  const modalContainer = document.querySelector('.modal');
  const modal = document.querySelector('.formV01');

  preventDefault();

  addTaskEl.addEventListener('click', () => {
    openAddTask(modalContainer, modal);
  });

  function openAddTask(modalContainer, modal) {
    const addTaskModal = document.querySelector('.formV01-add-task ');
    const btnAdd = document.querySelector('.add-task-submit-btn ');
    const btnClose = document.querySelector('.add-task-btn-close');
    const taskName = document.querySelector('#task-name');
    const taskDesc = document.querySelector('#task-description');
    const taskDate = document.querySelector('#task-date');

    // open modal
    toggleElement(modalContainer);
    toggleElement(addTaskModal);

    // add project
    btnAdd.onclick = () => {
      const taskPrio = document.querySelector('input[name="priority"]:checked').value;

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
  }
})();

export default handleTask;
