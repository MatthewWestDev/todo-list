import { getProjects, printProjects, creator, remover, hasTitle, hasNotes, hasPriority, hasDueDate, hasCheck } from "./project.js";
import { loadData, save } from "./project-controller.js";

let projects = getProjects(); 

let selectedProjectId = 0;
const getSelectedProjectId = () => selectedProjectId;
const setSelectedProjectId = ( projectId ) => {
    selectedProjectId = projectId;
}

let currentProject = projects[0];
const getCurrentProject = () => currentProject;
function setCurrentProject( projectId ) {
    if ( projectId == undefined ) {
        currentProject = projects[ 0 ];
        console.log( "resetting currentProject to zero" );
        return;
    }
    currentProject = projects[ projectId ];
    console.log( "set current project" );
    setSelectedProjectId( projectId );
    loadMain( currentProject );
    setCurrentProjectLi( projectId );
  }

  let selectedTodoId = 0;
const getSelectedTodoId = () => selectedTodoId;
const setSelectedTodoId = ( todoId ) => {
    selectedTodoId = todoId;
}

let currentTodo;
const getCurrentTodo = () => currentTodo;
const setCurrentTodo = ( projectId, todoId ) => {
    // currentProject = getCurrentProject();
    // console.log( currentProject );
    currentTodo = projects[ projectId ].todos[ todoId ];
    console.log( currentTodo );
    selectedTodoId = todoId;
}

let selectedCheckItemId = 0;
const getSelectedCheckItemId = () => selectedCheckItemId;
const setSelectedCheckItemId = ( checkItemId ) => {
    selectedCheckItemId = checkItemId;
}

let currentCheckItem;
const getCurrentCheckItem = () => currentCheckItem;
const setCurrentCheckItem = ( projectId, todoId, checkItemId ) => {
    currentCheckItem = projects[ projectId ].todos[ todoId ].checklist[ checkItemId ];
    console.log( currentCheckItem );
    selectedCheckItemId = checkItemId;
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
    let index = 0;
    for ( const projectItem of projects ) {
        const li = document.createElement( "li" );
        li.classList.add( "project-item" );
        li.setAttribute("data-id", index );
        li.textContent = `${ projectItem.title }`;
        projectList.appendChild( li );

        index++;
    }

}

const listOfProjects = Array.from( document.getElementsByClassName( "project-item" ));

function clickHandlerProjects( e  ) {
    selectedProjectId = e.target.dataset.id;
    setCurrentProject( selectedProjectId );
}
projectList.addEventListener( "click", clickHandlerProjects );

function setCurrentProjectLi( currentId ) {
    const projectList = document.getElementsByClassName( "project-item" );
    for ( const projectItem of projectList ) {
        if ( projectItem.dataset.id == currentId ) {
            projectItem.classList.add( "current-project-li" );
        } else {
            projectItem.classList.remove( "current-project-li" );
        } 
    }
}





