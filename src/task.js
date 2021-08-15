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

  viewTasks() {
    return this.#taskList;
  }

  addTask(title, description, dueDate, priority, completed) {
    const newTask = new Task(title, description, dueDate, priority, completed);
    this.#taskList.push(newTask);
  }
}

const home = new Project("home");
const all = new Project("all");

const projectList = [];

function findAllTasks() {
  for (let project of projectList) {
    for (let task of project.viewTasks()) {
      all.addTask(task);
    }
  }
}
findAllTasks();

const dtasks = [
  "Do the laundry",
  "Walk the dogs",
  "Clean the windows",
  "Make food for Tim",
];

for (let dtask of dtasks) {
  home.addTask(dtask);
}

export { home, all, projectList };
