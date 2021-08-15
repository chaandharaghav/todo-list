function displayController() {
  // for opening/closing sidebar and related padding for tablets
  sidebarToggler.addEventListener("click", displayToggler);

  // toggles active element of the sidebar menu
  sidebarLinks.forEach((link) => link.addEventListener("click", changeActive));
}

const sidebarToggler = document.querySelector(".navbar-burger");
const sidebar = document.querySelector("#sidebar");
const sidebarLinks = document.querySelectorAll("#sidebar a");

const mainContent = document.querySelector("#mainContent");

// controls view when sidebar is toggled in tablet
function displayToggler() {
  this.classList.toggle("is-active");
  sidebar.classList.toggle("is-hidden-mobile");

  if (window.innerWidth > 750) {
    mainContent.classList.toggle("offset");
  }
}

// finds current active element
function findActive() {
  for (let link of sidebarLinks) {
    if (link.classList.contains("is-active")) {
      return link;
    }
  }
}

// checks if active element changes
let lastActive = findActive().innerText.toLowerCase();
function isChange() {
  const currentActive = findActive().innerText.toLowerCase();
  if (lastActive !== currentActive) {
    console.log(currentActive);
    lastActive = currentActive;
  }
}

// change active element
function changeActive() {
  clearActive();
  this.classList.add("is-active");
  isChange();
}

function clearActive() {
  sidebarLinks.forEach((link) => link.classList.remove("is-active"));
}

export { displayController };
