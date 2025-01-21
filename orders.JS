document.addEventListener("DOMContentLoaded", function () {
  const ordersList = document.getElementById("ordersList");
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  if (orders.length === 0) {
    ordersList.innerHTML = "<p>No orders found.</p>";
    return;
  }

  ordersList.innerHTML = orders
    .map(
      (order) => `
        <div class="order-card">
          <h3>Order ID: ${order.id}</h3>
          <p><strong>Shipping Address:</strong> ${order.shippingAddress}</p>
          <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
          <p><strong>Total Cost:</strong> $${order.total.toFixed(2)}</p>
          <p class="status"><strong>Status:</strong> ${order.status}</p>
        </div>
      `
    )
    .join("");
});
