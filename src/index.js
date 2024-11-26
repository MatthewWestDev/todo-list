import "./styles.css";

// import { getProjects, createProject, printProjects, hasTodo } from "./project.js";

// temporarily building in index instead of separate files

const projectsArray = [];
let currentProject;
let currentTodo;
let currentCheckItem;

   const getProjects = () => projectsArray;


    const printProjects = () => {
        console.log( projectsArray );
    }

const hasNotes = {
    setNotes( note ) {
        this.notes = note;
        console.log( `${ this.title }'s notes are: ${ this.notes }`);
    }
}

const hasDueDate = {
    setDueDate( date ) {
        this.dueDate = date;
        console.log( `${ this.title } is due ${ this.dueDate }`);
    }
}

const hasPriority = {
    setPriority( number ) {
        this.priority = number;
        console.log( `${ this.title }'s priority is ${ this.priority }`);
    }
}

const hasTodo = {
    setTodo( title ) {
        this.todo = title;
        this.todos.push ( title );
        this.checked = false;
        // toDo.id = this.todos.indexOf( title );
    }
}

const hasChecked = {
    setChecked( boolean ) {
        this.checked = boolean;
        console.log( `${ this.title } is checked: ${ this.checked }`);
    }
}

const hasTodoList = {
    printTodos() {
        console.log ( this.todos );
    }
} 

const hasCheckItem = {
    setCheckItem( title ) {
        this.checkItem = title;
        this.checklist.push ( title );
        this.checked = false;
    }
}

const hasChecklist = {
    printChecklist() {
        console.log ( this.checklist );
    }
} 


class Project {    
    constructor( text ) {
        this.title = text;
        this.todos = [];
    }
}

const createProject = ( title, notes, dueDate, priority ) => {
    const newProject = new Project( title, notes, dueDate, priority );
    projectsArray.push( newProject );
    currentProject = newProject;
    console.log( currentProject );
}

Object.assign( Project.prototype, hasNotes );
Object.assign( Project.prototype, hasDueDate );
Object.assign( Project.prototype, hasPriority );
Object.assign( Project.prototype, hasTodo );
Object.assign( Project.prototype, hasTodoList );
Object.assign( Project.prototype, hasChecked );

class Todo {
    constructor( text ) {
        this.title = text;
        this.checklist = [];

    }
}

const createTodo = ( title ) => {
    const newTodo = new Todo( title );
    currentProject.setTodo( newTodo );
    currentTodo = newTodo;
}

Object.assign( Todo.prototype, hasDueDate );
Object.assign( Todo.prototype, hasPriority );
Object.assign( Todo.prototype, hasChecked );
Object.assign( Todo.prototype, hasCheckItem );
Object.assign( Todo.prototype, hasChecklist );



class CheckItem {
    constructor( text ) {
        this.title = text;
    }
}

const createCheckItem = ( title ) => {
    const newCheckItem = new CheckItem( title );
    currentTodo.setCheckItem( newCheckItem );
    currentCheckItem = newCheckItem;
}

Object.assign( CheckItem.prototype, hasDueDate );
Object.assign( CheckItem.prototype, hasPriority );
Object.assign( CheckItem.prototype, hasChecked );



const defaultProject0 = createProject( "Today", "Just a quick note about the focus", "due soon", 4 );
const defaultProject1 = createProject( "Another Day", "Just a quick note about the focus", "due soon", 6 );
getProjects();

currentProject.setPriority( 1 );
console.log( currentProject );

createTodo( "Brainstorm To-do List" );
createTodo( "Stop being negative when your code doesn't work" );
createTodo( "Smile Damnit", "soon" );
currentTodo.setPriority( 2 );
currentTodo.setDueDate( "later" );
currentTodo.setChecked( true );
currentProject.printTodos();
currentProject.setNotes( "Oh now this is really getting complicated and it's scary that some of it makes sense. Try not to lose your marbles..." );
currentProject.setChecked( true );
createCheckItem( "first give it some thought" );
console.log( currentCheckItem );
currentCheckItem.setChecked( true );
createCheckItem( "Second, think again..." );
currentCheckItem.setPriority( 2 );
createCheckItem( "Third, eat some cake..." );

currentTodo.printChecklist();
printProjects();
