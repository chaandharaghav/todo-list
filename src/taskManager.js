import { findActive } from "./displayController";
import { findProject } from "./task";

function findCurrentProject() {
  return findProject(findActive().innerText);
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

export { addTask, findTask, findCurrentProject };
