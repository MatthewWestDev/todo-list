import { getProjects, printProjects, creator, remover, hasTitle, hasNotes, hasPriority, hasDueDate, hasCheck } from "./project.js";
import { loadData, save } from "./project-controller.js";

let projects = getProjects(); 
// setCurrentProject( projects[0] );


let currentProject = projects[0];
const getCurrentProject = () => currentProject;
function setCurrentProject( title ) {
    currentProject = projects.find(( project ) => project.title === title );
    console.log( "set current project" );
    loadMain( currentProject );
  }

let currentTodo;
const getCurrentTodo = () => currentTodo;
const setCurrentTodo = ( id ) => {
    currentProject = getCurrentProject();
    console.log( currentProject );
    currentTodo = currentProject.todos[ id ];
}

let currentCheckItem;
const getCurrentCheckItem = () => currentCheckItem;
const setCurrentCheckItem = ( id ) => {
    currentCheckItem = currentProject.currentTodo.checklist[ id ];
}


const body = document.querySelector( "body" );

const sidebar = document.createElement( "div" );
sidebar.classList.add( "sidebar" );
const h2 = document.createElement( "h2" );
h2.textContent = "Projects";
sidebar.appendChild( h2 );
const projectList = document.createElement( "ul" );
projectList.classList.add( "project-list" );
sidebar.appendChild( projectList );
const addProjectBtn = document.createElement( "button" );
addProjectBtn.classList.add( "add-project-btn" );
addProjectBtn.innerHTML = `&plus; Add New Project`;
sidebar.appendChild( addProjectBtn );
addProjectBtn.addEventListener( "click", () => {
    loadModal( "create", "project" );
});
const main = document.createElement( "div" );
main.classList.add( "main" );

body.appendChild( sidebar );
body.appendChild( main );

const loadSidebar = () => {
    projectList.textContent = "";
    for ( const projectItem of projects ) {
        const li = document.createElement( "li" );
        li.classList.add( "project-item" );
        li.setAttribute("data-id", `${ projectItem.id }` );
        li.textContent = `${ projectItem.title }`;
        li.addEventListener( "click", () => {
            setCurrentProject( projectItem.title );
        });

        projectList.appendChild( li );
    }
}

