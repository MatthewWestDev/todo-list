import "./styles.css";

import { getProjects, printProjects, Project, Todo, CheckItem } from "./project.js";

let projects = getProjects();
let currentProject;
let currentTodo;
let currentCheckItem;

const creator = ( function () {
    const project = ( title, notes, dueDate, priority ) => {
        const newProject = new Project( title, notes, dueDate, priority );
        projects.push( newProject );
        currentProject = newProject;
    }
    
    const todo = ( title ) => {
        const newTodo = new Todo( title );
        currentProject.setTodo( newTodo );
        currentTodo = newTodo;
    }
    
    const checkItem = ( title ) => {
        const newCheckItem = new CheckItem( title );
        currentTodo.setCheckItem( newCheckItem );
        currentCheckItem = newCheckItem;
    }

    return { project, todo, checkItem };
})();


// setup local storage




// const defaultProject0 = creator.project( "Today", "Just a quick note about the focus", "due soon", 4 );
// const defaultProject1 = creator.project( "Another Day", "Just a quick note about the focus", "due soon", 6 );
// getProjects();

// currentProject.setPriority( 1 );
// currentProject = projects[0];
// console.log( currentProject );


// creator.todo( "Brainstorm To-do List" );
// creator.todo( "Stop being negative when your code doesn't work" );
// creator.todo( "Smile Damnit", "soon" );
// currentTodo.setPriority( 2 );
// currentTodo.setDueDate( "later" );
// currentTodo.setCheck( true );
// currentProject.printTodos();
// currentProject.setNotes( "Oh now this is really getting complicated and it's scary that some of it makes sense. Try not to lose your marbles..." );
// currentProject.setCheck( true );
// creator.checkItem( "first give it some thought" );
// console.log( currentCheckItem );
// currentCheckItem.setCheck( true );
// creator.checkItem( "Second, think again..." );
// currentCheckItem.setPriority( 2 );
// creator.checkItem( "Third, eat some cake..." );
// currentTodo.printChecklist();

// printProjects();
