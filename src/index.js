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
    const h2 = document.createElement( "h2" );
    h2.textContent = "Projects";
    sidebar.appendChild( h2 );
    const projectList = document.createElement( "ul" );
    projectList.classList.add( "project-list" );
    sidebar.appendChild( projectList );
    const addProjectBtn = document.createElement( "button" );
    addProjectBtn.classList.add( "add-project-btn" );
    addProjectBtn.textContent = "Add New";
    sidebar.appendChild( addProjectBtn );
    const main = document.createElement( "div" );
    main.classList.add( "main" );

    body.appendChild( sidebar );
    body.appendChild( main );
    
    const loadSidebar = () => {
        for ( const projectItem of projects ) {
            const li = document.createElement( "li" );
            li.setAttribute("data-id", `${ projectItem.id }` );
            li.textContent = `${ projectItem.title }`;
    
            projectList.appendChild( li );
        }
    }

    const loadMain = ( project ) => {
        const h1 = document.createElement( "h1" );
        h1.textContent = `${ project.title }`;
        main.appendChild( h1 );
        const h3 = document.createElement( "h3" );
        h3.textContent = `${ project.notes }`;
        main.appendChild( h3 );
        
        const projectDetails = document.createElement( "ul" );
        projectDetails.classList.add( "project-details-ul" );
        main.appendChild( projectDetails );
        const dueDateLi = document.createElement( "li" );
        dueDateLi.classList.add( "due-date-li" );
        dueDateLi.textContent = `Due Date: ${ project.dueDate }`;
        projectDetails.appendChild( dueDateLi );
        const priorityLi = document.createElement( "li" );
        priorityLi.classList.add( "priority-li" );
        priorityLi.textContent = `Priority: ${ project.priority }`;
        projectDetails.appendChild( priorityLi );
        
        const projectEditLi = document.createElement( "li" );
        projectEditLi.classList.add( "project-edit-li" );
        projectDetails.appendChild( projectEditLi );
        const projectEditBtn = document.createElement( "button" );
        projectEditBtn.classList.add( "project-edit-btn" );
        projectEditBtn.setAttribute("data-id", `${ project.id }` );
        projectEditBtn.textContent = "Edit Project";
        projectEditLi.appendChild( projectEditBtn );

        const projectDeleteLi = document.createElement( "li" );
        projectDeleteLi.classList.add( "project-delete-li" );
        projectDetails.appendChild( projectDeleteLi );
        const projectDeleteBtn = document.createElement( "button" );
        projectDeleteBtn.classList.add( "project-delete-btn" );
        projectDeleteBtn.setAttribute("data-id", `${ project.id }` );
        projectDeleteBtn.textContent = "Delete Project";
        projectDeleteLi.appendChild( projectDeleteBtn );

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
            todoDueDateLi.textContent = `Due Date: ${ todo.dueDate }`;
            todoDetails.appendChild( todoDueDateLi );
            const todoPriorityLi = document.createElement( "li" );
            todoPriorityLi.classList.add( "priority-li" );
            todoPriorityLi.textContent = `Priority: ${ todo.priority }`;
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

            // checklist loop

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
                checkItemDueDateLi.textContent = `Due Date: ${ checkItem.dueDate }`;
                checkItemDetails.appendChild( checkItemDueDateLi );
                const checkItemPriorityLi = document.createElement( "li" );
                checkItemPriorityLi.classList.add( "priority-li" );
                checkItemPriorityLi.textContent = `Priority: ${ checkItem.priority }`;
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
            addCheckItemBtn.textContent = "Add Item";
            todoChecklist.appendChild( addCheckItemBtn );

        }

        const addTodoBtn = document.createElement( "button" );
        addTodoBtn.classList.add( "add-todo-btn" );
        addTodoBtn.textContent = "Add Todo";
        main.appendChild( addTodoBtn );


    }

       
        // build main
            // list the project title
            // list todos
            // list checklists under each todo
    // build modals for new project and new todo and new checkItem    

    loadSidebar();
    loadMain( projects[0] );
}
screenController();