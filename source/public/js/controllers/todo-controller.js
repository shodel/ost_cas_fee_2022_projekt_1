import { TodoService } from "../services/todo-service.js";
import { TodoItem } from "../todo-item.js";
import { getDifferenceInDaysFromNow } from "../utils/date-utils.js";
import {
  SORT_ATTR_TITLE,
  SORT_ORDER_ASC,
  SORT_ORDER_DESC,
  sortByTitle,
} from "../utils/sort-utils.js";

function switchView() {
  const todoOverview = document.getElementById("todo-overview");
  todoOverview.classList.toggle("hidden");
  const todoEdit = document.getElementById("todo-edit");
  todoEdit.classList.toggle("hidden");
}

function relabelFormButtons(submitMode) {
  if (submitMode === "Create" || submitMode === "Update") {
    const createUpdateTodoButton = document.getElementById(
      "button-create-update-todo"
    );
    const createUpdateTodoOverviewButton = document.getElementById(
      "button-create-update-todo-overview"
    );
    createUpdateTodoButton.innerHTML = submitMode;
    createUpdateTodoOverviewButton.innerHTML = `${submitMode} & Overview`;
  }
}

function isTodoFormValid() {
  return document.getElementById("todo-edit-form").checkValidity();
}

function showFormErrorMessages() {
  return document.getElementById("todo-edit-form").reportValidity();
}

function createTodoItemFromForm() {
  const id = document.getElementById("todo-edit-id").value;
  const title = document.getElementById("todo-edit-title").value;
  const importance = Number(
    document.getElementById("todo-edit-importance").value
  );
  const dueDate = document.getElementById("todo-edit-due-date").value;
  const finished = document.getElementById("todo-edit-finished").checked;
  const description = document.getElementById("todo-edit-description").value;
  return new TodoItem(id, title, importance, dueDate, finished, description);
}

function prefillTodoForm(todoId, todoItem) {
  document.getElementById("todo-edit-id").value = todoId;
  document.getElementById("todo-edit-title").value = todoItem.title;
  document.getElementById("todo-edit-importance").value = todoItem.importance;
  document.getElementById("todo-edit-due-date").value = todoItem.dueDate;
  document.getElementById("todo-edit-finished").checked = todoItem.finished;
  document.getElementById("todo-edit-description").value = todoItem.description;
}

function clearTodoForm() {
  document.getElementById("todo-edit-form").reset();
}

function createTodo(todoItem, showOverview) {
  TodoService.createTodo(
    todoItem.title,
    todoItem.importance,
    todoItem.dueDate,
    todoItem.finished,
    todoItem.description
  ).then((createdTodoItem) => {
    if (showOverview) {
      switchToOverview();
    } else {
      // eslint-disable-next-line no-underscore-dangle
      prefillTodoForm(createdTodoItem._id, createdTodoItem);
      relabelFormButtons("Update");
    }
  });
}

function updateTodo(todoItem, showOverview) {
  TodoService.updateTodo(
    todoItem.id,
    todoItem.title,
    todoItem.importance,
    todoItem.dueDate,
    todoItem.finished,
    todoItem.description
  ).then(() => {
    TodoService.getTodo(todoItem.id).then((updatedTodoItem) => {
      if (showOverview) {
        switchToOverview();
      } else {
        // eslint-disable-next-line no-underscore-dangle
        prefillTodoForm(updatedTodoItem._id, updatedTodoItem);
      }
    });
  });
}

function initializeEditForm() {
  const createUpdateTodoButton = document.getElementById(
    "button-create-update-todo"
  );
  createUpdateTodoButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (isTodoFormValid()) {
      const todoItem = createTodoItemFromForm();
      if (!todoItem.id) {
        createTodo(todoItem, false);
      } else {
        updateTodo(todoItem, false);
      }
    } else {
      showFormErrorMessages();
    }
  });

  const createUpdateTodoOverviewButton = document.getElementById(
    "button-create-update-todo-overview"
  );
  createUpdateTodoOverviewButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (isTodoFormValid()) {
      const todoItem = createTodoItemFromForm();
      if (!todoItem.id) {
        createTodo(todoItem, true);
      } else {
        updateTodo(todoItem, true);
      }
    } else {
      showFormErrorMessages();
    }
  });
}

function createDueDateElement(todoItem) {
  const dueDateDiv = document.createElement("div");
  dueDateDiv.classList.add("todo-item-due-date");
  const dueIn = getDifferenceInDaysFromNow(todoItem.dueDate);
  dueDateDiv.innerHTML = dueIn;
  return dueDateDiv;
}

function createTitleElement(todoItem) {
  const titleDiv = document.createElement("div");
  titleDiv.classList.add("todo-item-title");
  titleDiv.innerHTML = todoItem.title;
  return titleDiv;
}

