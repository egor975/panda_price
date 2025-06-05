document.addEventListener("DOMContentLoaded", function () {
  const shopsElements = document.querySelectorAll(".selected");

  shopsElements.forEach((element) => {
    element.addEventListener("click", function () {
      // Удаляем класс 'selected' у всех элементов
      shopsElements.forEach((el) => el.classList.remove("selected"));
      // Добавляем класс 'selected' к текущему элементу
      this.classList.add("selected");
    });
  });
});
