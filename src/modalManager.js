function addProjectModal() {
  // using templates
  const modal = document.querySelector("#projectModalTemplate");

  if ("content" in document.createElement("template")) {
    let modalClone = modal.content.cloneNode(true);
    mainContent.append(modalClone);
  }
}

function addTaskModal() {
  // using templates
  const modal = document.querySelector("#modalTemplate");

  if ("content" in document.createElement("template")) {
    let modalClone = modal.content.cloneNode(true);
    mainContent.append(modalClone);
  }
}

export { addProjectModal, addTaskModal };
