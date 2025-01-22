document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const rememberMe = document.getElementById("rememberMe").checked;

      if (!email || !password) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in all fields!",
        });
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        if (rememberMe) {
          localStorage.setItem("rememberedUser", JSON.stringify(user));
        } else {
          localStorage.removeItem("rememberedUser");
        }

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Login successful!",
        }).then(() => {
          // توجيه المستخدم إلى الصفحة الرئيسية
          window.location.href = "index.html";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid email or password!",
        });
      }
    });
  }

  // التحقق من "تذكرني" عند تحميل الصفحة
  const rememberedUser = JSON.parse(localStorage.getItem("rememberedUser"));
  if (rememberedUser && window.location.pathname.includes("login.html")) {
    document.getElementById("email").value = rememberedUser.email;
    document.getElementById("password").value = rememberedUser.password;
    document.getElementById("rememberMe").checked = true;
  }
});
