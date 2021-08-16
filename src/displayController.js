import { expandTask, loadProject } from "./taskDisplayer";

function displayController() {
  // for opening/closing sidebar and related padding for tablets
  sidebarToggler.addEventListener("click", displayToggler);

  // toggles active element of the sidebar menu
  sidebar.addEventListener("click", function (e) {
    if (e.target.nodeName === "A") {
      changeActive(e.target);
    }
  });

  mainContent.addEventListener("click", function (e) {
    if (e.target.nodeName === "LI") {
      expandTask(e.target);
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
  clearActive();
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
  newLink.innerText = projectName;

  newListItem.append(newLink);
  projects.append(newListItem);

  changeActive(newLink);
}

export { displayController, findActive, listProject };
