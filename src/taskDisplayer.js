import { home, week, findProject } from "./task";

const mainContent = document.querySelector("#mainContent");

function loadTasks(project) {
  mainContent.innerText = "";

  const taskDiv = document.createElement("div");
  taskDiv.classList.add("px-6", "column");

  const projectTitle = document.createElement("h3");
  projectTitle.innerText = project.projectName.toUpperCase();

  const taskList = document.createElement("ul");
  taskList.id = "taskList";

  for (let task of project.viewTasks()) {
    const taskElement = document.createElement("li");
    taskElement.innerText = task.title;

    taskList.append(taskElement);
  }

  taskDiv.append(projectTitle, taskList);
  mainContent.append(taskDiv);
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
