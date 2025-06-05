// модальное окно для выбора каталога магазинов
document.addEventListener("DOMContentLoaded", function () {
  const shopCatalogButton = document.querySelector(".shopcatalog");
  const modalOverlay = document.getElementById("modalOverlay");
  const closeModalButton = document.getElementById("closeModal");
  const modal = modalOverlay.querySelector(".modal"); // Получаем элемент modal

  // Открытие модального окна
  shopCatalogButton.addEventListener("click", function () {
    modalOverlay.style.display = "flex"; // Показываем оверлей
    modal.style.display = "block"; // Показываем модальное окно
    document.body.style.overflow = "hidden"; // Отключаем прокрутку
  });

  // Закрытие модального окна
  closeModalButton.addEventListener("click", function () {
    modalOverlay.style.display = "none"; // Скрываем оверлей
    modal.style.display = "none"; // Скрываем модальное окно
    document.body.style.overflow = ""; // Включаем прокрутку обратно
  });

  // Закрытие модального окна при клике вне модального контента
  modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
      modalOverlay.style.display = "none"; // Скрываем оверлей
      modal.style.display = "none"; // Скрываем модальное окно
      document.body.style.overflow = ""; // Включаем прокрутку обратно
    }
  });
});

// модальное окно для выбора категорий
document.addEventListener("DOMContentLoaded", function () {
  const openModalButton = document.getElementById("openModalProdcatalog");
  const closeModalButton = document.getElementById("closeModalProdcatalog");
  const modalOverlay = document.getElementById("modalOverlayProdcatalog");

  // Функция для открытия модального окна
  openModalButton.addEventListener("click", function () {
    modalOverlay.style.display = "flex"; // Показываем оверлей
    document.body.style.overflow = "hidden"; // Отключаем прокрутку
  });

  // Функция для закрытия модального окна
  closeModalButton.addEventListener("click", function () {
    modalOverlay.style.display = "none"; // Скрываем оверлей
    document.body.style.overflow = ""; // Включаем прокрутку обратно
  });

  // Закрытие модального окна при клике вне его
  modalOverlay.addEventListener("click", function (event) {
    if (event.target === modalOverlay) {
      modalOverlay.style.display = "none"; // Скрываем оверлей
      document.body.style.overflow = ""; // Включаем прокрутку обратно
    }
  });
});

// // Модальное окно для авторизации
// document.addEventListener("DOMContentLoaded", function () {
//   const modalOverlay = document.getElementById("modalOverlayLogin");
//   const openModalButton = document.querySelector(".circle.btn-profile");
//   const closeModalButton = document.getElementById("btn-close-auth");

//   // Функция для открытия модального окна
//   function openModal() {
//     modalOverlay.style.display = "flex"; // или "block", в зависимости от стилей
//   }

//   // Функция для закрытия модального окна
//   function closeModal() {
//     modalOverlay.style.display = "none";
//   }

//   // Обработчик событий для кнопки открытия модального окна
//   openModalButton.addEventListener("click", openModal);

//   // Обработчик событий для кнопки закрытия модального окна
//   closeModalButton.addEventListener("click", closeModal);

//   // Закрытие модального окна при клике вне его
//   modalOverlay.addEventListener("click", function (event) {
//     if (event.target === modalOverlay) {
//       closeModal();
//     }
//   });
// });

// Сторисы:
// document.addEventListener('DOMContentLoaded', () => {
//     const buttons = {
//         storiesOne: document.querySelector('.sectionsForCard__stories_storiesOne'),
//         storiesTwo: document.querySelector('.sectionsForCard__stories_storiesTwo'),
//         storiesThree: document.querySelector('.sectionsForCard__stories_storiesThree')
//     };

//     const modals = {
//         modalOne: document.getElementById('modal-storiesOne'),
//         modalTwo: document.getElementById('modal-storiesTwo'),
//         modalThree: document.getElementById('modal-storiesThree')
//     };

//     const overlay = document.getElementById('overlay-stories');

//     const openModal = (modal) => {
//         modal.style.display = 'block';
//         overlay.style.display = 'block'; // Показываем оверлей
//     };

//     const closeModal = (modal) => {
//         modal.style.display = 'none';
//         overlay.style.display = 'none'; // Скрываем оверлей
//     };

//     // Обработчики для кнопок открытия модальных окон
//     buttons.storiesOne.onclick = () => openModal(modals.modalOne);
//     buttons.storiesTwo.onclick = () => openModal(modals.modalTwo);
//     buttons.storiesThree.onclick = () => openModal(modals.modalThree);

//     const closeButtons = document.querySelectorAll('.stories-close');
//     closeButtons.forEach(btn => {
//         btn.onclick = () => {
//             const modalKey = modal${btn.getAttribute('data-modal').replace('modal', '')}; // Исправлено: добавлены кавычки для шаблонной строки
//             closeModal(modals[modalKey]);
//         };
//     });

//     // Обработчик для кнопок переключения контента
//     const switchButtons = document.querySelectorAll('.switch-content');
//     switchButtons.forEach(btn => {
//         btn.onclick = () => {
//             const targetModal = document.getElementById(btn.getAttribute('data-target'));
//             const currentModal = btn.closest('.modal-stories');
//             closeModal(currentModal);
//             openModal(targetModal);
//         };
//     });

//     // Закрытие модальных окон при клике на оверлей
//     window.onclick = (event) => {
//         if (event.target === overlay) {
//             for (const modal of Object.values(modals)) {
//                 closeModal(modal);
//             }
//         }
//     };
// });
