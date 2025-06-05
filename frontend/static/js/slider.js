let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelectorAll(
    ".sectionsForCard__blockForAd_images img"
  );

  if (index >= slides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = index;
  }

  slides.forEach((slide, i) => {
    slide.classList.remove("active");
    if (i === currentSlide) {
      slide.classList.add("active");
    }
  });
}

function changeSlide(direction) {
  showSlide(currentSlide + direction);
}

// // Автоматическая смена слайдов каждые 7 секунд
setInterval(() => {
  changeSlide(1);
}, 7000);

// // Показать первый слайд при загрузке
showSlide(currentSlide);
