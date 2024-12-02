const projectsArray = [];

const getProjects = () => projectsArray;

const printProjects = () => {
    console.log( projectsArray );
}

let currentProject;
let currentTodo;
let currentCheckItem;



// functions to create and edit data in the objects

const hasTitle = {
    setTitle( title ) {
        this.title = title;
        // console.log( `${ this.title } has updated` );
    }
}

const hasNotes = {
    setNotes( note ) {
        this.notes = note;
        // console.log( `${ this.title }'s notes are: ${ this.notes }`);
    }
}

const hasDueDate = {
    setDueDate( date ) {
        this.dueDate = date;
        // console.log( `${ this.title } is due ${ this.dueDate }`);
    }
}

const hasPriority = {
    setPriority( number ) {
        this.priority = number;
        // console.log( `${ this.title }'s priority is ${ this.priority }`);
    }
}

const hasTodo = {
    setTodo( title ) {
        this.check = false;
        this.todos.push( title );
        title.id = this.todos.indexOf( title );
        // this.todo = title;
        // currentTodo = this.todo;
        // toDo.id = this.todos.indexOf( title );
    }
}

const hasCheck = {
    setCheck( boolean ) {
        this.check = boolean;
        // console.log( `${ this.title } is checked: ${ this.checked }`);
    }
}

const hasTodoList = {
    printTodos() {
        console.log ( this.todos );
        return this.todos;
    }
} 

const hasCheckItem = {
    setCheckItem( title ) {
        // this.checkItem = title;
        this.check = false;
        this.checklist.push ( title );
        title.id = this.checklist.indexOf( title );
    }
}

const hasChecklist = {
    printChecklist() {
        console.log ( this.checklist );
    }
} 



// The classes

class Project {    
    constructor( title, notes, dueDate, priority  ) {
        this.title = title;
        this.id = projectsArray.length;
        this.notes = notes;
        this.dueDate = dueDate,
        this.priority = priority;
        this.todos = [];
    }
}

Object.assign( Project.prototype, hasTitle );
Object.assign( Project.prototype, hasNotes );
Object.assign( Project.prototype, hasDueDate );
Object.assign( Project.prototype, hasPriority );
Object.assign( Project.prototype, hasTodo );
Object.assign( Project.prototype, hasTodoList );
// Object.assign( Project.prototype, hasCheck );

class Todo {
    constructor( title ) {
        this.title = title;
        this.check = false;
        this.checklist = [];
    }
}

Object.assign( Todo.prototype, hasTitle );
Object.assign( Todo.prototype, hasDueDate );
Object.assign( Todo.prototype, hasPriority );
Object.assign( Todo.prototype, hasCheck );
Object.assign( Todo.prototype, hasCheckItem );
Object.assign( Todo.prototype, hasChecklist );

class CheckItem {
    constructor( text ) {
        this.title = text;
        this.check = false;
    }
}

Object.assign( CheckItem.prototype, hasTitle );
Object.assign( CheckItem.prototype, hasDueDate );
Object.assign( CheckItem.prototype, hasPriority );
Object.assign( CheckItem.prototype, hasCheck );


// Object factory

const create = ( function () {
    const project = ( title, notes, dueDate, priority ) => {
        const newProject = new Project( title, notes, dueDate, priority );
        projectsArray.push( newProject );
    }
    
    const todo = ( title, currentProject ) => {
        const newTodo = new Todo( title );
        currentProject.setTodo( newTodo );
        let currentTodo = newTodo;
    }
    
    const checkItem = ( title, currentTodo ) => {
        const newCheckItem = new CheckItem( title );
        currentTodo.setCheckItem( newCheckItem );
        let currentCheckItem = newCheckItem;
        // console.log(` ${currentTodo.checklist.indexOf(currentCheckItem)} ${currentCheckItem.title} `);
    }

    return { project, todo, checkItem };
})();



export { getProjects, printProjects, create };