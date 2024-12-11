import "./styles.css";
import { setData, getData, clearData } from "./storage.js";
import { getProjects, printProjects, getCurrentProject, setCurrentProject, getCurrentTodo, setCurrentTodo, getCurrentCheckItem, setCurrentCheckItem, creator, remover, hasTitle, hasNotes, hasPriority, hasDueDate, hasCheck } from "./project.js";
import { loadData, save } from "./project-controller.js";
import { loadSidebar, loadMain } from "./screen-controller.js"

clearData();
loadData();
save();
loadSidebar();
let projects = getProjects();
loadMain( projects[0] );
// loadMain();
printProjects();