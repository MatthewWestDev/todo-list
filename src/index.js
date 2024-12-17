import "./styles.css";
import { clearData } from "./storage.js";
import { getProjects, printProjects } from "./project.js";
import { loadData, save } from "./project-controller.js";
import { loadSidebar, loadMain, setCurrentProject } from "./screen-controller.js"

clearData();
loadData();
save();
loadSidebar();
let projects = getProjects();
setCurrentProject( 0 );