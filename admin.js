document.addEventListener("DOMContentLoaded", function () {
  const addProductBtn = document.getElementById("addProductBtn");
  const modal = document.getElementById("addProductModal");
  const closeBtn = document.querySelector(".close");
  const addProductForm = document.getElementById("addProductForm");
  const productList = document.getElementById("productList");

  addProductBtn.addEventListener("click", function () {
    modal.style.display = "block";
  });

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
  });

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  addProductForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const productName = document.getElementById("productName").value;
    const productPrice = document.getElementById("productPrice").value;
    const productDescription =
      document.getElementById("productDescription").value;
    const productCategory = document.getElementById("productCategory").value;
    const productImageInput = document.getElementById("productImage");

    const productImageFile = productImageInput.files[0];
    if (!productImageFile) {
      alert("Please select an image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      const productImage = e.target.result;

      const product = {
        id: Date.now(), // معرف فريد
        name: productName,
        price: productPrice,
        description: productDescription,
        category: productCategory,
        image: productImage,
      };

      let products = JSON.parse(localStorage.getItem("products")) || [];
      products.push(product);
      localStorage.setItem("products", JSON.stringify(products));

      modal.style.display = "none";
      displayProducts();
    };

    reader.readAsDataURL(productImageFile);
  });

  function displayProducts() {
    productList.innerHTML = "";
    const products = JSON.parse(localStorage.getItem("products")) || [];

    products.forEach((product, index) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";

      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p><strong>Category:</strong> ${product.category}</p>
        <p class="price">$${product.price}</p>
        <button onclick="editProduct(${index})" class="edit">Edit</button>
        <button onclick="deleteProduct(${index})" class="delete">Delete</button>
      `;

      productList.appendChild(productCard);
    });
  }

  window.deleteProduct = function (index) {
    let products = JSON.parse(localStorage.getItem("products")) || [];
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
  };

  window.editProduct = function (index) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products[index];

    if (!product) {
      alert("Product not found.");
      return;
    }

    document.getElementById("productName").value = product.name;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productDescription").value = product.description;
    document.getElementById("productCategory").value = product.category;

    modal.style.display = "block";

    addProductForm.onsubmit = function (e) {
      e.preventDefault();

      product.name = document.getElementById("productName").value;
      product.price = document.getElementById("productPrice").value;
      product.description = document.getElementById("productDescription").value;
      product.category = document.getElementById("productCategory").value;

      // تحديث الصورة إذا تم تحميل صورة جديدة
      const productImageInput = document.getElementById("productImage");
      if (productImageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
          product.image = e.target.result;
          localStorage.setItem("products", JSON.stringify(products));
          modal.style.display = "none";
          displayProducts();
        };
        reader.readAsDataURL(productImageInput.files[0]);
      } else {
        localStorage.setItem("products", JSON.stringify(products));
        modal.style.display = "none";
        displayProducts();
      }
    };
  };

  displayProducts();
});
