require("./styles.scss");

import { displayController, findActive } from "./displayController";
import { addProject } from "./task";
import { loadProject } from "./taskDisplayer";

displayController();
loadProject(findActive().innerText);
addProject("Trying");
