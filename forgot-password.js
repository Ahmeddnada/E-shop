document.addEventListener("DOMContentLoaded", function () {
  const forgotPasswordForm = document.getElementById("forgotPasswordForm");

  forgotPasswordForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;

    // التحقق من وجود البريد الإلكتروني في قاعدة البيانات (localStorage)
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email);

    if (user) {
      // إرسال رابط استعادة كلمة المرور (هنا يمكنك إضافة إرسال بريد إلكتروني)
      Swal.fire({
        icon: "success",
        title: "تم إرسال رابط استعادة كلمة المرور",
        text: "تحقق من بريدك الإلكتروني لإعادة تعيين كلمة المرور.",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "البريد الإلكتروني غير موجود",
        text: "يرجى التحقق من البريد الإلكتروني المدخل.",
      });
    }
  });
});
