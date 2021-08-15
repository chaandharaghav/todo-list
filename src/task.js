import { listProject } from "./displayController";

class Task {
  constructor(title, description, dueDate, priority, completed) {
    this.title = title;
    this.dueDate = dueDate ?? new Date();
    this.description = description ?? "No detailed description";
    this.priority = priority ?? "low";
    this.completed = completed ?? false;
  }
}

class Project {
  #taskList = [];
  constructor(projectName) {
    this.projectName = projectName;
  }

  get numTasks() {
    return this.#taskList.length;
  }

  viewTasks() {
    return this.#taskList;
  }

  addTask(title, description, dueDate, priority, completed) {
    const newTask = new Task(title, description, dueDate, priority, completed);
    this.#taskList.push(newTask);
  }
}

function addProject(projectName) {
  const newProject = new Project(projectName);
  projectList.push(newProject);
  listProject(projectName);
}

function findProject(projectName) {
  for (let project of projectList) {
    if (project.projectName === projectName) {
      return project;
    } else {
      console.log(project.projectName);
    }
  }
}

function showProjectList() {
  return projectList;
}

const home = new Project("Home");
const week = new Project("Week");

const projectList = [];

function findAllTasks() {
  for (let project of projectList) {
    for (let task of project.viewTasks()) {
      all.addTask(task);
    }
  }
}
findAllTasks();

const dtasks = [
  "Do the laundry",
  "Walk the dogs",
  "Clean the windows",
  "Make food for Tim",
];

for (let dtask of dtasks) {
  home.addTask(dtask);
}

export { home, week, addProject, findProject, showProjectList };
