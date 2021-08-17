import { deleteProject, home, showProjectList } from "./task";
import { expandTask, loadProject } from "./taskDisplayer";
import { deleteTask } from "./taskManager";

function displayController() {
  // for opening/closing sidebar and related padding for tablets
  sidebarToggler.addEventListener("click", displayToggler);

  // toggles active element of the sidebar menu
  sidebar.addEventListener("click", function (e) {
    if (e.target.nodeName === "A") {
      changeActive(e.target);
    } else if (e.target.classList.contains("infoSpan")) {
      changeActive(e.target.parentNode);
    } else if (e.target.nodeName === "path") {
      deleteProject(e.target);
      changeActive(document.querySelector(".menu-list a"));
    }
  });

  mainContent.addEventListener("click", function (e) {
    if (e.target.nodeName === "LI") {
      expandTask(e.target);
    } else if (e.target.classList.contains("infoSpan")) {
      expandTask(e.target.parentNode);
    } else if (e.target.nodeName === "path") {
      deleteTask(e.target);
    }
  });
}

const sidebarToggler = document.querySelector(".navbar-burger");
const sidebar = document.querySelector("#sidebar");

const mainContent = document.querySelector("#mainContent");

// controls view when sidebar is toggled in tablet
function displayToggler() {
  this.classList.toggle("is-active");
  sidebar.classList.toggle("is-hidden-mobile");

  if (window.innerWidth > 750) {
    mainContent.classList.toggle("offset");
  }
}

// finds current active element
function findActive() {
  return document.querySelector("#sidebar .is-active");
}

// checks if active element changes
let lastActive = findActive().innerText;
function isChange() {
  const currentActive = findActive().innerText;
  if (lastActive !== currentActive) {
    loadProject(currentActive);
    lastActive = currentActive;
  }
}

// change active element
function changeActive(elem) {
  if (findActive() !== null) {
    clearActive();
  }
  elem.classList.add("is-active");
  isChange();
}

function clearActive() {
  document.querySelector("#sidebar .is-active").classList.remove("is-active");
}

function listProject(projectName) {
  const projects = document.querySelector("#projects");

  const newListItem = document.createElement("li");
  const newLink = document.createElement("a");

  const infoSpan = document.createElement("span");
  infoSpan.classList.add("infoSpan");
  infoSpan.innerText = projectName;

  const delSpan = document.createElement("span");
  delSpan.classList.add("delTaskIcon");
  delSpan.innerHTML = '<i class="fas fa-trash-alt"></i>';

  newLink.append(infoSpan, delSpan);

  newListItem.append(newLink);
  projects.append(newListItem);

  changeActive(newLink);
}

function loadAllProjects() {
  const projects = document.querySelector("#projects");

  for (let project of showProjectList()) {
    listProject(project.projectName);
  }
}

export { displayController, findActive, listProject, loadAllProjects };
