// import { formatDistance } from "date-fns";
import { todoService } from "../services/todo-service.js";
import { indexController } from "./index-controller.js";

// const orderContainer = document.querySelector("#orderContainer");
// const orderRenderer = Handlebars.compile(document.querySelector("#order-template").innerHTML);

// const orderId = window.location.hash.substring(1);

// async function renderOrder() {
//   orderContainer.innerHTML = orderRenderer(await orderService.getOrder(orderId))
// }

// orderContainer.addEventListener("click", async event => {
//   if (event.target.classList.contains("js-delete")) {
//     // await orderService.deleteOrder(event.target.dataset.id);
//     // renderOrder()
//   }
// });

const createUpdateTodoButton = document.getElementById(
  "button-create-update-todo"
);
createUpdateTodoButton.addEventListener("click", () => {
  const id = document.getElementById("todo-edit-id").value;
  const title = document.getElementById("todo-edit-title").value;
  const importance = Number(
    document.getElementById("todo-edit-importance").value
  );
  const dueDate = document.getElementById("todo-edit-due-date").value;
  const finished = document.getElementById("todo-edit-finished").checked;
  const description = document.getElementById("todo-edit-description").value;
  const inputsValid = document.getElementById("todo-edit-form").checkValidity();
  if (inputsValid) {
    if (!id) {
      todoService.createTodo(title, importance, dueDate, finished, description);
    } else {
      todoService.updateTodo(
        id,
        title,
        importance,
        dueDate,
        finished,
        description
      );
    }
    console.log(`todoId = ${id}`);
  }
});

function createDueDateElement(todoItem) {
  const dueDateDiv = document.createElement("div");
  dueDateDiv.classList.add("todo-item-due-date");
  // const dueIn = formatDistance(todoItem.dueDate, new Date(), {
  //   addSuffix: true,
  // });
  // dueDateDiv.innerHTML = dueIn;
  dueDateDiv.innerHTML = todoItem.dueDate;
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

function prefillTodoForm(todoId, todoItem) {
  document.getElementById("todo-edit-id").value = todoId;
  document.getElementById("todo-edit-title").value = todoItem.title;
  document.getElementById("todo-edit-importance").value = todoItem.importance;
  document.getElementById("todo-edit-due-date").value = todoItem.dueDate;
  document.getElementById("todo-edit-finished").checked = todoItem.finished;
  document.getElementById("todo-edit-description").value = todoItem.description;
}

function createEditElement(todoItem) {
  const editDiv = document.createElement("div");
  editDiv.classList.add("todo-item-edit");
  const editButton = document.createElement("button");
  editButton.type = "button";
  editButton.innerHTML = "Edit";
  editButton.classList.add("button-edit-todo");
  // eslint-disable-next-line no-underscore-dangle
  editButton.id = todoItem._id;
  editButton.addEventListener("click", (event) => {
    prefillTodoForm(event.target.id, todoItem);
    indexController.switchView();
  });
  editDiv.appendChild(editButton);
  return editDiv;
}

function renderTodos(response) {
  const todosFragment = document.createDocumentFragment();
  for (const todoItem of response) {
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

todoService.getAllTodos().then((response) => {
  renderTodos(response);
});
