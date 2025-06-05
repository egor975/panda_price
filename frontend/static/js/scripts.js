// Подключение к index.html
document
  .querySelector(".search-button__btn")
  .addEventListener("click", async (e) => {
    e.preventDefault();

    const query = document.getElementById("searchInput").value;
    const marketplaces = [
      ...document.querySelectorAll(".shop__input-shop:checked"),
    ].map((i) => i.value);
    const categories = [
      ...document.querySelectorAll(".input-categories:checked"),
    ].map((i) => i.nextElementSibling?.textContent.trim());

    const response = await fetch(
      `/api/search?query=${encodeURIComponent(query)}&` +
        marketplaces.map((m) => `marketplaces=${m}`).join("&") +
        "&" +
        categories.map((c) => `categories=${encodeURIComponent(c)}`).join("&")
    );

    const data = await response.json();
    localStorage.setItem("searchResults", JSON.stringify(data.results));
    window.location.href = "result.html";
  });

// Подключение к result.html
document.addEventListener("DOMContentLoaded", () => {
  const results = JSON.parse(localStorage.getItem("searchResults") || "[]");

  const containerOzon = document.querySelector(".ozon-results");
  const containerWB = document.querySelector(".wildberries-results");
  const containerYM = document.querySelector(".yandex-results");

  results.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div>${product.name}</div>
      <div>${product.price} ₽</div>
      <a href="${product.url}" target="_blank">Открыть</a>
    `;

    if (product.source === "ozon") containerOzon.appendChild(card);
    if (product.source === "wildberries") containerWB.appendChild(card);
    if (product.source === "yandex") containerYM.appendChild(card);
  });
});

// Реализация фильтрации каталогов для модалки в Index.html
document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.querySelector(".search-button__btn");

  searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const query = document.querySelector(".search__searchform").value.trim();
    if (!query) return alert("Введите запрос");

    const marketplaces = Array.from(
      document.querySelectorAll(".shop__input-shop:checked")
    ).map((cb) => cb.value);
    const categories = Array.from(
      document.querySelectorAll(".input-categories:checked")
    ).map((cb) =>
      cb.closest("label").querySelector(".name-categories")?.textContent?.trim()
    );

    const params = new URLSearchParams();
    params.append("query", query);
    marketplaces.forEach((m) => params.append("marketplaces", m));
    categories.forEach((c) => params.append("categories", c));

    try {
      const res = await fetch(`/api/search?${params.toString()}`);
      const data = await res.json();
      localStorage.setItem("searchResults", JSON.stringify(data.results || []));
      window.location.href = "result.html";
    } catch (err) {
      alert("Ошибка запроса");
      console.error(err);
    }
  });

  // Закрытие модального окна после применения фильтров
  document
    .querySelector(".filters-confirm-btn")
    .addEventListener("click", () => {
      document.querySelector("#modalOverlay").style.display = "none";
      document.querySelector("body").style.overflow = "";
    });
});

//Реализация вывода результатов на странице result.html
document.addEventListener("DOMContentLoaded", () => {
  const results = JSON.parse(localStorage.getItem("searchResults") || "[]");

  const containerOzon = document.querySelector(".ozon-results");
  const containerWB = document.querySelector(".wildberries-results");
  const containerYM = document.querySelector(".yandex-results");

  const createCard = (product) => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price} ₽</p>
      <a href="${product.url}" target="_blank">Открыть</a>
      <button onclick='addTo("favourites", ${JSON.stringify(
        JSON.stringify(product)
      )})'>❤️</button>
      <button onclick='addTo("cart", ${JSON.stringify(
        JSON.stringify(product)
      )})'>🛒</button>
    `;
    return div;
  };

  window.addTo = function (key, productStr) {
    const product = JSON.parse(productStr);
    const existing = JSON.parse(localStorage.getItem(key) || "[]");
    existing.push(product);
    localStorage.setItem(key, JSON.stringify(existing));
    alert("Добавлено в " + (key === "favourites" ? "избранное" : "корзину"));
  };

  results.forEach((p) => {
    if (p.source === "ozon") containerOzon?.appendChild(createCard(p));
    if (p.source === "wildberries") containerWB?.appendChild(createCard(p));
    if (p.source === "yandex") containerYM?.appendChild(createCard(p));
  });
});

