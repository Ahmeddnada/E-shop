document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.querySelector(".cart-cards");
  const cartSummaryTotal = document.querySelector(".cart-summary .info p");
  const checkOutButton = document.querySelector(".check");

  // عرض المنتجات في السلة
  function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      cartSummaryTotal.textContent = "$0";
      return;
    }

    cartItemsContainer.innerHTML = cart
      .map(
        (product, index) => `
          <div class="cart-card" data-index="${index}">
            <button class="clear" onclick="removeProduct(${index})">
              <i class="fa-solid fa-trash"></i>
            </button>
            <p class="price">${product.price}$</p>
            <button class="minus" onclick="updateQuantity(${index}, -1)">
              <i class="fa-solid fa-minus"></i>
            </button>
            <div class="num"><p>${product.quantity}</p></div>
            <button class="plus" onclick="updateQuantity(${index}, 1)">
              <i class="fa-solid fa-plus"></i>
            </button>
            <img src="${product.image}" alt="${product.name}" />
          </div>
        `
      )
      .join("");

    updateCartTotal();
  }

  // تحديث الكمية
  window.updateQuantity = function (index, change) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const product = cart[index];

    if (product) {
      product.quantity += change;

      if (product.quantity < 1) {
        cart.splice(index, 1); // إزالة المنتج إذا كانت الكمية أقل من 1
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      displayCart(); // تحديث واجهة المستخدم دون إعادة تحميل الصفحة
      updateCartCount(); // تحديث عدد العناصر في السلة
    }
  };

  // حذف المنتج
  window.removeProduct = function (index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart(); // تحديث واجهة المستخدم دون إعادة تحميل الصفحة
    updateCartCount(); // تحديث عدد العناصر في السلة
  };

  // تحديث المجموع الكلي
  function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
    cartSummaryTotal.textContent = `$${total.toFixed(2)}`;
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

  // حساب تكلفة الشحن
  document
    .getElementById("shippingAddress")
    .addEventListener("input", function () {
      const address = this.value;
      let shippingCost = 0;

      // حساب تكلفة الشحن بناءً على المنطقة
      if (address.includes("Cairo")) {
        shippingCost = 5; // تكلفة الشحن للقاهرة
      } else if (address.includes("Alexandria")) {
        shippingCost = 7; // تكلفة الشحن للإسكندرية
      } else {
        shippingCost = 10; // تكلفة الشحن لباقي المناطق
      }

      document.getElementById("shippingCost").textContent = `$${shippingCost}`;
    });

  // زر Check Out
  checkOutButton.addEventListener("click", function () {
    const shippingAddress = document.getElementById("shippingAddress").value;
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
      Swal.fire({
        icon: "error",
        title: "Your cart is empty!",
        text: "Please add items to your cart before proceeding to checkout.",
      });
      return;
    }

    if (!shippingAddress || shippingAddress.trim() === "") {
      Swal.fire({
        icon: "error",
        title: "Shipping address is required!",
        text: "Please enter a valid shipping address.",
      });
      return;
    }

    // حفظ عنوان الشحن في localStorage
    localStorage.setItem("shippingAddress", shippingAddress);

    // تحويل المستخدم إلى صفحة الدفع
    window.location.href = "payment.html";
  });

  // استدعاء الدوال عند تحميل الصفحة
  displayCart();
  updateCartCount();
});
