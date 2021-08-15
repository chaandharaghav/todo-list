import { home, all, projectList } from "./task";

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

function findProject(key) {
  switch (key) {
    case "home":
      loadTasks(home);
      break;
    case "all":
      if (projectList.length === 0) {
        loadTasks(home);
      } else {
        loadTasks(all);
      }
      break;
    case "week":
      loadTasks(week);
      break;
    default:
      loadTasks(getProject(key));
      break;
  }
}

function getProject(key) {
  projectList.find((project) => project.projectName === key);
}

export { findProject };
