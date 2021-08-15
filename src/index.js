require("./styles.scss");

import { displayController, findActive } from "./displayController";
import { findProject } from "./taskDisplayer";

displayController();
findProject(findActive().innerText.toLowerCase());
