/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/styles.scss":
/*!*************************!*\
  !*** ./src/styles.scss ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/displayController.js":
/*!**********************************!*\
  !*** ./src/displayController.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayController": () => (/* binding */ displayController),
/* harmony export */   "findActive": () => (/* binding */ findActive),
/* harmony export */   "listProject": () => (/* binding */ listProject),
/* harmony export */   "loadAllProjects": () => (/* binding */ loadAllProjects)
/* harmony export */ });
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./task */ "./src/task.js");
/* harmony import */ var _taskDisplayer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./taskDisplayer */ "./src/taskDisplayer.js");
/* harmony import */ var _taskManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./taskManager */ "./src/taskManager.js");




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
      (0,_task__WEBPACK_IMPORTED_MODULE_0__.deleteProject)(e.target);
      changeActive(document.querySelector(".menu-list a"));
    }
  });

  mainContent.addEventListener("click", function (e) {
    if (e.target.nodeName === "LI") {
      (0,_taskDisplayer__WEBPACK_IMPORTED_MODULE_1__.expandTask)(e.target);
    } else if (e.target.classList.contains("infoSpan")) {
      (0,_taskDisplayer__WEBPACK_IMPORTED_MODULE_1__.expandTask)(e.target.parentNode);
    } else if (e.target.nodeName === "path") {
      (0,_taskManager__WEBPACK_IMPORTED_MODULE_2__.deleteTask)(e.target);
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
    (0,_taskDisplayer__WEBPACK_IMPORTED_MODULE_1__.loadProject)(currentActive);
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

  for (let project of (0,_task__WEBPACK_IMPORTED_MODULE_0__.showProjectList)()) {
    listProject(project.projectName);
  }
}




/***/ }),

/***/ "./src/formControls.js":
/*!*****************************!*\
  !*** ./src/formControls.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addFormEvents": () => (/* binding */ addFormEvents)
/* harmony export */ });
/* harmony import */ var _displayController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displayController */ "./src/displayController.js");
/* harmony import */ var _modalManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modalManager */ "./src/modalManager.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./task */ "./src/task.js");
/* harmony import */ var _taskDisplayer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./taskDisplayer */ "./src/taskDisplayer.js");
/* harmony import */ var _taskManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./taskManager */ "./src/taskManager.js");






function processProject(e) {
  e.preventDefault();

  const form = document.querySelector("#projectModal form");
  const projectName = form[0].value.trim();
  if (!(0,_task__WEBPACK_IMPORTED_MODULE_2__.findProject)(projectName)) {
    (0,_task__WEBPACK_IMPORTED_MODULE_2__.addProject)(projectName);
  } else {
    document.querySelector("#projectModal .help").classList.remove("is-hidden");
  }
}

function processTask(e) {
  e.preventDefault();

  const project = (0,_task__WEBPACK_IMPORTED_MODULE_2__.findProject)((0,_displayController__WEBPACK_IMPORTED_MODULE_0__.findActive)().innerText);
  (0,_taskManager__WEBPACK_IMPORTED_MODULE_4__.addTask)();
  (0,_taskDisplayer__WEBPACK_IMPORTED_MODULE_3__.loadTasks)(project);
}

function addFormEvents() {
  mainContent.addEventListener("click", function (e) {
    if (e.target.classList.contains("projectModalCancel")) {
      document.querySelector("#projectModal").remove();
    }
  });

  // if addProjectBtn is clicked proceed to add project
  sidebar.addEventListener("click", function (e) {
    if (e.target.id === "addProjectBtn") {
      (0,_modalManager__WEBPACK_IMPORTED_MODULE_1__.addProjectModal)();

      const form = document.querySelector("#projectModal form");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        processProject(e);
      });
      // removing to prevent from adding many times
      form.removeEventListener("submit", processProject);
    }
  });

  // if form submission button is clicked, addTask and load
  mainContent.addEventListener("click", function (e) {
    if (e.target.id === "modalAddTask") {
      const form = document.querySelector("#modal form");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        processTask(e);
      });

      // removing to prevent from adding many times
      form.removeEventListener("submit", processTask);
    } else if (e.target.classList.contains("modalCancel")) {
      document.querySelector("#modal").remove();
    }
  });
}




/***/ }),

/***/ "./src/modalManager.js":
/*!*****************************!*\
  !*** ./src/modalManager.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addProjectModal": () => (/* binding */ addProjectModal),
/* harmony export */   "addTaskModal": () => (/* binding */ addTaskModal)
/* harmony export */ });
function addProjectModal() {
  // using templates
  const modal = document.querySelector("#projectModalTemplate");

  if ("content" in document.createElement("template")) {
    let modalClone = modal.content.cloneNode(true);
    mainContent.append(modalClone);
  }
}

function addTaskModal() {
  // using templates
  const modal = document.querySelector("#modalTemplate");

  if ("content" in document.createElement("template")) {
    let modalClone = modal.content.cloneNode(true);
    mainContent.append(modalClone);
  }
}




/***/ }),

/***/ "./src/task.js":
/*!*********************!*\
  !*** ./src/task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "home": () => (/* binding */ home),
/* harmony export */   "week": () => (/* binding */ week),
/* harmony export */   "projectList": () => (/* binding */ projectList),
/* harmony export */   "addProject": () => (/* binding */ addProject),
/* harmony export */   "findProject": () => (/* binding */ findProject),
/* harmony export */   "showProjectList": () => (/* binding */ showProjectList),
/* harmony export */   "deleteProject": () => (/* binding */ deleteProject)
/* harmony export */ });
/* harmony import */ var _displayController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displayController */ "./src/displayController.js");


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
  (0,_displayController__WEBPACK_IMPORTED_MODULE_0__.listProject)(projectName);
  // setLocal();
}

