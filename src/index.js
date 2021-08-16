require("./styles.scss");

import { displayController, findActive } from "./displayController";
import { home } from "./task";
import { loadProject } from "./taskDisplayer";

displayController();
loadProject(findActive().innerText);

home.findTask({ description: "Do the laundry", priority: "low" });
