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

  for (let task of project.viewTasks()) {
    const taskElement = document.createElement("li");
    taskElement.innerText = task.title;

    taskList.append(taskElement);
  }

  taskDiv.append(projectTitle, taskList);

  // if no tasks are there, ask to add task
  if (project.numTasks === 0) {
    const infoDiv = document.createElement("div");

    const warning = document.createElement("p");
    warning.innerText = "No tasks yet";

    infoDiv.append(warning);

    // week only shows tasks that are scheduled this week, so restricting add previlage
    if (project.projectName !== "Week") {
      const newTaskBtn = document.createElement("button");
      newTaskBtn.innerText = "Add task";
      infoDiv.append(newTaskBtn);

      newTaskBtn.addEventListener("click", askForTask);
    }

    taskDiv.append(infoDiv);
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

  mainContent.addEventListener("click", function (e) {
    if (e.target.id === "modalAddTask") {
      console.log("Task added successfully");
    } else if (e.target.classList.contains("modalCancel")) {
      // to prevent remove from being invoked if the element doesnt exist
      if (document.querySelector("#mainContent .modal") != undefined) {
        document.querySelector("#mainContent .modal").remove();
      }
    }
  });
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
