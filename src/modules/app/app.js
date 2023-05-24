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
      toggleModal(modalContainer);
    }
  });
}

function openAddProject(modalContainer, modal) {
  // display modal
  toggleModal(modalContainer);
}

function toggleModal(modalContainer) {
  modalContainer.classList.toggle('hidden');
}

function preventDefault() {
  const modalButtons = document.querySelectorAll('.formV01-btn');
  modalButtons.forEach((btn) => btn.addEventListener('click', (e) => e.preventDefault()));
}
