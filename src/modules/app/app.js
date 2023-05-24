import Project from '../class/Project';
import Task from '../class/Task';
import ProjectList from '../class/ProjectList';

export function app() {
  preventDefault();
}

function preventDefault() {
  const modalButtons = document.querySelectorAll('.formV01-btn');
  modalButtons.forEach((btn) => btn.addEventListener('click', (e) => e.preventDefault()));
}