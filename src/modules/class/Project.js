export default class Project {
  constructor(name) {
    this.name = name;
    this.taskList = [];
  }

  pushTask(task) {
    this.taskList.push(task);
  }

  deleteTask(task) {
    this.taskList.splice(task, 1);
  }
}
