import { preventDefault, toggleElement, resetModal } from './utility';

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
    const btnModalAdd = document.querySelector('.add-task-submit-btn ');
    const btnModalClose = document.querySelector('.add-task-btn-close');

    // open modal
    toggleElement(modalContainer);
    toggleElement(addTaskModal);

    // close modal
    btnModalClose.onclick = () => {
      resetModal(modal);
      toggleElement(modalContainer);
      toggleElement(addTaskModal);
    };
  }
})();

export default handleTask;
