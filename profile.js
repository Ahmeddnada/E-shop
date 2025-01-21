document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("rememberedUser")) || {};
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const addressList = document.getElementById("addressList");
  const recentOrders = document.getElementById("recentOrders");
  const editProfileBtn = document.getElementById("editProfileBtn");
  const addAddressBtn = document.getElementById("addAddressBtn");
  const logoutButton = document.getElementById("logoutButton");

  // عرض معلومات المستخدم
  if (user.firstName && user.lastName) {
    document.getElementById("userName").textContent =
      user.firstName + " " + user.lastName;
  } else {
    document.getElementById("userName").textContent = "Guest";
  }

  if (user.email) {
    document.getElementById("userEmail").textContent = user.email;
  } else {
    document.getElementById("userEmail").textContent = "No email provided";
  }

  // عرض العناوين
  const addresses = JSON.parse(localStorage.getItem("addresses")) || [];
  if (addresses.length === 0) {
    addressList.innerHTML = "<p>No addresses found.</p>";
  } else {
    addressList.innerHTML = addresses
      .map(
        (address, index) => `
          <li>
            ${address}
            <button onclick="deleteAddress(${index})">Delete</button>
          </li>
        `
      )
      .join("");
  }

  // عرض الطلبات الأخيرة
  if (orders.length === 0) {
    recentOrders.innerHTML = "<p>No recent orders.</p>";
  } else {
    recentOrders.innerHTML = orders
      .map(
        (order) => `
          <div class="order-card">
            <h4>Order ID: ${order.id}</h4>
            <p>Total Cost: $${order.total.toFixed(2)}</p>
            <p class="status">Status: ${order.status}</p>
          </div>
        `
      )
      .join("");
  }

  // تعديل الملف الشخصي
  editProfileBtn.addEventListener("click", function () {
    Swal.fire({
      title: "Edit Profile",
      html:
        '<input id="swal-firstName" class="swal2-input" placeholder="First Name" value="' +
        user.firstName +
        '">' +
        '<input id="swal-lastName" class="swal2-input" placeholder="Last Name" value="' +
        user.lastName +
        '">' +
        '<input id="swal-email" class="swal2-input" placeholder="Email" value="' +
        user.email +
        '">',
      focusConfirm: false,
      preConfirm: () => {
        const firstName = document.getElementById("swal-firstName").value;
        const lastName = document.getElementById("swal-lastName").value;
        const email = document.getElementById("swal-email").value;

        if (!firstName || !lastName || !email) {
          Swal.showValidationMessage("Please fill in all fields");
          return false;
        }

        return { firstName, lastName, email };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        user.firstName = result.value.firstName;
        user.lastName = result.value.lastName;
        user.email = result.value.email;

        localStorage.setItem("rememberedUser", JSON.stringify(user));
        location.reload(); // إعادة تحميل الصفحة لتحديث البيانات

        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Your profile has been updated successfully.",
        });
      }
    });
  });

  // إضافة عنوان جديد
  addAddressBtn.addEventListener("click", function () {
    Swal.fire({
      title: "Add New Address",
      input: "text",
      inputPlaceholder: "Enter your new address",
      showCancelButton: true,
      confirmButtonText: "Add",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "Please enter a valid address!";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        addresses.push(result.value);
        localStorage.setItem("addresses", JSON.stringify(addresses));
        location.reload(); // إعادة تحميل الصفحة لتحديث البيانات

        Swal.fire({
          icon: "success",
          title: "Address Added!",
          text: "Your new address has been added successfully.",
        });
      }
    });
  });

  // تسجيل الخروج
  logoutButton.addEventListener("click", function () {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out of your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log out",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("rememberedUser");
        window.location.href = "login.html";
      }
    });
  });
});

// حذف العنوان
window.deleteAddress = function (index) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      const addresses = JSON.parse(localStorage.getItem("addresses")) || [];
      addresses.splice(index, 1);
      localStorage.setItem("addresses", JSON.stringify(addresses));
      location.reload(); // إعادة تحميل الصفحة لتحديث البيانات

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Your address has been deleted.",
      });
    }
  });
};
