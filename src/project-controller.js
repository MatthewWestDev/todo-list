import { setData, getData } from "./storage.js";
import { getProjects, creator, printProjects } from "./project.js";

let projects = getProjects(); 
let currentProject;
let currentTodo;
let currentCheckItem;

function loadData() {

    let storedData = getData();
    console.log( storedData );
    if ( storedData && storedData.length !== 0 ) {
        let projectIndex = 0;
        for ( let projectKey in storedData ) {

            const rawProject = storedData[projectKey];
            const newProject = creator.project( rawProject.title, rawProject.notes, rawProject.dueDate, rawProject.priority, rawProject.check );
            currentProject = projects[ projectIndex ];
            let todoIndex = 0;
            for ( let todoKey in rawProject.todos) {
                const rawTodo = rawProject.todos[todoKey];
                const newTodo = creator.todo( rawTodo.title, currentProject, rawTodo.dueDate, rawTodo.priority, rawTodo.check );
                currentTodo = currentProject.todos[ todoIndex ];
                for ( let checkItemKey in rawTodo.checklist) {
                    const rawCheckItem = rawTodo.checklist[checkItemKey];
                    const newCheckItem = creator.checkItem( rawCheckItem.title, currentTodo, rawCheckItem.dueDate, rawCheckItem.priority, rawCheckItem.check );
                    
                }
                todoIndex++;
            }
            projectIndex++;

        } 

    } else {
        console.log("creating default project");
        creator.project( "Today", "Just a quick note about the focus for today" );
        currentProject = projects[0];
        creator.todo( "Start with a positive attitude", currentProject );
        creator.todo( "Take breaks to keep balanced", currentProject );
        creator.todo( "Learn how to code", currentProject );
        currentTodo = currentProject.todos[2];
        creator.checkItem( "Sign up with Odin", currentTodo )
        creator.checkItem( "Schedule time to learn", currentTodo );
        creator.checkItem( "Buy cake", currentTodo );
        creator.checkItem( "Break for cake", currentTodo );
        currentCheckItem = currentTodo.checklist[3];
        setData( projects );
    }
}

const save = () => {
    setData( projects );
    printProjects();
}


/* currentProject = projects[0];
currentProject.updateTitle( "Today's Projects" );

currentTodo.updatePriority( 9 );
save();
currentTodo.printChecklist();

currentTodo.deleteCheckItem( 1 );
currentTodo.printChecklist();

printProjects();
remover.project( 0 );

save(); */

export { loadData, save };