class IndexController {
  switchView() {
    const todoOverview = document.getElementById("todo-overview");
    todoOverview.classList.toggle("hidden");
    const todoEdit = document.getElementById("todo-edit");
    todoEdit.classList.toggle("hidden");
  }

  initialize() {
    const switchThemeButton = document.getElementById("button-switch-theme");
    switchThemeButton.addEventListener("click", () => {
      document.body.classList.toggle("alternative-theme");
    });

    const createNewTodoButton = document.getElementById(
      "button-create-new-todo"
    );
    createNewTodoButton.addEventListener("click", () => {
      this.switchView();
    });

    // const editTodoButtons = document.getElementsByClassName("button-edit-todo");
    // editTodoButtons.addEventListener("click", (event) => {
    //   console.log("event.target.id = " + event.target.id);
    //   this.switchView();
    // });

    const overviewButton = document.getElementById("button-overview");
    overviewButton.addEventListener("click", () => {
      this.switchView();
    });
  }
}

export const indexController = new IndexController();
indexController.initialize();
