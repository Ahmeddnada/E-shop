document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find((p) => p.id == productId);

    if (product) {
      // عرض تفاصيل المنتج
      document.getElementById("mainImage").src = product.image;
      document.getElementById("productName").textContent = product.name;
      document.getElementById("productPrice").textContent = `$${product.price}`;
      document.getElementById("productDescription").textContent =
        product.description;

      // عرض السعر المخفض إذا كان هناك خصم
      if (product.discount) {
        const discountedPrice = applyDiscount(product.price, product.discount);
        document.getElementById(
          "discountedPrice"
        ).textContent = `Discounted Price: $${discountedPrice.toFixed(2)}`;
      }

      // عرض الصور المصغرة
      const thumbnailImages = document.getElementById("thumbnailImages");
      if (product.thumbnails && product.thumbnails.length > 0) {
        product.thumbnails.forEach((thumbnail) => {
          const img = document.createElement("img");
          img.src = thumbnail;
          img.alt = product.name;
          img.onclick = () => {
            document.getElementById("mainImage").src = thumbnail;
          };
          thumbnailImages.appendChild(img);
        });
      }

      // عرض المراجعات
      displayReviews(productId);

      // عرض المنتجات ذات الصلة
      displayRelatedProducts(productId);

      // إضافة مراجعة جديدة
      const reviewForm = document.getElementById("reviewForm");
      reviewForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const rating = document.getElementById("rating").value;
        const reviewText = document.getElementById("reviewText").value;
        addReview(productId, rating, reviewText);
        displayReviews(productId);
        reviewForm.reset();
      });
    }
  }
});

// تطبيق الخصم على السعر
function applyDiscount(price, discount) {
  return price - (price * discount) / 100;
}

// إضافة مراجعة جديدة
function addReview(productId, rating, reviewText) {
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews.push({ productId, rating, reviewText });
  localStorage.setItem("reviews", JSON.stringify(reviews));
}

// عرض المراجعات
function displayReviews(productId) {
  const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  const productReviews = reviews.filter(
    (review) => review.productId === productId
  );
  const reviewsContainer = document.getElementById("reviewsContainer");

  if (productReviews.length === 0) {
    reviewsContainer.innerHTML =
      "<p>No reviews yet. Be the first to review!</p>";
    return;
  }

  reviewsContainer.innerHTML = productReviews
    .map(
      (review) => `
      <div class="review">
        <p>Rating: ${review.rating}/5</p>
        <p>${review.reviewText}</p>
      </div>
    `
    )
    .join("");
}

// الحصول على المنتجات ذات الصلة
function getRelatedProducts(productId) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  const currentProduct = products.find((p) => p.id == productId);
  const relatedProducts = products.filter(
    (p) => p.category === currentProduct.category && p.id != productId
  );
  return relatedProducts.slice(0, 4); // عرض 4 منتجات ذات صلة كحد أقصى
}

// عرض المنتجات ذات الصلة
function displayRelatedProducts(productId) {
  const relatedProducts = getRelatedProducts(productId);
  const relatedProductsContainer = document.getElementById("relatedProducts");
  relatedProductsContainer.innerHTML = relatedProducts
    .map(
      (product) => `
      <div class="related-product">
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
        <a href="short.html?id=${product.id}">View Details</a>
      </div>
    `
    )
    .join("");
}

// إضافة المنتج إلى السلة
function addToCart() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const product = products.find((p) => p.id == productId);

    if (product) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingProduct = cart.find((item) => item.id == productId);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      Swal.fire({
        icon: "success",
        title: "تمت الإضافة إلى السلة!",
        text: `تمت إضافة ${product.name} إلى سلة التسوق.`,
      }).then(() => {
        window.location.href = "cart.html"; // توجيه المستخدم إلى صفحة السلة
      });
    }
  }
}