const loadMain = ( project ) => {
    main.textContent = "";
    const h1 = document.createElement( "h1" );
    h1.textContent = `${ project.title }`;
    main.appendChild( h1 );
    if ( project.notes ) {
        const h3 = document.createElement( "h3" );
        h3.textContent = `${ project.notes }`;
        main.appendChild( h3 );
    }
    
    const projectDetails = document.createElement( "ul" );
    projectDetails.classList.add( "project-details-ul" );
    main.appendChild( projectDetails );
    
    const dueDateLi = document.createElement( "li" );
    dueDateLi.classList.add( "due-date-li" );
    if ( project.dueDate ) {
        dueDateLi.textContent = `Due: ${ project.dueDate }`;
    } else {
        dueDateLi.textContent = `Set a Due Date`;
    }
    // date input
    projectDetails.appendChild( dueDateLi );
    
    const priorityLi = document.createElement( "li" );
    priorityLi.classList.add( "priority-li" );
    if ( project.priority ) {
        priorityLi.textContent = `Priority: ${ project.priority }`;
    } else {
        priorityLi.textContent = `Set a Priority`;
    }
    // priority input
    projectDetails.appendChild( priorityLi );
    
    const projectEditLi = document.createElement( "li" );
    projectEditLi.classList.add( "project-edit-li" );
    projectDetails.appendChild( projectEditLi );
    const projectEditBtn = document.createElement( "button" );
    projectEditBtn.classList.add( "project-edit-btn" );
    projectEditBtn.setAttribute("data-id", `${ project.id }` );
    projectEditBtn.textContent = "Edit Project";
    projectEditLi.appendChild( projectEditBtn );
    projectEditBtn.addEventListener( "click", () => {
        loadModal( "edit", "project", `${ project.id }` );
    });

    const projectDeleteLi = document.createElement( "li" );
    projectDeleteLi.classList.add( "project-delete-li" );
    projectDetails.appendChild( projectDeleteLi );
    const projectDeleteBtn = document.createElement( "button" );
    projectDeleteBtn.classList.add( "project-delete-btn" );
    projectDeleteBtn.setAttribute("data-id", `${ project.id }` );
    projectDeleteBtn.textContent = "Delete Project";
    projectDeleteLi.appendChild( projectDeleteBtn );

    if ( project.todos ) {
        const projectTodos = document.createElement( "ul" );
        projectTodos.classList.add( "project-todos-ul" );
        main.appendChild( projectTodos );
        for ( const todo of project.todos ) {
            const todoLi = document.createElement( "li" );
            todoLi.setAttribute("data-id", `${ todo.id }` );
            todoLi.textContent = `${ todo.title }`;
            projectTodos.appendChild( todoLi );

            const todoDetails = document.createElement( "ul" );
            todoDetails.classList.add( "todo-details-ul" );
            todoLi.appendChild( todoDetails );

            const todoDueDateLi = document.createElement( "li" );
            todoDueDateLi.classList.add( "due-date-li" );
            if ( todo.dueDate ) {
                todoDueDateLi.textContent = `Due Date: ${ todo.dueDate }`;
            } else {
                todoDueDateLi.textContent = `Set a Due Date`;
            }
            // Date input
            todoDetails.appendChild( todoDueDateLi );

            const todoPriorityLi = document.createElement( "li" );
            todoPriorityLi.classList.add( "priority-li" );
            if ( todo.priority ) {
                todoPriorityLi.textContent = `Priority: ${ todo.priority }`;
            } else {
                todoPriorityLi.textContent = `Set a Priority`;
            }
            // Priority input
            todoDetails.appendChild( todoPriorityLi );

            const todoAddChecklistLi = document.createElement( "li" );
            todoAddChecklistLi.classList.add( "todo-add-checklist-li" );
            todoDetails.appendChild( todoAddChecklistLi );
            const todoAddChecklistBtn = document.createElement( "button" );
            todoAddChecklistBtn.classList.add( "todo-add-checklist-btn" );
            todoAddChecklistBtn.setAttribute("data-id", `${ todo.id }` );
            todoAddChecklistBtn.textContent = "Add Checklist";
            todoAddChecklistLi.appendChild( todoAddChecklistBtn );

            const todoEditLi = document.createElement( "li" );
            todoEditLi.classList.add( "todo-edit-li" );
            todoDetails.appendChild( todoEditLi );
            const todoEditBtn = document.createElement( "button" );
            todoEditBtn.classList.add( "todo-edit-btn" );
            todoEditBtn.setAttribute("data-id", `${ todo.id }` );
            todoEditBtn.textContent = "Edit Todo";
            todoEditLi.appendChild( todoEditBtn );

            const todoDeleteLi = document.createElement( "li" );
            todoDeleteLi.classList.add( "todo-delete-li" );
            todoDetails.appendChild( todoDeleteLi );
            const todoDeleteBtn = document.createElement( "button" );
            todoDeleteBtn.classList.add( "todo-delete-btn" );
            todoDeleteBtn.setAttribute("data-id", `${ todo.id }` );
            todoDeleteBtn.textContent = "Delete Todo";
            todoDeleteLi.appendChild( todoDeleteBtn );

            const checkbox = document.createElement( "input" );
            todoLi.prepend( checkbox );
            checkbox.type = "checkbox";
            checkbox.id = `check_todo_${ todo.id }`;
            checkbox.name = `check_todo_${ todo.id }`;
            checkbox.classList.add( "todo-check" );
            checkbox.setAttribute( "data-id", todo.id );
            checkbox.checked = todo.check ? "checked" : "";
            const label = document.createElement( "label" );
            checkbox.appendChild( label );
            label.htmlFor = `check_todo_${ todo.id }`;
            label.classList.add( "check" );
            label.textContent = "Completed";

            if ( todo.checklist.length !== 0 ) {
                const todoChecklist = document.createElement( "ul" );
                todoChecklist.classList.add( "todo-checklist-ul" );
                todoLi.appendChild( todoChecklist );
                for ( const checkItem of todo.checklist ) {
                    const checkItemLi = document.createElement( "li" );
                    checkItemLi.setAttribute("data-id", `${ checkItem.id }` );
                    checkItemLi.textContent = `${ checkItem.title }`;
                    todoChecklist.appendChild( checkItemLi );

                    const checkItemDetails = document.createElement( "ul" );
                    checkItemDetails.classList.add( "checkitem-details-ul" );
                    checkItemLi.appendChild( checkItemDetails );
                    
                    const checkItemDueDateLi = document.createElement( "li" );
                    checkItemDueDateLi.classList.add( "due-date-li" );
                    if ( checkItem.dueDate ) {
                        checkItemDueDateLi.textContent = `Due Date: ${ checkItem.dueDate }`;
                    } else {
                        checkItemDueDateLi.textContent = `Set a Due Date`;
                    }
                    // Date Input
                    checkItemDetails.appendChild( checkItemDueDateLi );
                    
                    const checkItemPriorityLi = document.createElement( "li" );
                    checkItemPriorityLi.classList.add( "priority-li" );
                    if ( checkItem.priority ) {
                        checkItemPriorityLi.textContent = `Priority: ${ checkItem.priority }`;
                    } else {
                        checkItemPriorityLi.textContent = `Set a Priority`;
                    }
                    // Priority input
                    checkItemDetails.appendChild( checkItemPriorityLi );
                    
                    const checkItemEditLi = document.createElement( "li" );
                    checkItemEditLi.classList.add( "checkitem-edit-li" );
                    checkItemDetails.appendChild( checkItemEditLi );
                    const checkItemEditBtn = document.createElement( "button" );
                    checkItemEditBtn.classList.add( "checkitem-edit-btn" );
                    checkItemEditBtn.setAttribute("data-id", `${ checkItem.id }` );
                    checkItemEditBtn.textContent = "Edit Item";
                    checkItemEditLi.appendChild( checkItemEditBtn );

                    const checkItemDeleteLi = document.createElement( "li" );
                    checkItemDeleteLi.classList.add( "checkitem-delete-li" );
                    checkItemDetails.appendChild( checkItemDeleteLi );
                    const checkItemDeleteBtn = document.createElement( "button" );
                    checkItemDeleteBtn.classList.add( "checkitem-delete-btn" );
                    checkItemDeleteBtn.setAttribute("data-id", `${ checkItem.id }` );
                    checkItemDeleteBtn.textContent = "Delete Item";
                    checkItemDeleteLi.appendChild( checkItemDeleteBtn );

                    const checkItemCheckbox = document.createElement( "input" );
                    checkItemLi.prepend( checkItemCheckbox );
                    checkItemCheckbox.type = "checkbox";
                    checkItemCheckbox.id = `check_checkitem_${ checkItem.id }`;
                    checkItemCheckbox.name = `check_checkitem_${ checkItem.id }`;
                    checkItemCheckbox.classList.add( "checkitem-check" );
                    checkItemCheckbox.setAttribute( "data-id", checkItem.id );
                    checkItemCheckbox.checked = checkItem.check ? "checked" : "";
                    const checkItemCheckLabel = document.createElement( "label" );
                    checkItemCheckbox.appendChild( checkItemCheckLabel );
                    checkItemCheckLabel.htmlFor = `check_checkitem_${ checkItem.id }`;
                    checkItemCheckLabel.classList.add( "check" );
                    checkItemCheckLabel.textContent = "Completed";
                }

                const addCheckItemBtn = document.createElement( "button" );
                addCheckItemBtn.classList.add( "add-checkitem-btn" );
                addCheckItemBtn.innerHTML = `&plus; Add New Item`;
                todoChecklist.appendChild( addCheckItemBtn );
            } else {
                // do nothing?
            }
        }
    } else {
        const noTodos = document.createElement( "p" );
        noTodos.classList.add( "no-todos" );
        noTodos.textContent = "Add your first Todo...";
        main.appendChild( noTodos );
    }
        const addTodoBtn = document.createElement( "button" );
        addTodoBtn.classList.add( "add-todo-btn" );
        addTodoBtn.innerHTML = `&plus; Add New Todo`;
        main.appendChild( addTodoBtn );


}










