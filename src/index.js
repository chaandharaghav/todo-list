require("./styles.scss");

import { displayController, findActive } from "./displayController";
// import home from "./home.js";

displayController();

console.log(findActive().innerText);
