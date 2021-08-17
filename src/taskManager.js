import { findActive } from "./displayController";
import { findProject } from "./task";
import { removeExpandDivs } from "./taskDisplayer";

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

function deleteTask(elem) {
  const taskItem = elem.parentNode.parentNode.parentNode;
  const taskTitle = elem.parentNode.parentNode.parentNode.firstChild.innerText;
  const project = findCurrentProject();
  const task = project.findTask(taskTitle);

  taskItem.remove();
  removeExpandDivs();
  project.deleteTask(task);
  console.log("Deleted");
}

export { addTask, findTask, deleteTask, findCurrentProject };
