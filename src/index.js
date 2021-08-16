require("./styles.scss");

import { displayController, findActive } from "./displayController";
import { addFormEvents } from "./formControls";
import { home } from "./task";
import { loadProject } from "./taskDisplayer";

displayController();
loadProject(findActive().innerText);
addFormEvents();

home.findTask({ description: "Do the laundry", priority: "low" });
