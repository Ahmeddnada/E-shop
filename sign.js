document.addEventListener("DOMContentLoaded", function () {
  const signupForm = document.getElementById("signupForm");

  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const confirmPassword = document.getElementById("confirmPassword").value;

      if (!firstName || !lastName || !email || !password || !confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill in all fields!",
        });
        return;
      }

      if (password !== confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Passwords do not match!",
        });
        return;
      }

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const userExists = users.some((u) => u.email === email);

      if (userExists) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User already exists!",
        });
        return;
      }

      const newUser = {
        firstName,
        lastName,
        email,
        password,
        isAdmin: false, // المستخدم العادي ليس ادمن
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Registration successful!",
      }).then(() => {
        window.location.href = "login.html"; // توجيه المستخدم إلى صفحة تسجيل الدخول
      });
    });
  }
});