function deleteProject(elem) {
  const projectItem = elem.parentNode.parentNode.parentNode;
  const projectTitle =
    elem.parentNode.parentNode.parentNode.firstChild.innerText;
  const project = findProject(projectTitle);

  projectItem.remove();
  projectList.splice(projectList.indexOf(project), 1);
  console.log(projectList);
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




/***/ }),

/***/ "./src/taskDisplayer.js":
/*!******************************!*\
  !*** ./src/taskDisplayer.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadProject": () => (/* binding */ loadProject),
/* harmony export */   "loadTasks": () => (/* binding */ loadTasks),
/* harmony export */   "expandTask": () => (/* binding */ expandTask),
/* harmony export */   "removeExpandDivs": () => (/* binding */ removeExpandDivs)
/* harmony export */ });
/* harmony import */ var _modalManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modalManager */ "./src/modalManager.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ "./src/task.js");
/* harmony import */ var _taskManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./taskManager */ "./src/taskManager.js");




function loadTasks(project) {
  const mainContent = document.querySelector("#mainContent");
  mainContent.innerText = "";

  const taskDiv = document.createElement("div");
  taskDiv.classList.add("px-6", "column");

  const projectTitle = document.createElement("h3");
  projectTitle.innerText = project.projectName.toUpperCase();

  const taskList = document.createElement("ul");
  taskList.id = "taskList";

  // adding tasks of the project
  for (let task of project.viewTasks()) {
    const taskElement = document.createElement("li");
    taskElement.classList.add("mt-4", "taskItem");

    const titleSpan = document.createElement("span");
    titleSpan.innerText = task.title;
    titleSpan.classList.add("infoSpan");

    const delSpan = document.createElement("span");
    delSpan.classList.add("delTaskIcon");
    delSpan.innerHTML = '<i class="fas fa-trash-alt"></i>';

    taskElement.append(titleSpan, delSpan);
    taskList.append(taskElement);
  }

  taskDiv.append(projectTitle, taskList);

  // if no tasks are there, inform there are no tasks
  if (project.numTasks === 0) {
    const infoDiv = document.createElement("div");

    const warning = document.createElement("p");
    warning.innerText = "No tasks yet";

    infoDiv.append(warning);

    taskDiv.append(infoDiv);
  }

  // week only shows tasks that are scheduled this week, so restricting add previlage
  if (project.projectName !== "Week") {
    const newTaskBtn = document.createElement("button");
    newTaskBtn.innerText = "Add task";
    taskDiv.append(newTaskBtn);

    newTaskBtn.addEventListener("click", _modalManager__WEBPACK_IMPORTED_MODULE_0__.addTaskModal);
  }

  mainContent.append(taskDiv);
}

function expandTask(elem) {
  removeExpandDivs();

  const expandDiv = document.createElement("div");
  expandDiv.classList.add("expandDiv", "p-6");

  const description = document.createElement("p");
  const dueDate = document.createElement("p");
  const priority = document.createElement("p");
  const completed = document.createElement("p");

  const task = (0,_taskManager__WEBPACK_IMPORTED_MODULE_2__.findTask)(elem);

  description.innerText = `Description: ${task.description}`;
  dueDate.innerText = `Due date: ${task.dueDate}`;
  priority.innerText = `Priority: ${task.priority}`;
  completed.innerText = `Whether completed: ${task.completed}`;

  expandDiv.append(description, dueDate, priority, completed);
  elem.parentNode.insertBefore(expandDiv, elem.nextSibling);
}

function removeExpandDivs() {
  if (document.querySelector(".expandDiv")) {
    document.querySelector(".expandDiv").remove();
  }
}

function loadProject(key) {
  switch (key) {
    case "Home":
      loadTasks(_task__WEBPACK_IMPORTED_MODULE_1__.home);
      break;
    case "Week":
      loadTasks(_task__WEBPACK_IMPORTED_MODULE_1__.week);
      break;
    default:
      loadTasks((0,_task__WEBPACK_IMPORTED_MODULE_1__.findProject)(key));
      break;
  }
}




/***/ }),

/***/ "./src/taskManager.js":
/*!****************************!*\
  !*** ./src/taskManager.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addTask": () => (/* binding */ addTask),
/* harmony export */   "findTask": () => (/* binding */ findTask),
/* harmony export */   "deleteTask": () => (/* binding */ deleteTask),
/* harmony export */   "findCurrentProject": () => (/* binding */ findCurrentProject)
/* harmony export */ });
/* harmony import */ var _displayController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displayController */ "./src/displayController.js");
/* harmony import */ var _task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./task */ "./src/task.js");
/* harmony import */ var _taskDisplayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./taskDisplayer */ "./src/taskDisplayer.js");




function findCurrentProject() {
  return (0,_task__WEBPACK_IMPORTED_MODULE_1__.findProject)((0,_displayController__WEBPACK_IMPORTED_MODULE_0__.findActive)().innerText);
}

// extracting arguments and adding the task
function addTask() {
  const project = findCurrentProject();
  const form = document.querySelector("#modal form");

  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const args = [
    form[0].value || null,
    form[1].value || null,
    form[2].value || tomorrow,
    form[3].value || null,
    form[4].checked || null,
  ];

  project.addTask(...args);
  console.log(project);
}

function findTask(elem) {
  const project = findCurrentProject();

  return project.findTask(elem.innerText);
}

