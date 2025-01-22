document.addEventListener("DOMContentLoaded", function () {
  const paymentForm = document.getElementById("paymentForm");

  paymentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const cardNumber = document.getElementById("cardNumber").value;
    const expiryDate = document.getElementById("expiryDate").value;
    const cvv = document.getElementById("cvv").value;
    const cardHolder = document.getElementById("cardHolder").value;

    // التحقق من صحة البيانات
    if (!cardNumber || !expiryDate || !cvv || !cardHolder) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill in all fields!",
      });
      return;
    }

    // التحقق من صحة رقم البطاقة (مثال بسيط)
    if (cardNumber.length !== 16 || isNaN(cardNumber)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Card Number",
        text: "Please enter a valid 16-digit card number.",
      });
      return;
    }

    // التحقق من صحة تاريخ الانتهاء (مثال بسيط)
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Expiry Date",
        text: "Please enter a valid expiry date in the format MM/YY.",
      });
      return;
    }

    // التحقق من صحة CVV (مثال بسيط)
    if (cvv.length !== 3 || isNaN(cvv)) {
      Swal.fire({
        icon: "error",
        title: "Invalid CVV",
        text: "Please enter a valid 3-digit CVV.",
      });
      return;
    }

    // إذا كانت كل البيانات صحيحة، إتمام الدفع
    Swal.fire({
      icon: "success",
      title: "Payment Successful!",
      text: "Your payment has been processed successfully.",
    }).then(() => {
      // تحويل المستخدم إلى صفحة الطلبات
      window.location.href = "orders.html";
    });
  });
});
