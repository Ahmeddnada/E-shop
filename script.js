// تطبيق الفلترة
function applyFilters() {
  const searchQuery = document
    .getElementById("searchQuery")
    .value.toLowerCase();
  const categoryFilter = document.getElementById("categoryFilter").value;
  const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
  const maxPrice =
    parseFloat(document.getElementById("maxPrice").value) || Infinity;
  const sortBy = document.getElementById("sortBy").value;

  const products = JSON.parse(localStorage.getItem("products")) || [];
  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery);
    const matchesCategory = categoryFilter
      ? product.category === categoryFilter
      : true;
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // الفرز حسب السعر أو التقييم
  if (sortBy === "priceLowToHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "priceHighToLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  displayProducts(filteredProducts);
}

// عرض المنتجات بعد الفلترة
function displayProducts(products) {
  const productCards = document.getElementById("productCards");

  if (products.length === 0) {
    productCards.innerHTML = "<p>No products found.</p>";
    return;
  }

  productCards.innerHTML = products
    .map(
      (product) => `
      <div class="card">
        <figure>
          <a href="short.html?id=${product.id}">
            <img src="${product.image}" alt="${product.name}" />
          </a>
        </figure>
        <figcaption class="info">
          <h3>${product.name}</h3>
          <p>${product.description || "No description available."}</p>
          <div class="p-info">
            <p class="price">$${product.price}</p>
            <button class="add-to-cart" data-name="${
              product.name
            }" data-price="${product.price}" data-image="${product.image}">
              <i class="fa-solid fa-cart-shopping"></i> Add to Cart
            </button>
          </div>
        </figcaption>
      </div>
    `
    )
    .join("");

  // إعادة إضافة مستمعات الأحداث للأزرار الجديدة
  const newAddToCartButtons = document.querySelectorAll(".add-to-cart");
  newAddToCartButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const productName = button.getAttribute("data-name");
      const productPrice = button.getAttribute("data-price");
      const productImage = button.getAttribute("data-image");

      const product = {
        name: productName,
        price: parseFloat(productPrice),
        image: productImage,
        quantity: 1,
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingProduct = cart.find((item) => item.name === productName);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      // عرض رسالة تأكيد باستخدام SweetAlert2
      Swal.fire({
        icon: "success",
        title: "تمت الإضافة إلى السلة!",
        text: `تمت إضافة ${productName} إلى سلة التسوق.`,
        confirmButtonText: "حسنًا",
      });

      // تحديث عدد العناصر في السلة
      updateCartCount();
    });
  });
}

// تحديث عدد العناصر في السلة
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );
  const cartCountElement = document.querySelector(".cart-count");

  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
}

// استدعاء الدوال عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function () {
  displayProducts(JSON.parse(localStorage.getItem("products")) || []);
  updateCartCount();
});