function createImportanceElement(todoItem) {
  const importanceDiv = document.createElement("div");
  importanceDiv.classList.add("todo-item-importance");
  let importanceContent = "";
  for (let index = 0; index < todoItem.importance; index++) {
    importanceContent += "⚡";
  }
  importanceDiv.innerHTML = importanceContent;
  return importanceDiv;
}

function createStateElement(todoItem) {
  const stateDiv = document.createElement("div");
  stateDiv.classList.add("todo-item-state");
  const stateCheckbox = document.createElement("input");
  stateCheckbox.type = "checkbox";
  stateCheckbox.id = "todo-edit-state";
  stateCheckbox.disabled = true;
  const stateLabel = document.createElement("label");
  stateLabel.htmlFor = "todo-edit-state";
  if (todoItem.finished) {
    stateCheckbox.checked = true;
    stateLabel.innerHTML = "Completed";
  } else {
    stateCheckbox.checked = false;
    stateLabel.innerHTML = "Open";
  }
  stateDiv.appendChild(stateCheckbox);
  stateDiv.appendChild(stateLabel);
  return stateDiv;
}

function createDescriptionElement(todoItem) {
  const descriptionDiv = document.createElement("div");
  descriptionDiv.classList.add("todo-item-description");
  descriptionDiv.innerHTML = todoItem.description;
  return descriptionDiv;
}

function createEditElement(todoItem) {
  const editDiv = document.createElement("div");
  editDiv.classList.add("todo-item-edit");
  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.innerHTML = "Edit";
  editButton.classList.add("button-edit-todo");
  // eslint-disable-next-line no-underscore-dangle
  editButton.id = todoItem.id;
  editButton.addEventListener("click", (event) => {
    prefillTodoForm(event.target.id, todoItem);
    relabelFormButtons("Update");
    switchView();
  });
  editDiv.appendChild(editButton);
  return editDiv;
}

function renderTodos(todoItems) {
  document.getElementById("todo-item-container").innerHTML = "";
  const todosFragment = document.createDocumentFragment();
  for (const todoItem of todoItems) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-item");
    todoDiv.appendChild(createDueDateElement(todoItem));
    todoDiv.appendChild(createTitleElement(todoItem));
    todoDiv.appendChild(createImportanceElement(todoItem));
    todoDiv.appendChild(createStateElement(todoItem));
    todoDiv.appendChild(createDescriptionElement(todoItem));
    todoDiv.appendChild(createEditElement(todoItem));
    todosFragment.appendChild(todoDiv);
  }
  document.getElementById("todo-item-container").appendChild(todosFragment);
}

function loadAllTodos() {
  TodoService.getAllTodos().then((response) => {
    const allTodos = [];
    response.forEach((responseTodo) => {
      // eslint-disable-next-line no-underscore-dangle
      const todoItem = new TodoItem(
        responseTodo._id,
        responseTodo.title,
        responseTodo.importance,
        responseTodo.dueDate,
        responseTodo.finished,
        responseTodo.description
      );
      allTodos.push(todoItem);
    });
    sessionStorage.setItem("todoItems", JSON.stringify(allTodos));
    renderTodos(allTodos);
  });
}

function switchToOverview() {
  loadAllTodos();
  switchView();
}

function clearSortingSymbols() {
  Array.from(document.getElementsByClassName("sort-state")).forEach(
    (sortStateElement) => {
      sortStateElement.classList.add("hidden");
    }
  );
}

function initializeSorting() {
  clearSortingSymbols();
  sessionStorage.setItem("sortOrder", "");
  sessionStorage.setItem("sortAttribute", "");
}

function initialize() {
  loadAllTodos();
  initializeEditForm();
  const createNewTodoButton = document.getElementById("button-create-new-todo");
  createNewTodoButton.addEventListener("click", () => {
    clearTodoForm();
    relabelFormButtons("Create");
    switchView();
  });

  const overviewButton = document.getElementById("button-overview");
  overviewButton.addEventListener("click", () => {
    switchToOverview();
  });

  initializeSorting();

  const sortByTitleButton = document.getElementById("button-sort-by-title");
  sortByTitleButton.addEventListener("click", () => {
    const allTodoItems = JSON.parse(sessionStorage.getItem("todoItems"));
    clearSortingSymbols();
    if (
      sessionStorage.getItem("sortAttribute") === SORT_ATTR_TITLE &&
      sessionStorage.getItem("sortOrder") === SORT_ORDER_ASC
    ) {
      sortByTitle(allTodoItems, SORT_ORDER_DESC);
      sessionStorage.setItem("sortOrder", SORT_ORDER_DESC);
      document
        .querySelector("#button-sort-by-title .descending")
        .classList.remove("hidden");
    } else {
      sortByTitle(allTodoItems, SORT_ORDER_ASC);
      sessionStorage.setItem("sortOrder", SORT_ORDER_ASC);
      document
        .querySelector("#button-sort-by-title .ascending")
        .classList.remove("hidden");
    }
    sessionStorage.setItem("sortAttribute", SORT_ATTR_TITLE);
    renderTodos(allTodoItems);
  });
}

initialize();
