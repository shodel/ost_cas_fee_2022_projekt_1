function initialize() {
  const switchThemeButton = document.getElementById("button-switch-theme");
  switchThemeButton.addEventListener("click", () => {
    document.body.classList.toggle("alternative-theme");
    Array.from(document.getElementsByClassName("todo-item")).forEach(
      (todoItem) => {
        todoItem.classList.toggle("alternative-border-color");
      }
    );
  });
}

initialize();