//Избранное
document.addEventListener("DOMContentLoaded", () => {
  const favourites = JSON.parse(localStorage.getItem("favourites") || "[]");

  const containers = {
    ozon: document.querySelector(".ozon-favourites"),
    wildberries: document.querySelector(".wildberries-favourites"),
    yandex: document.querySelector(".yandex-favourites"),
  };

  const renderCard = (product, index) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price} ₽</p>
      <a href="${product.url}" target="_blank">Ссылка</a>
      <button onclick="removeFavourite(${index})">Удалить</button>
    `;
    return card;
  };

  favourites.forEach((product, index) => {
    const container = containers[product.source];
    if (container) container.appendChild(renderCard(product, index));
  });

  window.removeFavourite = function (index) {
    const fav = JSON.parse(localStorage.getItem("favourites") || "[]");
    fav.splice(index, 1);
    localStorage.setItem("favourites", JSON.stringify(fav));
    location.reload();
  };
});

// Корзина
document.addEventListener("DOMContentLoaded", () => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  const containers = {
    ozon: document.querySelector(".ozon-cart"),
    wildberries: document.querySelector(".wildberries-cart"),
    yandex: document.querySelector(".yandex-cart"),
  };

  const renderCard = (product, index) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <input type="checkbox" class="product-check" data-url="${product.url}" />
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price} ₽</p>
      <a href="${product.url}" target="_blank">Ссылка</a>
      <button onclick="removeFromCart(${index})">Удалить</button>
    `;
    return card;
  };

  cart.forEach((product, index) => {
    const container = containers[product.source];
    if (container) container.appendChild(renderCard(product, index));
  });

  window.removeFromCart = function (index) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    location.reload();
  };

  document.querySelector(".check-all")?.addEventListener("click", () => {
    document
      .querySelectorAll(".product-check")
      .forEach((cb) => (cb.checked = true));
  });

  document.querySelector(".delete-all")?.addEventListener("click", () => {
    const all = JSON.parse(localStorage.getItem("cart") || "[]");
    const remaining = all.filter((_, i) => {
      const cb = document.querySelectorAll(".product-check")[i];
      return !cb.checked;
    });
    localStorage.setItem("cart", JSON.stringify(remaining));
    location.reload();
  });

  document.querySelector(".share")?.addEventListener("click", () => {
    const links = Array.from(
      document.querySelectorAll(".product-check:checked")
    )
      .map((cb) => cb.dataset.url)
      .join("\n");
    navigator.clipboard
      .writeText(links)
      .then(() => alert("Ссылки скопированы!"));
  });
});

// Подключение страницы авторизации к БД
document.querySelector(".enter__btn-enter").addEventListener("click", async (e) => {
  e.preventDefault();
  const email = document.querySelector(".email__input-email").value;
  const password = document.querySelector(".password__input-password").value;

  const res = await fetch("/api/login", {
    method: "POST",
    body: new URLSearchParams({ email, password })
  });

  const data = await res.json();
  if (data.ok) window.location.href = "index.html";
  else alert("Неверный email или пароль");
});

// Подключение страницы регистрации к БД
document.querySelector(".btn-registration").addEventListener("click", async (e) => {
  e.preventDefault();
  const name = document.querySelector(".name__input-name").value;
  const surname = document.querySelector(".surname__input-surname").value;
  const email = document.querySelector(".email__input-email").value;
  const pass1 = document.querySelector(".password__input-password").value;
  const pass2 = document.querySelector(".input-passwordtwo").value;

  if (pass1 !== pass2) return alert("Пароли не совпадают");

  const res = await fetch("/api/register", {
    method: "POST",
    body: new URLSearchParams({ name, surname, email, password: pass1 })
  });

  const data = await res.json();
  if (data.ok) window.location.href = "index.html";
  else alert("Пользователь с таким email уже существует");
});

// Восстановление пароля
document.querySelector(".enter__btn-enter").addEventListener("click", async () => {
  const email = document.querySelector(".email__input-email").value;

  const res = await fetch("/api/request-reset", {
    method: "POST",
    body: new URLSearchParams({ email })
  });

  const data = await res.json();
  if (data.ok) {
    alert("Код отправлен на почту");
    document.querySelector("#reset-step-2").style.display = "block";
  } else {
    alert("Пользователь с таким email не найден");
  }
});

document.querySelector(".confirm-reset").addEventListener("click", async () => {
  const email = document.querySelector(".email__input-email").value;
  const code = document.querySelector(".reset-code").value;
  const newPass = document.querySelector(".new-password").value;

  const res = await fetch("/api/confirm-reset", {
    method: "POST",
    body: new URLSearchParams({ email, code, new_password: newPass })
  });

  const data = await res.json();
  if (data.ok) {
    alert("Пароль сброшен");
    window.location.href = "login.html";
  } else {
    alert("Неверный код или ошибка");
  }
});