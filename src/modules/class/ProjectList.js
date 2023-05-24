export default class ProjectList {
  static _projectList = [];

  static addProject(project) {
    this._projectList.push(project);
  }

  static deleteProject(project) {
    this._projectList.splice(this._projectList.indexOf(project), 1);
  }
}
