const projectsArray = [];

const getProjects = () => projectsArray;

const printProjects = () => {
    console.log( projectsArray );
}

const hasTitle = {
    updateTitle( title ) {
        this.title = title;
        // console.log( `${ this.title } has updated` );
    }
}

const hasNotes = {
    updateNotes( note ) {
        this.notes = note;
        // console.log( `${ this.title }'s notes are: ${ this.notes }`);
    }
}

const hasDueDate = {
    updateDueDate( date ) {
        this.dueDate = date;
        // console.log( `${ this.title } is due ${ this.dueDate }`);
    }
}

const hasPriority = {
    updatePriority( number ) {
        this.priority = number;
        // console.log( `${ this.title }'s priority is ${ this.priority }`);
    }
}

const hasCheck = {
    updateCheck( boolean ) {
        this.check = boolean;
    }
}

const hasTodo = {
    setTodo( title ) {
        this.check = false;
        this.todos.push( title );
        title.id = this.todos.indexOf( title );
        this.todo = title;
    },
    deleteTodo( id ) {
        this.todos = this.todos.filter(( todo ) => todo.id !== id);
    },
    printTodos() {
        console.log ( this.todos );
        return this.todos;
    }
}

const hasCheckItem = {
    setCheckItem( title ) {
        this.checkItem = title;
        this.check = false;
        this.checklist.push ( title );
        title.id = this.checklist.indexOf( title );
    },
    deleteCheckItem( id ) {
        this.checklist = this.checklist.filter(( checkItem ) => checkItem.id !== id);
    },
    printChecklist() {
        console.log ( this.checklist );
        return this.checklist;
    }
}

const remover = ( function () {
    const project = ( id ) => {
        projectsArray.splice( id, 1 );
    }
    const todo = ( id, currentProject ) => {
        projectsArray.currentProject.todos.splice( id, 1 );
    }
    const checkItem = ( id, currentCheckItem ) => {
        projectsArray.currentTodo.checklist.splice( id, 1 );
    }
    return { project, todo, checkItem };
})();

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
Object.assign( Project.prototype, remover );

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

const creator = ( function () {
    const project = ( title, notes, dueDate, priority ) => {
        const newProject = new Project( title, notes, dueDate, priority );
        projectsArray.push( newProject );
        console.log( "pushed project" );
    }
    
    const todo = ( title, currentProject, dueDate, priority, check ) => {
        const newTodo = new Todo( title, dueDate, priority, check );
        currentProject.setTodo( newTodo );
        console.log( "pushed todo" );
    }
    
    const checkItem = ( title, currentTodo, dueDate, priority, check ) => {
        const newCheckItem = new CheckItem( title, dueDate, priority, check );
        currentTodo.setCheckItem( newCheckItem );
        console.log( "pushed check item" );
    }

    return { project, todo, checkItem };
})();

export { getProjects, printProjects, creator, remover, hasTitle, hasNotes, hasPriority, hasDueDate, hasCheck };