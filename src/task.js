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
    // setLocal();
  }

  findTask(taskTitle) {
    for (let task of this.#taskList) {
      if (task.title === taskTitle) {
        return task;
      }
    }
    return "Not found";
  }

  deleteTask(task) {
    this.#taskList.splice(this.#taskList.indexOf(task), 1);
    return this.#taskList;
  }
}

function addProject(projectName) {
  const newProject = new Project(projectName);
  projectList.push(newProject);
  listProject(projectName);
  // setLocal();
}

function findProject(projectName) {
  if (projectName === "Home") {
    return home;
  }

  for (let project of projectList) {
    if (project.projectName === projectName) {
      return project;
    }
  }
  return null;
}

function showProjectList() {
  return projectList;
}

let home = new Project("Home");
const week = new Project("Week");

let projectList = [];

// as storing a class requires serialization, this is left unsaved to localStorage for now

// function setLocal() {
//   console.log(JSON.stringify(home));
//   const lhome = JSON.stringify(home);
//   const lprojectList = JSON.stringify(projectList);

//   localStorage.setItem("home", lhome);
//   localStorage.setItem("projectList", lprojectList);
// }

// function getFromLocal() {
//   if (
//     localStorage.getItem("home") !== null &&
//     localStorage.getItem("projectList") !== null
//   ) {
//     projectList = localStorage.getItem(projectList);
//     home = localStorage.getItem(home);

//     projectList = JSON.parse(projectList);
//     home = JSON.parse(home);
//   }
// }

const dtasks = [
  "Do the laundry",
  "Walk the dogs",
  "Clean the windows",
  "Make food for Tim",
];

for (let dtask of dtasks) {
  home.addTask(dtask);
}

export { home, week, projectList, addProject, findProject, showProjectList };
