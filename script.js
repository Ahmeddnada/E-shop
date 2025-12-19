let addBtn = document.querySelectorAll(".addbtn");
let head = document.querySelectorAll(".info");

addBtn.forEach((btn) => {
  btn.addEventListener("click", function () {
    let card = btn.closest(".card");
    let price = card.querySelector(".price").textContent;
    let name = card.querySelector("h3").textContent;
    let image = card.querySelector("img").src;
    localStorage.setItem("price", price);
    localStorage.setItem("image", image);
    Swal.fire({
      title: "Good job!",
      text: `the '${name}' added to cart`,
      icon: "success",
    });
  });
});
