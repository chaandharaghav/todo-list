require("./styles.scss");

const sidebarToggler = document.querySelector(".navbar-burger");
const sidebar = document.querySelector("#sidebar");

console.log(sidebarToggler, sidebar);

sidebarToggler.addEventListener("click", function () {
  this.classList.toggle("is-active");
  sidebar.classList.toggle("is-hidden-mobile");
});
