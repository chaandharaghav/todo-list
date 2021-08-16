import { addTaskModal } from "./modalManager";
import { home, week, findProject } from "./task";
import { findTask } from "./taskManager";

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

    newTaskBtn.addEventListener("click", addTaskModal);
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

  const task = findTask(elem);

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
      loadTasks(home);
      break;
    case "Week":
      loadTasks(week);
      break;
    default:
      loadTasks(findProject(key));
      break;
  }
}

export { loadProject, loadTasks, expandTask, removeExpandDivs };