const loadMain = ( project ) => {
    main.textContent = "";

    let projectId = projects.indexOf( project );
    console.log( `Loading projectId: ${ projectId } in Main` );
    let todoId = getCurrentTodo();

    if ( project == undefined ) {
        const undefinedMainNotice = document.createElement( "h3" );
        undefinedMainNotice.textContent = "Please select or create a project...";
        main.appendChild( undefinedMainNotice );
        return;
    }
    
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
    projectEditBtn.setAttribute("data-id", projectId );
    projectEditBtn.textContent = "Edit Project";
    projectEditLi.appendChild( projectEditBtn );
    projectEditBtn.addEventListener( "click", () => {
        loadModal( "edit", "project", projectId );
    });

    const projectDeleteLi = document.createElement( "li" );
    projectDeleteLi.classList.add( "project-delete-li" );
    projectDetails.appendChild( projectDeleteLi );
    const projectDeleteBtn = document.createElement( "button" );
    projectDeleteBtn.classList.add( "project-delete-btn" );
    projectDeleteBtn.setAttribute("data-id", projectId );
    projectDeleteBtn.textContent = "Delete Project";
    projectDeleteLi.appendChild( projectDeleteBtn );
    projectDeleteBtn.addEventListener( "click", () => {
        remover.project( projectId );
        save();
        loadSidebar();
        setCurrentProject( 0 );
        // loadMain( projectId );
    })

    if ( project.todos.length !== 0 ) {
        const projectTodos = document.createElement( "ul" );
        projectTodos.classList.add( "project-todos-ul" );
        main.appendChild( projectTodos );
        let index = 0;
        
        for ( const todo of project.todos ) {
            const getTodoIndex = () => index;
            const todoLi = document.createElement( "li" );
            todoLi.classList.add( "todo-item" );
            todoLi.setAttribute("data-id", index );
            todoLi.textContent = `${ todo.title }`;
            todoLi.title = "Click to Show Details";
            projectTodos.appendChild( todoLi );
            if ( todo.dueDate ) {
                const dueDateSpan = document.createElement( "span" );
                dueDateSpan.classList.add( "due-date-span" );
                dueDateSpan.append( `${ todo.dueDate }` );
                todoLi.append( dueDateSpan );
            }
            if ( todo.priority ) {
                const prioritySpan = document.createElement( "span" );
                prioritySpan.classList.add( "priority-span" );
                prioritySpan.append( `${ todo.priority }` );
                todoLi.append( prioritySpan );
            }

            const todoDetails = document.createElement( "ul" );
            todoDetails.classList.add( "todo-details-ul" );
            todoDetails.classList.add( "details-ul" );
            // todoDetails.classList.add( "visually-hidden" );
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
            todoAddChecklistBtn.setAttribute("data-id", index );
            todoAddChecklistBtn.innerHTML = `&plus; Add Checklist Item`;
            todoAddChecklistLi.appendChild( todoAddChecklistBtn );
            todoAddChecklistBtn.addEventListener( "click", () => {
                loadModal( "create", "checkItem" );
            });

            const todoEditLi = document.createElement( "li" );
            todoEditLi.classList.add( "todo-edit-li" );
            todoDetails.appendChild( todoEditLi );
            const todoEditBtn = document.createElement( "button" );
            todoEditBtn.classList.add( "todo-edit-btn" );
            todoEditBtn.setAttribute("data-id", index );
            todoEditBtn.textContent = "Edit Todo";
            todoEditLi.appendChild( todoEditBtn );
        
            const todoDeleteLi = document.createElement( "li" );
            todoDeleteLi.classList.add( "todo-delete-li" );
            todoDetails.appendChild( todoDeleteLi );
            const todoDeleteBtn = document.createElement( "button" );
            todoDeleteBtn.classList.add( "todo-delete-btn" );
            todoDeleteBtn.setAttribute("data-id", index );
            todoDeleteBtn.textContent = "Delete Todo";
            todoDeleteLi.appendChild( todoDeleteBtn );
            /* todoDeleteBtn.addEventListener( "click", () => {
                remover.todo( projectId, todoId );
                save();
                // loadSidebar();
                loadMain( getCurrentProject() );
            }) */

            const checkbox = document.createElement( "input" );
            todoLi.prepend( checkbox );
            checkbox.type = "checkbox";
            checkbox.id = `check_todo_${ index }`;
            checkbox.name = `check_todo_${ index }`;
            checkbox.classList.add( "todo-check" );
            checkbox.setAttribute( "data-id", index );
            checkbox.checked = todo.check;
            const label = document.createElement( "label" );
            checkbox.appendChild( label );
            label.htmlFor = `check_todo_${ index }`;
            label.classList.add( "check" );
            label.textContent = "Completed";
            checkbox.addEventListener( "click", () => {
                todo.updateCheck();
                save();
                loadMain( getCurrentProject() );
            })
            if ( checkbox.checked ) {
                todoLi.classList.add( "completed" );
            }

            if ( todo.checklist.length !== 0 ) {
                const todoChecklist = document.createElement( "ul" );
                todoChecklist.classList.add( "todo-checklist-ul" );
                todoLi.appendChild( todoChecklist );
                let index = 0;

                for ( const checkItem of todo.checklist ) {
                    const todoIndex = getTodoIndex();

                    const checkItemLi = document.createElement( "li" );
                    checkItemLi.setAttribute("data-id", index );
                    checkItemLi.setAttribute("data-todoid", todoIndex );
                    checkItemLi.classList.add( "check-item" );
                    checkItemLi.textContent = `${ checkItem.title }`;
                    checkItemLi.title = "Click to Show Details";
                    todoChecklist.appendChild( checkItemLi );
                    if ( checkItem.dueDate ) {
                        const dueDateSpan = document.createElement( "span" );
                        dueDateSpan.classList.add( "due-date-span" );
                        dueDateSpan.append( `${ checkItem.dueDate }` );
                        checkItemLi.append( dueDateSpan );
                    }
                    if ( checkItem.priority ) {
                        const prioritySpan = document.createElement( "span" );
                        prioritySpan.classList.add( "priority-span" );
                        prioritySpan.append( `${ checkItem.priority }` );
                        checkItemLi.append( prioritySpan );
                    }

                    const checkItemDetails = document.createElement( "ul" );
                    checkItemDetails.classList.add( "checkitem-details-ul" );
                    checkItemDetails.classList.add( "details-ul" );
                    // checkItemDetails.classList.add( "visually-hidden" );
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
                    checkItemEditBtn.setAttribute("data-id", index );
                    checkItemEditBtn.setAttribute("data-todoid", todoIndex );
                    checkItemEditBtn.textContent = "Edit Item";
                    checkItemEditLi.appendChild( checkItemEditBtn );

                    const checkItemDeleteLi = document.createElement( "li" );
                    checkItemDeleteLi.classList.add( "checkitem-delete-li" );
                    checkItemDetails.appendChild( checkItemDeleteLi );
                    const checkItemDeleteBtn = document.createElement( "button" );
                    checkItemDeleteBtn.classList.add( "checkitem-delete-btn" );
                    checkItemDeleteBtn.setAttribute("data-id", index );
                    checkItemDeleteBtn.setAttribute("data-todoid", todoIndex );
                    checkItemDeleteBtn.textContent = "Delete Item";
                    checkItemDeleteLi.appendChild( checkItemDeleteBtn );

                    const checkItemCheckbox = document.createElement( "input" );
                    checkItemLi.prepend( checkItemCheckbox );
                    checkItemCheckbox.type = "checkbox";
                    checkItemCheckbox.id = `check_checkitem_${ index }`;
                    checkItemCheckbox.name = `check_checkitem_${ index }`;
                    checkItemCheckbox.classList.add( "checkitem-check" );
                    checkItemCheckbox.setAttribute( "data-id", index );
                    checkItemCheckbox.setAttribute( "data-todoid", todoIndex );
                    checkItemCheckbox.checked = checkItem.check;
                    const checkItemCheckLabel = document.createElement( "label" );
                    checkItemCheckbox.appendChild( checkItemCheckLabel );
                    checkItemCheckLabel.htmlFor = `check_checkitem_${ index }`;
                    checkItemCheckLabel.classList.add( "check" );
                    checkItemCheckLabel.textContent = "Completed";
                    if ( checkItemCheckbox.checked ) {
                        checkItemLi.classList.add( "completed" );
                    }

                    index++;
                }

            } else {
                // do nothing?
            }
        index++;    
        }
    } else {
        const noTodos = document.createElement( "p" );
        noTodos.classList.add( "no-todos" );
        noTodos.textContent = "Add your first Todo...";
        main.appendChild( noTodos );
    }

    hideDetails();

    const addTodoBtn = document.createElement( "button" );
    addTodoBtn.classList.add( "add-todo-btn" );
    addTodoBtn.innerHTML = `&plus; Add New Todo`;
    main.appendChild( addTodoBtn );
    addTodoBtn.addEventListener( "click", () => {
        loadModal( "create", "todo", projectId );
    });

    const listOfTodoLis = document.getElementsByClassName( "todo-item" );
    // console.log( listOfTodoLis );
    for ( const todoLi of listOfTodoLis ) {
        todoLi.addEventListener( "click", (e) => {
            const selectedTodoId = e.target.dataset.id;
        console.log( `Todo ProjectId ${projectId}, ${selectedTodoId}` );
        setCurrentTodo( projectId, selectedTodoId );
        hideDetails();
        let todoLiDetails = todoLi.getElementsByClassName( "details-ul" );
        console.log( todoLiDetails );
        todoLiDetails[0].classList.remove( "visually-hidden" );
        })
    }

    const listOfCheckItemChecks = document.getElementsByClassName( "checkitem-check" );
    for ( const checkItemCheck of listOfCheckItemChecks ) {
        checkItemCheck.addEventListener( "click", (e) => {
            const selectedCheckItemId = e.target.dataset.id;
            const parentTodo = e.target.dataset.todoid;
            console.log( `CheckItem Check ${projectId}, ${parentTodo}, ${selectedCheckItemId}` );
            setCurrentCheckItem( projectId, parentTodo, selectedCheckItemId );
            projects[ projectId ].todos[ parentTodo ].checklist[ selectedCheckItemId ].updateCheck();
            save();
            loadMain( getCurrentProject() );
            //e.stopPropagation();
        })
    }

    const listOfCheckItemLis = document.getElementsByClassName( "check-item" );
    for ( const checkItemLi of listOfCheckItemLis ) {
        checkItemLi.addEventListener( "click", (e) => {
            const selectedCheckItemId = e.target.dataset.id;
            const parentTodo = e.target.dataset.todoid;
            console.log( `CheckItem ProjectId ${projectId}, ${parentTodo}, ${selectedCheckItemId}` );
            setCurrentCheckItem( projectId, parentTodo, selectedCheckItemId );
            hideDetails();
            let checkItemLiDetails = checkItemLi.getElementsByClassName( "details-ul" );
            checkItemLiDetails[0].classList.remove( "visually-hidden" );
            e.stopPropagation();
        })
    }

    const listOfTodoEdits = document.getElementsByClassName( "todo-edit-btn" );
    for ( const todoEditBtn of listOfTodoEdits ) {
        todoEditBtn.addEventListener( "click", (e) => {
        const selectedTodoId = e.target.dataset.id;
        console.log( `Todo Edit ${projectId}, ${selectedTodoId}` );
        setCurrentTodo( projectId, selectedTodoId );
        loadModal( "edit", "todo", projectId, selectedTodoId );
        e.stopPropagation();
        })
    }

    const listOfCheckItemEdits = document.getElementsByClassName( "checkitem-edit-btn" );
    for ( const checkItemEditBtn of listOfCheckItemEdits ) {
        checkItemEditBtn.addEventListener( "click", (e) => {
            const selectedCheckItemId = e.target.dataset.id;
            const parentTodo = e.target.dataset.todoid;
            console.log( `CheckItem Edit ${projectId}, ${parentTodo}, ${selectedCheckItemId}` );
            setCurrentCheckItem( projectId, parentTodo, selectedCheckItemId );
            loadModal( "edit", "checkItem", projectId, parentTodo, selectedCheckItemId );
            e.stopPropagation();
        })
    }

    const listOfTodoDeletes = document.getElementsByClassName( "todo-delete-btn" );
    for ( const todoDeleteBtn of listOfTodoDeletes ) {
        todoDeleteBtn.addEventListener( "click", (e) => {
            const selectedTodoId = e.target.dataset.id;
            console.log( `Todo Delete ${projectId}, ${selectedTodoId}` );
            setCurrentTodo( projectId, selectedTodoId );
            remover.todo( projectId, selectedTodoId );
            save();
            loadMain( getCurrentProject() );
        })
    }

    const listOfCheckItemDeletes = document.getElementsByClassName( "checkitem-delete-btn" );
    for ( const checkItemDeleteBtn of listOfCheckItemDeletes ) {
        checkItemDeleteBtn.addEventListener( "click", (e) => {
            const selectedCheckItemId = e.target.dataset.id;
            const parentTodo = e.target.dataset.todoid;
            console.log( `CheckItem Delete ${projectId}, ${parentTodo}, ${selectedCheckItemId}` );
            setCurrentCheckItem( projectId, parentTodo, selectedCheckItemId );
            remover.checkItem( projectId, parentTodo, selectedCheckItemId );
            save();
            loadMain( getCurrentProject() );
            e.stopPropagation();
        })
    }

    function hideDetails() {
    const listOfDetailUls = document.getElementsByClassName( "details-ul" );
    for ( const detailUl of listOfDetailUls ) {
        detailUl.classList.add( "visually-hidden" );
        console.log( "hiding details..." );
    }
    }
    // hideDetails();
    
    

    
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
        todo = projects[ projectId ].todos[ todoId ];
    }
    if ( action == "edit" && type == "checkItem" ) {
        // project = projects[ projectId ];
        // todo = project.todos[ todoId ];
        checkItem = projects[ projectId ].todos[ todoId ].checklist[ checkItemId ];
        console.log( checkItem );
    }

    
    const modalContent = document.createElement( "div" );
    modalContent.classList.add( "modal-content" );
    modal.appendChild( modalContent );
    
    const closeModalBtn = document.createElement( "button" );
    closeModalBtn.classList.add( "close-modal-btn" );
    closeModalBtn.textContent = "X Close";
    modalContent.appendChild( closeModalBtn );
    closeModalBtn.addEventListener( "click", () => {
        modal.close();
    });
    
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
    } else if ( action == "create" && type == "todo" ) {
        legend.textContent = "Create a New Todo";
    } else if ( action == "edit" && type == "todo" ) {
        legend.textContent = "Edit Todo";
    } else if ( action == "create" && type == "checkItem" ) {
        legend.textContent = "Create a New Check Item";
    } else if ( action == "edit" && type == "checkItem" ) {
        legend.textContent = "Edit Check Item";
    }
    fieldset.appendChild( legend );
    
    const pTitle = document.createElement( "p" );
    fieldset.appendChild( pTitle );
    const labelTitle = document.createElement( "label" );
    labelTitle.htmlFor = "title_input";
    labelTitle.textContent = "Title";
    pTitle.appendChild( labelTitle );
    const titleInput = document.createElement( "input" );
    titleInput.id = "title_input";
    titleInput.type = "text";
    titleInput.name = "title_input";
    titleInput.required = true;
    if ( action == "edit" && type == "project" ) {
        titleInput.value = `${ project.title }`;
    }
    if ( action == "edit" && type == "todo" ) {
        titleInput.value = `${ todo.title }`;
    }
    if ( action == "edit" && type == "checkItem" ) {
        titleInput.value = `${ checkItem.title }`;
    }
    
    pTitle.appendChild( titleInput );

    const pNote = document.createElement( "p" );
    fieldset.appendChild( pNote );
    const labelNote = document.createElement( "label" );
    labelNote.htmlFor = "note_input";
    labelNote.textContent = "Notes";
    const noteInput = document.createElement( "textarea" );
    noteInput.id = "note_input";
    // noteInput.type = "text";
    noteInput.name = "note_input";
    // noteInput.required = true;
    if ( action == "edit" && type == "project" ) {
        noteInput.value = `${ project.notes }`;
    }
    if ( type == "project" ) {
        pNote.appendChild( labelNote );
        pNote.appendChild( noteInput );
    }

    const pDueDate = document.createElement( "p" );
    fieldset.appendChild( pDueDate );
    const labelDueDate = document.createElement( "label" );
    labelDueDate.htmlFor = "due_date_input";
    labelDueDate.textContent = "Due Date";
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
    if ( action == "edit" && type == "todo" ) {
        dueDateInput.value = `${ todo.dueDate }`;
    }
    if ( action == "edit" && type == "checkItem" ) {
        dueDateInput.value = `${ checkItem.dueDate }`;
    }
    pDueDate.appendChild( dueDateInput );

    const pPriority = document.createElement( "p" );
    fieldset.appendChild( pPriority );
    const labelPriority = document.createElement( "label" );
    labelPriority.htmlFor = "priority_input";
    labelPriority.textContent = "Priority";
    pPriority.appendChild( labelPriority );
    const priorityInput = document.createElement( "select" );
    priorityInput.id = "priority_input";
    // priorityInput.type = "select";
    priorityInput.name = "priority_input";
    // priorityInput.required = true;
    pPriority.appendChild( priorityInput );


    const priorityArray = [ "", "Low", "Medium", "High" ];
    for ( let i = 0; i < priorityArray.length; i++ ) {
        const option = document.createElement( "option" );
        option.value = priorityArray[ i ];
        option.textContent = priorityArray[ i ];
        priorityInput.appendChild( option );
    }
    if ( action == "edit" && type == "project" ) {
        priorityInput.value = `${ project.priority }`;
    }
    if ( action == "edit" && type == "todo" ) {
        priorityInput.value = `${ todo.priority }`;
    }
    if ( action == "edit" && type == "checkItem" ) {
        priorityInput.value = `${ checkItem.priority }`;
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
            creator.project( titleString, noteString, dueDateString, priorityString );
            save();
            const createdId = projects.length -1;
            // console.log( createdId );
            loadSidebar();
            setCurrentProject( createdId );
            // console.log( currentProject );
            //setSelectedProjectId( createdId );
            // loadMain( projects[ createdId ] );
        } else if ( action == "edit" && type == "project" ) {
            project.updateTitle( titleString );
            project.updateNotes( noteString );
            project.updateDueDate( dueDateString );
            project.updatePriority( priorityString );
            save();
            loadSidebar();
            setCurrentProject( projectId );
            // console.log( getCurrentProject() );
            // loadMain( getCurrentProject() );
        } else if ( action == "create" && type == "todo" ) {
            creator.todo( titleString, currentProject, dueDateString, priorityString );
            save();
            // const createdId = currentProject.todos.length -1;
            // console.log( createdId );
            // loadSidebar();
            // setCurrentTodo( project.id, createdId );
            // console.log( currentProject );
            loadMain( getCurrentProject() );
        } else if ( action == "edit" && type == "todo" ) {
            todo.updateTitle( titleString );
            todo.updateDueDate( dueDateString );
            todo.updatePriority( priorityString );
            save();
            //loadSidebar();
            loadMain( getCurrentProject() );
            // setCurrentTodo( project.id, createdId );

            // console.log( getCurrentProject() );
            // loadMain( getCurrentProject() );
        } else if ( action == "create" && type == "checkItem" ) {
            creator.checkItem( titleString, currentTodo, dueDateString, priorityString );
            save();
            // const createdId = currentProject.todos.length -1;
            // console.log( createdId );
            // loadSidebar();
            // setCurrentTodo( project.id, createdId );
            // console.log( currentProject );
            loadMain( getCurrentProject() );
        } else if ( action == "edit" && type == "checkItem" ) {
            checkItem.updateTitle( titleString );
            checkItem.updateDueDate( dueDateString );
            checkItem.updatePriority( priorityString );
            save();
            // loadSidebar();
            loadMain( getCurrentProject() );
            // setCurrentTodo( project.id, createdId );

            // console.log( getCurrentProject() );
            // loadMain( getCurrentProject() );
        }
    
    })
}



export { loadSidebar, loadMain, setCurrentProject };