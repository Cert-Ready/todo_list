import { format } from 'date-fns';
import ProjectList from '../class/ProjectList';
import { renderProjectList } from './projectActions';
import Project from '../class/Project';

// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

export const hasLocalStorage = () => {
  if (storageAvailable('localStorage')) return true;

  return false;
};

export function updateLocalStorage() {
  localStorage.setItem('projects', JSON.stringify(ProjectList._projectList));
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('projects'));
}

window.addEventListener('load', () => {
  if ((!getLocalStorage() && hasLocalStorage) || (getLocalStorage().length === 0 && hasLocalStorage)) {
    addSampleProject();
  } else {
    parseLocalStorage(getLocalStorage());
  }

  renderProjectList();
});

function parseLocalStorage(localStorage) {
  localStorage.forEach((object) => {
    parseObject(object);
    ProjectList.addProject(object);
  });
}

function addSampleProject() {
  const today = new Date();
  const date = format(today, 'yyyy-MM-dd');

  const sampleProject = {
    name: 'Awesome Project',
    taskList: [
      {
        title: 'Finish',
        desc: 'Hello World! 😎. This is a super secret description 🤫',
        date: date,
        priority: 'High',
      },
      {
        title: 'The',
        desc: 'Hello World! 😎. This is a super secret description 🤫',
        date: date,
        priority: 'High',
      },
      {
        title: 'Odin',
        desc: 'Hello World! 😎. This is a super secret description 🤫',
        date: date,
        priority: 'High',
      },
      {
        title: 'Project',
        desc: 'Hello World! 😎. This is a super secret description 🤫',
        date: date,
        priority: 'High',
      },
      {
        title: '💯',
        desc: 'Hello World! 😎. This is a super secret description 🤫',
        date: date,
        priority: 'High',
      },
    ],
  };

  // parse object
  parseObject(sampleProject);
  ProjectList.addProject(sampleProject);
}

function parseObject(object) {
  Object.assign(new Project(), object);
  Object.setPrototypeOf(object, Project.prototype);
}
