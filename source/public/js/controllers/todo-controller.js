import { TodoService } from "../services/todo-service.js";
import { TodoItem } from "../services/todo-item.js";
import {
  getDifferenceInDaysFromNow,
  getTodayFormatted,
} from "../utils/date-utils.js";
import {
  SORT_ATTR_CREATION_DATE,
  SORT_ATTR_DUE_DATE,
  SORT_ATTR_IMPORTANCE,
  SORT_ATTR_TITLE,
  SORT_ORDER_ASC,
  SORT_ORDER_DESC,
  sortByCreationDate,
  sortByDueDate,
  sortByImportance,
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
  const creationDate = getTodayFormatted();
  return new TodoItem(
    id,
    title,
    importance,
    dueDate,
    finished,
    description,
    creationDate
  );
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
    todoItem.description,
    todoItem.creationDate
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
    todoItem.description,
    todoItem.creationDate
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
  dueDateDiv.innerHTML = getDifferenceInDaysFromNow(todoItem.dueDate);
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
  stateCheckbox.id = `todo-edit-state-${todoItem.id}`;
  stateCheckbox.disabled = true;
  const stateLabel = document.createElement("label");
  stateLabel.htmlFor = `todo-edit-state-${todoItem.id}`;
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
  editButton.id = todoItem.id;
  editButton.addEventListener("click", (event) => {
    prefillTodoForm(event.target.id, todoItem);
    relabelFormButtons("Update");
    switchView();
  });
  editDiv.appendChild(editButton);
  return editDiv;
}

function applyCompleteFilter(todoItems) {
  const filterCompletedButton = document.getElementById(
    "button-filter-completed"
  );
  if (filterCompletedButton.classList.contains("active")) {
    return todoItems.filter((todoItem) => !todoItem.finished);
  }
  return todoItems;
}

function renderTodosFromStorage() {
  const todoItems = JSON.parse(sessionStorage.getItem("todoItems"));
  document.getElementById("todo-item-container").innerHTML = "";
  const todosFragment = document.createDocumentFragment();
  const filteredTodoItems = applyCompleteFilter(todoItems);
  if (filteredTodoItems.length < 1) {
    document.getElementById("no-todos").classList.remove("hidden");
  } else {
    document.getElementById("no-todos").classList.add("hidden");
    filteredTodoItems.forEach((todoItem) => {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo-item");
      if (document.body.classList.contains("alternative-theme")) {
        todoDiv.classList.add("alternative-border-color");
      }
      todoDiv.appendChild(createDueDateElement(todoItem));
      todoDiv.appendChild(createTitleElement(todoItem));
      todoDiv.appendChild(createImportanceElement(todoItem));
      todoDiv.appendChild(createStateElement(todoItem));
      todoDiv.appendChild(createDescriptionElement(todoItem));
      todoDiv.appendChild(createEditElement(todoItem));
      todosFragment.appendChild(todoDiv);
    });
    document.getElementById("todo-item-container").appendChild(todosFragment);
  }
}

function loadAllTodos() {
  return TodoService.getAllTodos().then((response) => {
    const allTodoItems = [];
    response.forEach((responseTodo) => {
      const todoItem = new TodoItem(
        // eslint-disable-next-line no-underscore-dangle
        responseTodo._id,
        responseTodo.title,
        responseTodo.importance,
        responseTodo.dueDate,
        responseTodo.finished,
        responseTodo.description,
        responseTodo.creationDate
      );
      allTodoItems.push(todoItem);
    });
    sessionStorage.setItem("todoItems", JSON.stringify(allTodoItems));
  });
}

function clearSortSymbols() {
  Array.from(document.getElementsByClassName("sort-state")).forEach(
    (sortStateElement) => {
      sortStateElement.classList.add("hidden");
    }
  );
}

function resetActiveSortButtons() {
  Array.from(document.getElementsByClassName("sort-button")).forEach(
    (sortButton) => {
      sortButton.classList.remove("active");
    }
  );
}

