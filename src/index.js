import "./styles.css";
import { setData, getData, clearData } from "./storage.js";
import { getProjects, printProjects, creator, remover, hasTitle, hasNotes, hasPriority, hasDueDate, hasCheck } from "./project.js";
import { loadData, save } from "./project-controller.js";

// clearData();
loadData();
save();

function screenController() {
    
    let projects = getProjects(); 

    let currentProject;
    let currentTodo;
    let currentCheckItem;

    const body = document.querySelector( "body" );

    const sidebar = document.createElement( "div" );
    sidebar.classList.add( "sidebar" );
    const projectList = document.createElement( "ul" );
    projectList.classList.add( "project-list" );
    
    for ( const projectItem of projects ) {
        console.log(projectItem);
        const li = document.createElement( "li" );
        li.setAttribute("data-id", `${ projectItem.id }` );
        li.textContent = `${ projectItem.title }`;

        projectList.appendChild( li );
    }
    
    sidebar.appendChild( projectList );
    const main = document.createElement( "div" );
    main.classList.add( "main" );

    body.appendChild( sidebar );
    body.appendChild( main );



    
        // build sidebar
            // list project titles with click to build main
        // build main
            // list the project title
            // list todos
            // list checklists under each todo
    // build modals for new project and new todo and new checkItem    

}
screenController();