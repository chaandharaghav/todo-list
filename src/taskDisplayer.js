import { findActive } from "./displayController";
import { home, week, findProject } from "./task";

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
    taskElement.innerText = task.title;

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
  if (project.projectName !== "Week" && project.projectName !== "Home") {
    const newTaskBtn = document.createElement("button");
    newTaskBtn.innerText = "Add task";
    taskDiv.append(newTaskBtn);

    newTaskBtn.addEventListener("click", askForTask);
  }

  mainContent.append(taskDiv);
}

function askForTask() {
  // using templates
  const modal = document.querySelector("#modalTemplate");

  if ("content" in document.createElement("template")) {
    let modalClone = modal.content.cloneNode(true);
    mainContent.append(modalClone);
  }
}

// if form submission button is clicked, addTask and load
mainContent.addEventListener("click", function (e) {
  if (e.target.id === "modalAddTask") {
    const project = findProject(findActive().innerText);

    const form = document.querySelector("#modal form");
    form.addEventListener(
      "submit",
      function (e) {
        e.preventDefault();
        addTask();
        loadTasks(project);
      },
      { once: true }
    );
  } else if (e.target.classList.contains("modalCancel")) {
    document.querySelector("#modal").remove();
  }
});

// extracting arguments and adding the task
function addTask() {
  const project = findProject(findActive().innerText);
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

export { loadProject };
