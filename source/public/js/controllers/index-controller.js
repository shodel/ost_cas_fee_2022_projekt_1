function initialize() {
  const switchThemeButton = document.getElementById("button-switch-theme");
  switchThemeButton.addEventListener("click", () => {
    document.body.classList.toggle("alternative-theme");
  });
}

initialize();