function resetSortDescriptions() {
  Array.from(document.getElementsByClassName("sort-attribute-prefix")).forEach(
    (sortAttributePrefix) => {
      sortAttributePrefix.classList.remove("hidden");
    }
  );
}

function resetSortingStyle() {
  clearSortSymbols();
  resetActiveSortButtons();
  resetSortDescriptions();
}

function sortTodoItemsBy(sortAttribute, sortOrder) {
  const sortedTodoItems = JSON.parse(sessionStorage.getItem("todoItems"));
  switch (sortAttribute) {
    case SORT_ATTR_TITLE:
      sortByTitle(sortedTodoItems, sortOrder);
      break;
    case SORT_ATTR_DUE_DATE:
      sortByDueDate(sortedTodoItems, sortOrder);
      break;
    case SORT_ATTR_CREATION_DATE:
      sortByCreationDate(sortedTodoItems, sortOrder);
      break;
    case SORT_ATTR_IMPORTANCE:
      sortByImportance(sortedTodoItems, sortOrder);
      break;
    default:
      break;
  }

  resetSortingStyle();
  document
    .getElementById(`button-sort-by-${sortAttribute}`)
    .classList.add("active");
  document
    .querySelector(`#button-sort-by-${sortAttribute} .${sortOrder}`)
    .classList.remove("hidden");
  document
    .querySelector(`#button-sort-by-${sortAttribute} .sort-attribute-prefix`)
    .classList.add("hidden");

  sessionStorage.setItem("sortOrder", sortOrder);
  sessionStorage.setItem("sortAttribute", sortAttribute);

  return sortedTodoItems;
}

async function switchToOverview() {
  await loadAllTodos();
  const sortAttribute = sessionStorage.getItem("sortAttribute");
  const sortOrder = sessionStorage.getItem("sortOrder");
  if (sortAttribute && sortOrder) {
    const todoItems = sortTodoItemsBy(sortAttribute, sortOrder);
    sessionStorage.setItem("todoItems", JSON.stringify(todoItems));
  }
  renderTodosFromStorage();
  switchView();
}

function initializeSorting() {
  resetSortingStyle();
  sessionStorage.setItem("sortOrder", "");
  sessionStorage.setItem("sortAttribute", "");
}

function determineNewSortOrder(sortAttribute) {
  let newSortOrder = SORT_ORDER_ASC;
  if (
    sessionStorage.getItem("sortAttribute") === sortAttribute &&
    sessionStorage.getItem("sortOrder") === SORT_ORDER_ASC
  ) {
    newSortOrder = SORT_ORDER_DESC;
  }
  return newSortOrder;
}

function applySorting(sortAttribute) {
  const newSortOrder = determineNewSortOrder(sortAttribute);
  const sortedTodoItems = sortTodoItemsBy(sortAttribute, newSortOrder);
  sessionStorage.setItem("todoItems", JSON.stringify(sortedTodoItems));
  renderTodosFromStorage();
}

async function initialize() {
  await loadAllTodos();
  renderTodosFromStorage();
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
    applySorting(SORT_ATTR_TITLE);
  });

  const sortByDueDateButton = document.getElementById(
    "button-sort-by-due-date"
  );
  sortByDueDateButton.addEventListener("click", () => {
    applySorting(SORT_ATTR_DUE_DATE);
  });

  const sortByCreationDateButton = document.getElementById(
    "button-sort-by-creation-date"
  );
  sortByCreationDateButton.addEventListener("click", () => {
    applySorting(SORT_ATTR_CREATION_DATE);
  });

  const sortByImportanceButton = document.getElementById(
    "button-sort-by-importance"
  );
  sortByImportanceButton.addEventListener("click", () => {
    applySorting(SORT_ATTR_IMPORTANCE);
  });

  const filterCompletedButton = document.getElementById(
    "button-filter-completed"
  );
  filterCompletedButton.addEventListener("click", () => {
    if (filterCompletedButton.classList.contains("active")) {
      filterCompletedButton.classList.remove("active");
    } else {
      filterCompletedButton.classList.add("active");
    }
    renderTodosFromStorage();
  });
}

initialize();
