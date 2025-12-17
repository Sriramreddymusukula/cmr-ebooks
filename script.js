/* =========================
   REGISTRATION
========================= */
const registerForm = document.querySelector("form");

if (registerForm && document.title.includes("Registration")) {
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = registerForm.querySelectorAll("input");
    const name = inputs[0].value.trim();
    const email = inputs[1].value.trim();
    const password = inputs[2].value;
    const confirmPassword = inputs[3].value;
    const phone = inputs[4].value.trim();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const user = { name, email, password, phone };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration successful! Please login.");
    window.location.href = "login.html";
  });
}

/* =========================
   LOGIN
========================= */
const loginForm = document.querySelector("form");

if (loginForm && document.title.includes("Login")) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No user found. Please register first.");
      return;
    }

    if (email === storedUser.email && password === storedUser.password) {
      alert("Login successful!");
      window.location.href = "cart.html";
    } else {
      alert("Invalid email or password");
    }
  });
}

/* =========================
   CART CALCULATION
========================= */
if (document.title.includes("Cart")) {
  const rows = document.querySelectorAll("tbody tr");
  let totalQty = 0;
  let totalAmount = 0;

  rows.forEach((row, index) => {
    if (index < rows.length - 1) {
      const priceText = row.children[1].innerText;
      const qty = parseInt(row.children[2].innerText);

      const price = parseInt(priceText.replace(/\D/g, ""));
      const amount = price * qty;

      row.children[3].innerText = `Rs. ${amount}/-`;

      totalQty += qty;
      totalAmount += amount;
    }
  });

  const totalRow = rows[rows.length - 1];
  totalRow.children[2].innerText = totalQty;
  totalRow.children[3].innerText = `Rs. ${totalAmount}/-`;
}
