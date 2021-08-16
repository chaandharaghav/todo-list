require("./styles.scss");

import {
  displayController,
  findActive,
  loadAllProjects,
} from "./displayController";
import { addFormEvents } from "./formControls";
import { loadProject } from "./taskDisplayer";

// getFromLocal();
displayController();
loadAllProjects();
loadProject(findActive().innerText);
addFormEvents();
