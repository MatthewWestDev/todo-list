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
    updateCheck() {
        this.check = !this.check;
    }
}

const hasTodo = {
    setTodo( title ) {
        this.todos.push( title );
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
        this.checklist.push ( title );
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
    const project = ( projectId ) => {
        projectsArray.splice( projectId, 1 );
    }
    const todo = ( projectId, todoId ) => {
        projectsArray[ projectId ].todos.splice( todoId, 1 );
        console.log( "removing todo");
        printProjects();
    }
    const checkItem = ( projectId, todoId, checkItemId ) => {
        projectsArray[ projectId ].todos[ todoId ].checklist.splice( checkItemId, 1 );
    }
    return { project, todo, checkItem };
})();

class Project {    
    constructor( title, notes, dueDate, priority  ) {
        this.title = title;
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
    constructor( title, dueDate, priority, check ) {
        this.title = title;
        this.dueDate = dueDate,
        this.priority = priority;
        this.check = check;
        this.checklist = [];
    }
}

Object.assign( Todo.prototype, hasTitle );
Object.assign( Todo.prototype, hasDueDate );
Object.assign( Todo.prototype, hasPriority );
Object.assign( Todo.prototype, hasCheck );
Object.assign( Todo.prototype, hasCheckItem );

class CheckItem {
    constructor( title, dueDate, priority, check ) {
        this.title = title;
        this.dueDate = dueDate,
        this.priority = priority;
        this.check = check;
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