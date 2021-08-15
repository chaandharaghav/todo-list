import { home } from "./task";

const mainContent = document.querySelector("#mainContent");
mainContent.innerText = "";

function loadTasks() {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("px-6", "column");

  const taskList = document.createElement("ul");
  taskList.id = "taskList";

  for (let task of home.viewTasks()) {
    const taskElement = document.createElement("li");
    taskElement.innerText = task.title;

    taskList.append(taskElement);
  }

  taskDiv.append(taskList);
  mainContent.append(taskDiv);
}

export { loadTasks };
