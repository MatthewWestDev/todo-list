import "./styles.css";
import { setData, getData, clearData } from "./storage.js";
import { getProjects, printProjects, create } from "./project.js";

function projectController() {

    let currentProject;
    let currentTodo;
    let currentCheckItem;

    let projects = getProjects(); 

    let storedData = getData();
    if ( storedData ) {
            projects.push( storedData );
    } else {
        create.project( "Today", "Just a quick note about the focus for today", "due soon", 1 );
        currentProject = projects[0];
        create.todo( "Start with a positive attitude", currentProject );
        create.todo( "Take breaks to keep balanced", currentProject );
        create.todo( "Learn how to code", currentProject );
        currentTodo = currentProject.todos[2];
        create.checkItem( "Sign up with Odin", currentTodo )
        create.checkItem( "Schedule time to learn", currentTodo );
        create.checkItem( "Buy cake", currentTodo );
        create.checkItem( "Break for cake", currentTodo );
        currentCheckItem = currentTodo.checklist[3];
        setData( projects );
    }


    // refactor projects JS for Edit factory to handle function calls

    currentProject.setTitle( "Today's Projects" );


    

    

    


    // write a function that gets the current project, current todo and current check item when an item is clicked or when a project is created
    
    return { create, getProjects: projects.getProjects  };
}
const projX = projectController();
printProjects();