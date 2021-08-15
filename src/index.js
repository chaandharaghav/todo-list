require("./styles.scss");

import { displayController, findActive } from "./displayController";
import { addProject, showProjectList } from "./task";
import { loadProject } from "./taskDisplayer";

displayController();
loadProject(findActive().innerText);
addProject("Trying");
