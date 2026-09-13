// ================================
// REGISTER
// ================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const message = document.getElementById("message");

    message.textContent = "Creating your account...";

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        message.textContent = data.message || "Registration failed.";
        return;
      }

      message.textContent = "Account created successfully!";

      // Registration के बाद dashboard
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);

    } catch (error) {
      console.error(error);

      message.textContent =
        "Unable to connect to the server.";
    }
  });
}


// ================================
// LOGIN
// ================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    const message = document.getElementById("loginMessage");

    message.textContent = "Logging in...";

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        message.textContent = data.message || "Login failed.";
        return;
      }

      message.textContent = "Login successful!";

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 500);

    } catch (error) {
      console.error(error);

      message.textContent =
        "Unable to connect to the server.";
    }
  });
}


// ================================
// DASHBOARD
// ================================

const userName = document.getElementById("userName");

if (userName) {
  loadDashboard();
}


async function loadDashboard() {

  try {

    const response = await fetch("/api/me", {
      credentials: "include"
    });

    if (!response.ok) {

      window.location.href = "/login.html";

      return;
    }

    const data = await response.json();

    document.getElementById("userName").textContent =
      data.user.name;

    document.getElementById("userEmail").textContent =
      data.user.email;

    const date = new Date(data.user.created_at);

    document.getElementById("createdAt").textContent =
      date.toLocaleDateString();

  } catch (error) {

    console.error(error);

    window.location.href = "/login.html";
  }
}


// ================================
// LOGOUT
// ================================

const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

  logoutBtn.addEventListener("click", async () => {

    try {

      await fetch("/api/logout", {
        method: "POST",
        credentials: "include"
      });

      window.location.href = "/login.html";

    } catch (error) {

      console.error(error);

      window.location.href = "/login.html";
    }

  });

}
