import ProjectList from '../class/ProjectList';

export const findProject = (name) => {
  let hasProject = false;
  let index = null;
  let element = null;

  ProjectList._projectList.forEach((el, i) => {
    if (Object.values(el).includes(name)) {
      hasProject = true;
      index = i;
      element = el;
    }
  });

  return { hasProject, index, element };
};

export function resetModal(modal) {
  return modal.reset();
}

export function fadeInElement(element) {
  let classToggle = 'fadeIn';
  const animationDuration = '250';

  element.classList.toggle(classToggle);
  element.style.animationDuration = `${animationDuration}ms`;

  setTimeout(() => {
    element.classList.toggle(classToggle);
  }, `${animationDuration}`);
}

export function toggleElement(element) {
  return element.classList.toggle('hidden');
}

export function preventDefault() {
  const modalButtons = document.querySelectorAll('.formV01-btn');
  modalButtons.forEach((btn) => btn.addEventListener('click', (e) => e.preventDefault()));
}

export function parseHtml(string) {
  return string.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function clearContent(element) {
  element.innerHTML = '';
}