function deleteTask(elem) {
  const taskItem = elem.parentNode.parentNode.parentNode;
  const taskTitle = elem.parentNode.parentNode.parentNode.firstChild.innerText;
  const project = findCurrentProject();
  const task = project.findTask(taskTitle);

  taskItem.remove();
  (0,_taskDisplayer__WEBPACK_IMPORTED_MODULE_2__.removeExpandDivs)();
  project.deleteTask(task);
  console.log("Deleted");
}




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _displayController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displayController */ "./src/displayController.js");
/* harmony import */ var _formControls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./formControls */ "./src/formControls.js");
/* harmony import */ var _taskDisplayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./taskDisplayer */ "./src/taskDisplayer.js");
__webpack_require__(/*! ./styles.scss */ "./src/styles.scss");





// getFromLocal();
(0,_displayController__WEBPACK_IMPORTED_MODULE_0__.displayController)();
(0,_displayController__WEBPACK_IMPORTED_MODULE_0__.loadAllProjects)();
(0,_taskDisplayer__WEBPACK_IMPORTED_MODULE_2__.loadProject)((0,_displayController__WEBPACK_IMPORTED_MODULE_0__.findActive)().innerText);
(0,_formControls__WEBPACK_IMPORTED_MODULE_1__.addFormEvents)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOQSxtQkFBTyxDQUFDLHdDQUFlOztBQU1NO0FBQ2tCO0FBQ0Q7O0FBRTlDO0FBQ0EscUVBQWlCO0FBQ2pCLG1FQUFlO0FBQ2YsMkRBQVcsQ0FBQyw4REFBVTtBQUN0Qiw0REFBYSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9zdHlsZXMuc2Nzcz9jYjgwIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9kaXNwbGF5Q29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZm9ybUNvbnRyb2xzLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9tb2RhbE1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2suanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2tEaXNwbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3Rhc2tNYW5hZ2VyLmpzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90b2RvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCJpbXBvcnQgeyBkZWxldGVQcm9qZWN0LCBob21lLCBzaG93UHJvamVjdExpc3QgfSBmcm9tIFwiLi90YXNrXCI7XG5pbXBvcnQgeyBleHBhbmRUYXNrLCBsb2FkUHJvamVjdCB9IGZyb20gXCIuL3Rhc2tEaXNwbGF5ZXJcIjtcbmltcG9ydCB7IGRlbGV0ZVRhc2sgfSBmcm9tIFwiLi90YXNrTWFuYWdlclwiO1xuXG5mdW5jdGlvbiBkaXNwbGF5Q29udHJvbGxlcigpIHtcbiAgLy8gZm9yIG9wZW5pbmcvY2xvc2luZyBzaWRlYmFyIGFuZCByZWxhdGVkIHBhZGRpbmcgZm9yIHRhYmxldHNcbiAgc2lkZWJhclRvZ2dsZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGRpc3BsYXlUb2dnbGVyKTtcblxuICAvLyB0b2dnbGVzIGFjdGl2ZSBlbGVtZW50IG9mIHRoZSBzaWRlYmFyIG1lbnVcbiAgc2lkZWJhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZS50YXJnZXQubm9kZU5hbWUgPT09IFwiQVwiKSB7XG4gICAgICBjaGFuZ2VBY3RpdmUoZS50YXJnZXQpO1xuICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiaW5mb1NwYW5cIikpIHtcbiAgICAgIGNoYW5nZUFjdGl2ZShlLnRhcmdldC5wYXJlbnROb2RlKTtcbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0Lm5vZGVOYW1lID09PSBcInBhdGhcIikge1xuICAgICAgZGVsZXRlUHJvamVjdChlLnRhcmdldCk7XG4gICAgICBjaGFuZ2VBY3RpdmUoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tZW51LWxpc3QgYVwiKSk7XG4gICAgfVxuICB9KTtcblxuICBtYWluQ29udGVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZS50YXJnZXQubm9kZU5hbWUgPT09IFwiTElcIikge1xuICAgICAgZXhwYW5kVGFzayhlLnRhcmdldCk7XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJpbmZvU3BhblwiKSkge1xuICAgICAgZXhwYW5kVGFzayhlLnRhcmdldC5wYXJlbnROb2RlKTtcbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0Lm5vZGVOYW1lID09PSBcInBhdGhcIikge1xuICAgICAgZGVsZXRlVGFzayhlLnRhcmdldCk7XG4gICAgfVxuICB9KTtcbn1cblxuY29uc3Qgc2lkZWJhclRvZ2dsZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdmJhci1idXJnZXJcIik7XG5jb25zdCBzaWRlYmFyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaWRlYmFyXCIpO1xuXG5jb25zdCBtYWluQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbkNvbnRlbnRcIik7XG5cbi8vIGNvbnRyb2xzIHZpZXcgd2hlbiBzaWRlYmFyIGlzIHRvZ2dsZWQgaW4gdGFibGV0XG5mdW5jdGlvbiBkaXNwbGF5VG9nZ2xlcigpIHtcbiAgdGhpcy5jbGFzc0xpc3QudG9nZ2xlKFwiaXMtYWN0aXZlXCIpO1xuICBzaWRlYmFyLmNsYXNzTGlzdC50b2dnbGUoXCJpcy1oaWRkZW4tbW9iaWxlXCIpO1xuXG4gIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+IDc1MCkge1xuICAgIG1haW5Db250ZW50LmNsYXNzTGlzdC50b2dnbGUoXCJvZmZzZXRcIik7XG4gIH1cbn1cblxuLy8gZmluZHMgY3VycmVudCBhY3RpdmUgZWxlbWVudFxuZnVuY3Rpb24gZmluZEFjdGl2ZSgpIHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2lkZWJhciAuaXMtYWN0aXZlXCIpO1xufVxuXG4vLyBjaGVja3MgaWYgYWN0aXZlIGVsZW1lbnQgY2hhbmdlc1xubGV0IGxhc3RBY3RpdmUgPSBmaW5kQWN0aXZlKCkuaW5uZXJUZXh0O1xuZnVuY3Rpb24gaXNDaGFuZ2UoKSB7XG4gIGNvbnN0IGN1cnJlbnRBY3RpdmUgPSBmaW5kQWN0aXZlKCkuaW5uZXJUZXh0O1xuICBpZiAobGFzdEFjdGl2ZSAhPT0gY3VycmVudEFjdGl2ZSkge1xuICAgIGxvYWRQcm9qZWN0KGN1cnJlbnRBY3RpdmUpO1xuICAgIGxhc3RBY3RpdmUgPSBjdXJyZW50QWN0aXZlO1xuICB9XG59XG5cbi8vIGNoYW5nZSBhY3RpdmUgZWxlbWVudFxuZnVuY3Rpb24gY2hhbmdlQWN0aXZlKGVsZW0pIHtcbiAgaWYgKGZpbmRBY3RpdmUoKSAhPT0gbnVsbCkge1xuICAgIGNsZWFyQWN0aXZlKCk7XG4gIH1cbiAgZWxlbS5jbGFzc0xpc3QuYWRkKFwiaXMtYWN0aXZlXCIpO1xuICBpc0NoYW5nZSgpO1xufVxuXG5mdW5jdGlvbiBjbGVhckFjdGl2ZSgpIHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaWRlYmFyIC5pcy1hY3RpdmVcIikuY2xhc3NMaXN0LnJlbW92ZShcImlzLWFjdGl2ZVwiKTtcbn1cblxuZnVuY3Rpb24gbGlzdFByb2plY3QocHJvamVjdE5hbWUpIHtcbiAgY29uc3QgcHJvamVjdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RzXCIpO1xuXG4gIGNvbnN0IG5ld0xpc3RJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBjb25zdCBuZXdMaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIik7XG5cbiAgY29uc3QgaW5mb1NwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgaW5mb1NwYW4uY2xhc3NMaXN0LmFkZChcImluZm9TcGFuXCIpO1xuICBpbmZvU3Bhbi5pbm5lclRleHQgPSBwcm9qZWN0TmFtZTtcblxuICBjb25zdCBkZWxTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gIGRlbFNwYW4uY2xhc3NMaXN0LmFkZChcImRlbFRhc2tJY29uXCIpO1xuICBkZWxTcGFuLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS10cmFzaC1hbHRcIj48L2k+JztcblxuICBuZXdMaW5rLmFwcGVuZChpbmZvU3BhbiwgZGVsU3Bhbik7XG5cbiAgbmV3TGlzdEl0ZW0uYXBwZW5kKG5ld0xpbmspO1xuICBwcm9qZWN0cy5hcHBlbmQobmV3TGlzdEl0ZW0pO1xuXG4gIGNoYW5nZUFjdGl2ZShuZXdMaW5rKTtcbn1cblxuZnVuY3Rpb24gbG9hZEFsbFByb2plY3RzKCkge1xuICBjb25zdCBwcm9qZWN0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdHNcIik7XG5cbiAgZm9yIChsZXQgcHJvamVjdCBvZiBzaG93UHJvamVjdExpc3QoKSkge1xuICAgIGxpc3RQcm9qZWN0KHByb2plY3QucHJvamVjdE5hbWUpO1xuICB9XG59XG5cbmV4cG9ydCB7IGRpc3BsYXlDb250cm9sbGVyLCBmaW5kQWN0aXZlLCBsaXN0UHJvamVjdCwgbG9hZEFsbFByb2plY3RzIH07XG4iLCJpbXBvcnQgeyBmaW5kQWN0aXZlIH0gZnJvbSBcIi4vZGlzcGxheUNvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGFkZFByb2plY3RNb2RhbCB9IGZyb20gXCIuL21vZGFsTWFuYWdlclwiO1xuaW1wb3J0IHsgYWRkUHJvamVjdCwgZmluZFByb2plY3QgfSBmcm9tIFwiLi90YXNrXCI7XG5pbXBvcnQgeyBsb2FkVGFza3MgfSBmcm9tIFwiLi90YXNrRGlzcGxheWVyXCI7XG5pbXBvcnQgeyBhZGRUYXNrIH0gZnJvbSBcIi4vdGFza01hbmFnZXJcIjtcblxuZnVuY3Rpb24gcHJvY2Vzc1Byb2plY3QoZSkge1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdE1vZGFsIGZvcm1cIik7XG4gIGNvbnN0IHByb2plY3ROYW1lID0gZm9ybVswXS52YWx1ZS50cmltKCk7XG4gIGlmICghZmluZFByb2plY3QocHJvamVjdE5hbWUpKSB7XG4gICAgYWRkUHJvamVjdChwcm9qZWN0TmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0TW9kYWwgLmhlbHBcIikuY2xhc3NMaXN0LnJlbW92ZShcImlzLWhpZGRlblwiKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBwcm9jZXNzVGFzayhlKSB7XG4gIGUucHJldmVudERlZmF1bHQoKTtcblxuICBjb25zdCBwcm9qZWN0ID0gZmluZFByb2plY3QoZmluZEFjdGl2ZSgpLmlubmVyVGV4dCk7XG4gIGFkZFRhc2soKTtcbiAgbG9hZFRhc2tzKHByb2plY3QpO1xufVxuXG5mdW5jdGlvbiBhZGRGb3JtRXZlbnRzKCkge1xuICBtYWluQ29udGVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicHJvamVjdE1vZGFsQ2FuY2VsXCIpKSB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RNb2RhbFwiKS5yZW1vdmUoKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGlmIGFkZFByb2plY3RCdG4gaXMgY2xpY2tlZCBwcm9jZWVkIHRvIGFkZCBwcm9qZWN0XG4gIHNpZGViYXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGUudGFyZ2V0LmlkID09PSBcImFkZFByb2plY3RCdG5cIikge1xuICAgICAgYWRkUHJvamVjdE1vZGFsKCk7XG5cbiAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RNb2RhbCBmb3JtXCIpO1xuICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcHJvY2Vzc1Byb2plY3QoZSk7XG4gICAgICB9KTtcbiAgICAgIC8vIHJlbW92aW5nIHRvIHByZXZlbnQgZnJvbSBhZGRpbmcgbWFueSB0aW1lc1xuICAgICAgZm9ybS5yZW1vdmVFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIHByb2Nlc3NQcm9qZWN0KTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGlmIGZvcm0gc3VibWlzc2lvbiBidXR0b24gaXMgY2xpY2tlZCwgYWRkVGFzayBhbmQgbG9hZFxuICBtYWluQ29udGVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZS50YXJnZXQuaWQgPT09IFwibW9kYWxBZGRUYXNrXCIpIHtcbiAgICAgIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGFsIGZvcm1cIik7XG4gICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBwcm9jZXNzVGFzayhlKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyByZW1vdmluZyB0byBwcmV2ZW50IGZyb20gYWRkaW5nIG1hbnkgdGltZXNcbiAgICAgIGZvcm0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBwcm9jZXNzVGFzayk7XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbENhbmNlbFwiKSkge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb2RhbFwiKS5yZW1vdmUoKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgeyBhZGRGb3JtRXZlbnRzIH07XG4iLCJmdW5jdGlvbiBhZGRQcm9qZWN0TW9kYWwoKSB7XG4gIC8vIHVzaW5nIHRlbXBsYXRlc1xuICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdE1vZGFsVGVtcGxhdGVcIik7XG5cbiAgaWYgKFwiY29udGVudFwiIGluIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZW1wbGF0ZVwiKSkge1xuICAgIGxldCBtb2RhbENsb25lID0gbW9kYWwuY29udGVudC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgbWFpbkNvbnRlbnQuYXBwZW5kKG1vZGFsQ2xvbmUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFkZFRhc2tNb2RhbCgpIHtcbiAgLy8gdXNpbmcgdGVtcGxhdGVzXG4gIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb2RhbFRlbXBsYXRlXCIpO1xuXG4gIGlmIChcImNvbnRlbnRcIiBpbiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGVtcGxhdGVcIikpIHtcbiAgICBsZXQgbW9kYWxDbG9uZSA9IG1vZGFsLmNvbnRlbnQuY2xvbmVOb2RlKHRydWUpO1xuICAgIG1haW5Db250ZW50LmFwcGVuZChtb2RhbENsb25lKTtcbiAgfVxufVxuXG5leHBvcnQgeyBhZGRQcm9qZWN0TW9kYWwsIGFkZFRhc2tNb2RhbCB9O1xuIiwiaW1wb3J0IHsgbGlzdFByb2plY3QgfSBmcm9tIFwiLi9kaXNwbGF5Q29udHJvbGxlclwiO1xuXG5jbGFzcyBUYXNrIHtcbiAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgY29tcGxldGVkKSB7XG4gICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGUgPz8gbmV3IERhdGUoKTtcbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24gPz8gXCJObyBkZXRhaWxlZCBkZXNjcmlwdGlvblwiO1xuICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eSA/PyBcImxvd1wiO1xuICAgIHRoaXMuY29tcGxldGVkID0gY29tcGxldGVkID8/IGZhbHNlO1xuICB9XG59XG5cbmNsYXNzIFByb2plY3Qge1xuICAjdGFza0xpc3QgPSBbXTtcbiAgY29uc3RydWN0b3IocHJvamVjdE5hbWUpIHtcbiAgICB0aGlzLnByb2plY3ROYW1lID0gcHJvamVjdE5hbWU7XG4gIH1cblxuICBnZXQgbnVtVGFza3MoKSB7XG4gICAgcmV0dXJuIHRoaXMuI3Rhc2tMaXN0Lmxlbmd0aDtcbiAgfVxuXG4gIHZpZXdUYXNrcygpIHtcbiAgICByZXR1cm4gdGhpcy4jdGFza0xpc3Q7XG4gIH1cblxuICBhZGRUYXNrKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIGNvbXBsZXRlZCkge1xuICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBjb21wbGV0ZWQpO1xuICAgIHRoaXMuI3Rhc2tMaXN0LnB1c2gobmV3VGFzayk7XG4gICAgLy8gc2V0TG9jYWwoKTtcbiAgfVxuXG4gIGZpbmRUYXNrKHRhc2tUaXRsZSkge1xuICAgIGZvciAobGV0IHRhc2sgb2YgdGhpcy4jdGFza0xpc3QpIHtcbiAgICAgIGlmICh0YXNrLnRpdGxlID09PSB0YXNrVGl0bGUpIHtcbiAgICAgICAgcmV0dXJuIHRhc2s7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBcIk5vdCBmb3VuZFwiO1xuICB9XG5cbiAgZGVsZXRlVGFzayh0YXNrKSB7XG4gICAgdGhpcy4jdGFza0xpc3Quc3BsaWNlKHRoaXMuI3Rhc2tMaXN0LmluZGV4T2YodGFzayksIDEpO1xuICAgIHJldHVybiB0aGlzLiN0YXNrTGlzdDtcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChwcm9qZWN0TmFtZSk7XG4gIHByb2plY3RMaXN0LnB1c2gobmV3UHJvamVjdCk7XG4gIGxpc3RQcm9qZWN0KHByb2plY3ROYW1lKTtcbiAgLy8gc2V0TG9jYWwoKTtcbn1cblxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdChlbGVtKSB7XG4gIGNvbnN0IHByb2plY3RJdGVtID0gZWxlbS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgY29uc3QgcHJvamVjdFRpdGxlID1cbiAgICBlbGVtLnBhcmVudE5vZGUucGFyZW50Tm9kZS5wYXJlbnROb2RlLmZpcnN0Q2hpbGQuaW5uZXJUZXh0O1xuICBjb25zdCBwcm9qZWN0ID0gZmluZFByb2plY3QocHJvamVjdFRpdGxlKTtcblxuICBwcm9qZWN0SXRlbS5yZW1vdmUoKTtcbiAgcHJvamVjdExpc3Quc3BsaWNlKHByb2plY3RMaXN0LmluZGV4T2YocHJvamVjdCksIDEpO1xuICBjb25zb2xlLmxvZyhwcm9qZWN0TGlzdCk7XG59XG5cbmZ1bmN0aW9uIGZpbmRQcm9qZWN0KHByb2plY3ROYW1lKSB7XG4gIGlmIChwcm9qZWN0TmFtZSA9PT0gXCJIb21lXCIpIHtcbiAgICByZXR1cm4gaG9tZTtcbiAgfVxuXG4gIGZvciAobGV0IHByb2plY3Qgb2YgcHJvamVjdExpc3QpIHtcbiAgICBpZiAocHJvamVjdC5wcm9qZWN0TmFtZSA9PT0gcHJvamVjdE5hbWUpIHtcbiAgICAgIHJldHVybiBwcm9qZWN0O1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gc2hvd1Byb2plY3RMaXN0KCkge1xuICByZXR1cm4gcHJvamVjdExpc3Q7XG59XG5cbmxldCBob21lID0gbmV3IFByb2plY3QoXCJIb21lXCIpO1xuY29uc3Qgd2VlayA9IG5ldyBQcm9qZWN0KFwiV2Vla1wiKTtcblxubGV0IHByb2plY3RMaXN0ID0gW107XG5cbi8vIGFzIHN0b3JpbmcgYSBjbGFzcyByZXF1aXJlcyBzZXJpYWxpemF0aW9uLCB0aGlzIGlzIGxlZnQgdW5zYXZlZCB0byBsb2NhbFN0b3JhZ2UgZm9yIG5vd1xuXG4vLyBmdW5jdGlvbiBzZXRMb2NhbCgpIHtcbi8vICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoaG9tZSkpO1xuLy8gICBjb25zdCBsaG9tZSA9IEpTT04uc3RyaW5naWZ5KGhvbWUpO1xuLy8gICBjb25zdCBscHJvamVjdExpc3QgPSBKU09OLnN0cmluZ2lmeShwcm9qZWN0TGlzdCk7XG5cbi8vICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJob21lXCIsIGxob21lKTtcbi8vICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0TGlzdFwiLCBscHJvamVjdExpc3QpO1xuLy8gfVxuXG4vLyBmdW5jdGlvbiBnZXRGcm9tTG9jYWwoKSB7XG4vLyAgIGlmIChcbi8vICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcImhvbWVcIikgIT09IG51bGwgJiZcbi8vICAgICBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RMaXN0XCIpICE9PSBudWxsXG4vLyAgICkge1xuLy8gICAgIHByb2plY3RMaXN0ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0ocHJvamVjdExpc3QpO1xuLy8gICAgIGhvbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShob21lKTtcblxuLy8gICAgIHByb2plY3RMaXN0ID0gSlNPTi5wYXJzZShwcm9qZWN0TGlzdCk7XG4vLyAgICAgaG9tZSA9IEpTT04ucGFyc2UoaG9tZSk7XG4vLyAgIH1cbi8vIH1cblxuY29uc3QgZHRhc2tzID0gW1xuICBcIkRvIHRoZSBsYXVuZHJ5XCIsXG4gIFwiV2FsayB0aGUgZG9nc1wiLFxuICBcIkNsZWFuIHRoZSB3aW5kb3dzXCIsXG4gIFwiTWFrZSBmb29kIGZvciBUaW1cIixcbl07XG5cbmZvciAobGV0IGR0YXNrIG9mIGR0YXNrcykge1xuICBob21lLmFkZFRhc2soZHRhc2spO1xufVxuXG5leHBvcnQge1xuICBob21lLFxuICB3ZWVrLFxuICBwcm9qZWN0TGlzdCxcbiAgYWRkUHJvamVjdCxcbiAgZmluZFByb2plY3QsXG4gIHNob3dQcm9qZWN0TGlzdCxcbiAgZGVsZXRlUHJvamVjdCxcbn07XG4iLCJpbXBvcnQgeyBhZGRUYXNrTW9kYWwgfSBmcm9tIFwiLi9tb2RhbE1hbmFnZXJcIjtcbmltcG9ydCB7IGhvbWUsIHdlZWssIGZpbmRQcm9qZWN0IH0gZnJvbSBcIi4vdGFza1wiO1xuaW1wb3J0IHsgZmluZFRhc2sgfSBmcm9tIFwiLi90YXNrTWFuYWdlclwiO1xuXG5mdW5jdGlvbiBsb2FkVGFza3MocHJvamVjdCkge1xuICBjb25zdCBtYWluQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbkNvbnRlbnRcIik7XG4gIG1haW5Db250ZW50LmlubmVyVGV4dCA9IFwiXCI7XG5cbiAgY29uc3QgdGFza0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gIHRhc2tEaXYuY2xhc3NMaXN0LmFkZChcInB4LTZcIiwgXCJjb2x1bW5cIik7XG5cbiAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICBwcm9qZWN0VGl0bGUuaW5uZXJUZXh0ID0gcHJvamVjdC5wcm9qZWN0TmFtZS50b1VwcGVyQ2FzZSgpO1xuXG4gIGNvbnN0IHRhc2tMaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInVsXCIpO1xuICB0YXNrTGlzdC5pZCA9IFwidGFza0xpc3RcIjtcblxuICAvLyBhZGRpbmcgdGFza3Mgb2YgdGhlIHByb2plY3RcbiAgZm9yIChsZXQgdGFzayBvZiBwcm9qZWN0LnZpZXdUYXNrcygpKSB7XG4gICAgY29uc3QgdGFza0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gICAgdGFza0VsZW1lbnQuY2xhc3NMaXN0LmFkZChcIm10LTRcIiwgXCJ0YXNrSXRlbVwiKTtcblxuICAgIGNvbnN0IHRpdGxlU3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgIHRpdGxlU3Bhbi5pbm5lclRleHQgPSB0YXNrLnRpdGxlO1xuICAgIHRpdGxlU3Bhbi5jbGFzc0xpc3QuYWRkKFwiaW5mb1NwYW5cIik7XG5cbiAgICBjb25zdCBkZWxTcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgZGVsU3Bhbi5jbGFzc0xpc3QuYWRkKFwiZGVsVGFza0ljb25cIik7XG4gICAgZGVsU3Bhbi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtdHJhc2gtYWx0XCI+PC9pPic7XG5cbiAgICB0YXNrRWxlbWVudC5hcHBlbmQodGl0bGVTcGFuLCBkZWxTcGFuKTtcbiAgICB0YXNrTGlzdC5hcHBlbmQodGFza0VsZW1lbnQpO1xuICB9XG5cbiAgdGFza0Rpdi5hcHBlbmQocHJvamVjdFRpdGxlLCB0YXNrTGlzdCk7XG5cbiAgLy8gaWYgbm8gdGFza3MgYXJlIHRoZXJlLCBpbmZvcm0gdGhlcmUgYXJlIG5vIHRhc2tzXG4gIGlmIChwcm9qZWN0Lm51bVRhc2tzID09PSAwKSB7XG4gICAgY29uc3QgaW5mb0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cbiAgICBjb25zdCB3YXJuaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gICAgd2FybmluZy5pbm5lclRleHQgPSBcIk5vIHRhc2tzIHlldFwiO1xuXG4gICAgaW5mb0Rpdi5hcHBlbmQod2FybmluZyk7XG5cbiAgICB0YXNrRGl2LmFwcGVuZChpbmZvRGl2KTtcbiAgfVxuXG4gIC8vIHdlZWsgb25seSBzaG93cyB0YXNrcyB0aGF0IGFyZSBzY2hlZHVsZWQgdGhpcyB3ZWVrLCBzbyByZXN0cmljdGluZyBhZGQgcHJldmlsYWdlXG4gIGlmIChwcm9qZWN0LnByb2plY3ROYW1lICE9PSBcIldlZWtcIikge1xuICAgIGNvbnN0IG5ld1Rhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuICAgIG5ld1Rhc2tCdG4uaW5uZXJUZXh0ID0gXCJBZGQgdGFza1wiO1xuICAgIHRhc2tEaXYuYXBwZW5kKG5ld1Rhc2tCdG4pO1xuXG4gICAgbmV3VGFza0J0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgYWRkVGFza01vZGFsKTtcbiAgfVxuXG4gIG1haW5Db250ZW50LmFwcGVuZCh0YXNrRGl2KTtcbn1cblxuZnVuY3Rpb24gZXhwYW5kVGFzayhlbGVtKSB7XG4gIHJlbW92ZUV4cGFuZERpdnMoKTtcblxuICBjb25zdCBleHBhbmREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICBleHBhbmREaXYuY2xhc3NMaXN0LmFkZChcImV4cGFuZERpdlwiLCBcInAtNlwiKTtcblxuICBjb25zdCBkZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuICBjb25zdCBkdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG4gIGNvbnN0IGNvbXBsZXRlZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXG4gIGNvbnN0IHRhc2sgPSBmaW5kVGFzayhlbGVtKTtcblxuICBkZXNjcmlwdGlvbi5pbm5lclRleHQgPSBgRGVzY3JpcHRpb246ICR7dGFzay5kZXNjcmlwdGlvbn1gO1xuICBkdWVEYXRlLmlubmVyVGV4dCA9IGBEdWUgZGF0ZTogJHt0YXNrLmR1ZURhdGV9YDtcbiAgcHJpb3JpdHkuaW5uZXJUZXh0ID0gYFByaW9yaXR5OiAke3Rhc2sucHJpb3JpdHl9YDtcbiAgY29tcGxldGVkLmlubmVyVGV4dCA9IGBXaGV0aGVyIGNvbXBsZXRlZDogJHt0YXNrLmNvbXBsZXRlZH1gO1xuXG4gIGV4cGFuZERpdi5hcHBlbmQoZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBjb21wbGV0ZWQpO1xuICBlbGVtLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGV4cGFuZERpdiwgZWxlbS5uZXh0U2libGluZyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUV4cGFuZERpdnMoKSB7XG4gIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmV4cGFuZERpdlwiKSkge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZXhwYW5kRGl2XCIpLnJlbW92ZSgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGxvYWRQcm9qZWN0KGtleSkge1xuICBzd2l0Y2ggKGtleSkge1xuICAgIGNhc2UgXCJIb21lXCI6XG4gICAgICBsb2FkVGFza3MoaG9tZSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiV2Vla1wiOlxuICAgICAgbG9hZFRhc2tzKHdlZWspO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGxvYWRUYXNrcyhmaW5kUHJvamVjdChrZXkpKTtcbiAgICAgIGJyZWFrO1xuICB9XG59XG5cbmV4cG9ydCB7IGxvYWRQcm9qZWN0LCBsb2FkVGFza3MsIGV4cGFuZFRhc2ssIHJlbW92ZUV4cGFuZERpdnMgfTtcbiIsImltcG9ydCB7IGZpbmRBY3RpdmUgfSBmcm9tIFwiLi9kaXNwbGF5Q29udHJvbGxlclwiO1xuaW1wb3J0IHsgZmluZFByb2plY3QgfSBmcm9tIFwiLi90YXNrXCI7XG5pbXBvcnQgeyByZW1vdmVFeHBhbmREaXZzIH0gZnJvbSBcIi4vdGFza0Rpc3BsYXllclwiO1xuXG5mdW5jdGlvbiBmaW5kQ3VycmVudFByb2plY3QoKSB7XG4gIHJldHVybiBmaW5kUHJvamVjdChmaW5kQWN0aXZlKCkuaW5uZXJUZXh0KTtcbn1cblxuLy8gZXh0cmFjdGluZyBhcmd1bWVudHMgYW5kIGFkZGluZyB0aGUgdGFza1xuZnVuY3Rpb24gYWRkVGFzaygpIHtcbiAgY29uc3QgcHJvamVjdCA9IGZpbmRDdXJyZW50UHJvamVjdCgpO1xuICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtb2RhbCBmb3JtXCIpO1xuXG4gIGxldCB0b21vcnJvdyA9IG5ldyBEYXRlKCk7XG4gIHRvbW9ycm93LnNldERhdGUodG9tb3Jyb3cuZ2V0RGF0ZSgpICsgMSk7XG5cbiAgY29uc3QgYXJncyA9IFtcbiAgICBmb3JtWzBdLnZhbHVlIHx8IG51bGwsXG4gICAgZm9ybVsxXS52YWx1ZSB8fCBudWxsLFxuICAgIGZvcm1bMl0udmFsdWUgfHwgdG9tb3Jyb3csXG4gICAgZm9ybVszXS52YWx1ZSB8fCBudWxsLFxuICAgIGZvcm1bNF0uY2hlY2tlZCB8fCBudWxsLFxuICBdO1xuXG4gIHByb2plY3QuYWRkVGFzayguLi5hcmdzKTtcbiAgY29uc29sZS5sb2cocHJvamVjdCk7XG59XG5cbmZ1bmN0aW9uIGZpbmRUYXNrKGVsZW0pIHtcbiAgY29uc3QgcHJvamVjdCA9IGZpbmRDdXJyZW50UHJvamVjdCgpO1xuXG4gIHJldHVybiBwcm9qZWN0LmZpbmRUYXNrKGVsZW0uaW5uZXJUZXh0KTtcbn1cblxuZnVuY3Rpb24gZGVsZXRlVGFzayhlbGVtKSB7XG4gIGNvbnN0IHRhc2tJdGVtID0gZWxlbS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZTtcbiAgY29uc3QgdGFza1RpdGxlID0gZWxlbS5wYXJlbnROb2RlLnBhcmVudE5vZGUucGFyZW50Tm9kZS5maXJzdENoaWxkLmlubmVyVGV4dDtcbiAgY29uc3QgcHJvamVjdCA9IGZpbmRDdXJyZW50UHJvamVjdCgpO1xuICBjb25zdCB0YXNrID0gcHJvamVjdC5maW5kVGFzayh0YXNrVGl0bGUpO1xuXG4gIHRhc2tJdGVtLnJlbW92ZSgpO1xuICByZW1vdmVFeHBhbmREaXZzKCk7XG4gIHByb2plY3QuZGVsZXRlVGFzayh0YXNrKTtcbiAgY29uc29sZS5sb2coXCJEZWxldGVkXCIpO1xufVxuXG5leHBvcnQgeyBhZGRUYXNrLCBmaW5kVGFzaywgZGVsZXRlVGFzaywgZmluZEN1cnJlbnRQcm9qZWN0IH07XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInJlcXVpcmUoXCIuL3N0eWxlcy5zY3NzXCIpO1xuXG5pbXBvcnQge1xuICBkaXNwbGF5Q29udHJvbGxlcixcbiAgZmluZEFjdGl2ZSxcbiAgbG9hZEFsbFByb2plY3RzLFxufSBmcm9tIFwiLi9kaXNwbGF5Q29udHJvbGxlclwiO1xuaW1wb3J0IHsgYWRkRm9ybUV2ZW50cyB9IGZyb20gXCIuL2Zvcm1Db250cm9sc1wiO1xuaW1wb3J0IHsgbG9hZFByb2plY3QgfSBmcm9tIFwiLi90YXNrRGlzcGxheWVyXCI7XG5cbi8vIGdldEZyb21Mb2NhbCgpO1xuZGlzcGxheUNvbnRyb2xsZXIoKTtcbmxvYWRBbGxQcm9qZWN0cygpO1xubG9hZFByb2plY3QoZmluZEFjdGl2ZSgpLmlubmVyVGV4dCk7XG5hZGRGb3JtRXZlbnRzKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=