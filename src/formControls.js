import { findActive } from "./displayController";
import { addProjectModal } from "./modalManager";
import { addProject, findProject } from "./task";
import { loadTasks } from "./taskDisplayer";
import { addTask } from "./taskManager";

function processProject(e) {
  e.preventDefault();

  const form = document.querySelector("#projectModal form");
  const projectName = form[0].value.trim();
  if (!findProject(projectName)) {
    addProject(projectName);
  } else {
    document.querySelector("#projectModal .help").classList.remove("is-hidden");
  }
}

function processTask(e) {
  e.preventDefault();

  const project = findProject(findActive().innerText);
  addTask();
  loadTasks(project);
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
      addProjectModal();

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

export { addFormEvents };
