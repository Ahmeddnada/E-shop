let ham = document.querySelector(".ham-menu");
let menu = document.querySelector("nav ul");
ham.addEventListener("click", function () {
  menu.classList.toggle("active");
});
document.addEventListener("click", (e) => {
  if (!ham.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.remove("active");
  }
});
menu.querySelectorAll("li").forEach((item) => {
  item.addEventListener("click", () => {
    ul.classList.remove("active");
  });
});
let cards = document.querySelector(".cart-cards");
let clear = document.querySelector(".clear-cart");

if (localStorage.length > 1) {
  let card = document.createElement("div");
  card.className = "cart-card";
  let trush = document.createElement("button");
  trush.className = "clear";
  let i = document.createElement("i");
  i.className = "fa-solid fa-trash";
  trush.appendChild(i);
  card.appendChild(trush);
  let price = document.createElement("p");
  price.innerHTML = `${localStorage.getItem("price")}$`;
  price.className = "price";
  card.appendChild(price);
  let minus = document.createElement("button");
  let minusI = document.createElement("i");
  minusI.className = "fa-solid fa-minus";
  minus.className = "minus";
  minus.appendChild(minusI);
  card.appendChild(minus);
  let num = document.createElement("div");
  num.className = "num";
  num.innerHTML = 1;
  card.appendChild(num);
  let plus = document.createElement("button");
  let plusI = document.createElement("i");
  plusI.className = "fa-solid fa-plus";
  plus.className = "plus";
  plus.appendChild(plusI);
  card.appendChild(plus);
  let image = document.createElement("img");
  image.src = localStorage.getItem("image");
  card.appendChild(image);
  cards.prepend(card);
}

let plus = document.querySelectorAll(".plus");
plus.forEach((btn) => {
  btn.addEventListener("click", function () {
    let card = btn.closest(".cart-card");
    let num = card.querySelector(".num");
    let a = Number(num.textContent);
    num.textContent = a + 1;
  });
});
let minus = document.querySelectorAll(".minus");
minus.forEach((btn) => {
  btn.addEventListener("click", function () {
    let card = btn.closest(".cart-card");
    let num = card.querySelector(".num");
    let a = Number(num.textContent);

    if (num.textContent == 1) {
      card.remove();
    } else {
      num.textContent = a - 1;
    }
    clears();
    clearstore();
  });
});

let trash = document.querySelectorAll(".clear");
trash.forEach((btn) => {
  btn.addEventListener("click", function () {
    let card = btn.closest(".cart-card");

    card.remove();
    clears();
    clearstore();
  });
});
clear.addEventListener("click", function () {
  let card = document.querySelector(".cart-card");
  card.remove();
  localStorage.clear();
  clears();
  clearstore();
});
function clears() {
  if (cards.children.length > 1) {
    clear.style.display = "block";
  } else {
    clear.style.display = "none";
  }
}
clears();
let total = document.querySelector(".info p");
let number = document.querySelector(".num");
let summary = document.querySelector(".cart-summary");
if (cards.children.length < 2) {
} else {
  let finalNumber = localStorage.getItem("price") * +number.textContent;
  total.innerHTML = `${finalNumber}$`;
}

function clearstore() {
  if (cards.children.length < 2) {
    summary.style.display = "none";
    localStorage.clear();
    let ale = document.createElement("p");
    let alep = document.createTextNode("the cart is empty");
    ale.className = "ale";
    ale.appendChild(alep);
    cards.appendChild(ale);
  } else {
    summary.style.display = "block";
  }
}
clearstore();