const loadModal = ( action, type, projectId, todoId, checkItemId ) => {

    const modal = document.createElement( "dialog" );
    modal.id = "modal";
    main.appendChild( modal );

    let project;
    let todo;
    let checkItem;

    if ( action == "edit" && type == "project" ) {
        project = projects[ projectId ];
    }
    if ( action == "edit" && type == "todo" ) {
        todo = project.todos[ todoId ];
    }
    if ( action == "edit" && type == "checkItem" ) {
        checkItem = project.todo.checkList[ checkItemId ];
    }

    
    const modalContent = document.createElement( "div" );
    modalContent.classList.add( "modal-content" );
    modal.appendChild( modalContent );
    
    const closeModalBtn = document.createElement( "button" );
    closeModalBtn.classList.add( "close-modal-btn" );
    closeModalBtn.textContent = "Close";
    modalContent.appendChild( closeModalBtn );
    
    const titleForm = document.createElement( "form" );
    titleForm.classList.add( "title-form" );
    titleForm.method = "dialog";
    modalContent.appendChild( titleForm );
    
    const fieldset = document.createElement( "fieldset" );
    titleForm.appendChild( fieldset );
    const legend = document.createElement( "legend" );
    if ( action == "create" && type == "project" ) {
        legend.textContent = "Create a New Project";
    } else if ( action == "edit" && type == "project" ) {
        legend.textContent = "Edit Project";
    }
    fieldset.appendChild( legend );
    
    const pTitle = document.createElement( "p" );
    fieldset.appendChild( pTitle );
    const labelTitle = document.createElement( "label" );
    labelTitle.htmlFor = "title_input";
    pTitle.appendChild( labelTitle );
    const titleInput = document.createElement( "input" );
    titleInput.id = "title_input";
    titleInput.type = "text";
    titleInput.name = "title_input";
    titleInput.required = true;
    if ( action == "edit" && type == "project" ) {
        titleInput.value = `${ project.title }`;
    }
    pTitle.appendChild( titleInput );

    const pNote = document.createElement( "p" );
    fieldset.appendChild( pNote );
    const labelNote = document.createElement( "label" );
    labelNote.htmlFor = "note_input";
    pNote.appendChild( labelNote );
    const noteInput = document.createElement( "textarea" );
    noteInput.id = "note_input";
    // noteInput.type = "text";
    noteInput.name = "note_input";
    // noteInput.required = true;
    if ( action == "edit" && type == "project" ) {
        noteInput.value = `${ project.notes }`;
    }
    pNote.appendChild( noteInput );

    const pDueDate = document.createElement( "p" );
    fieldset.appendChild( pDueDate );
    const labelDueDate = document.createElement( "label" );
    labelDueDate.htmlFor = "due_date_input";
    pDueDate.appendChild( labelDueDate );
    const dueDateInput = document.createElement( "input" );
    dueDateInput.id = "due_date_input";
    dueDateInput.type = "date";
    dueDateInput.name = "due_date_input";
    dueDateInput.value = "";
    // dueDateInput.required = true;
    if ( action == "edit" && type == "project" ) {
        dueDateInput.value = `${ project.dueDate }`;
    }
    pDueDate.appendChild( dueDateInput );

    const pPriority = document.createElement( "p" );
    fieldset.appendChild( pPriority );
    const labelPriority = document.createElement( "label" );
    labelPriority.htmlFor = "priority_input";
    pPriority.appendChild( labelPriority );
    const priorityInput = document.createElement( "select" );
    priorityInput.id = "priority_input";
    // priorityInput.type = "select";
    priorityInput.name = "priority_input";
    // priorityInput.required = true;
    if ( action == "edit" && type == "project" ) {
        priorityInput.value = `${ project.priority }`;
    }
    pPriority.appendChild( priorityInput );
    // const defaultOption = document.createElement( "option" );
    // defaultOption.value = "";


    const priorityArray = [ "", "Low", "Medium", "High" ];
    for ( let i = 0; i < priorityArray.length; i++ ) {
        const option = document.createElement( "option" );
        option.value = priorityArray[ i ];
        option.textContent = priorityArray[ i ];
        priorityInput.appendChild( option );
    }
    
    const pSubmit = document.createElement( "p" );
    titleForm.appendChild( pSubmit );
    const modalSubmitBtn = document.createElement( "button" );
    modalSubmitBtn.type = "submit";
    modalSubmitBtn.id = "submit";
    modalSubmitBtn.textContent = "Submit";
    pSubmit.appendChild( modalSubmitBtn );

    modal.showModal();

    modalSubmitBtn.addEventListener( "click", (e) => {
        e.preventDefault();

        const titleString = titleInput.value;
        const noteString = noteInput.value;
        const dueDateString = dueDateInput.value;
        const priorityString = priorityInput.value;

        if ( action == "create" && type == "project" ) {
            creator.project( titleString );
            save();
            loadSidebar();
            setCurrentProject( titleString );
            console.log( currentProject );
            loadMain( getCurrentProject() );
        } else if ( action == "edit" && type == "project" ) {
            project.updateTitle( titleString );
            project.updateNotes( noteString );
            project.updateDueDate( dueDateString );
            project.updatePriority( priorityString );
            save();
            loadSidebar();
            setCurrentProject( titleString );
            loadMain( getCurrentProject() );
        }
    
    })
}

export { loadSidebar, loadMain, loadModal };