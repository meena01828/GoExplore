 
//index
document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const showSignup = document.getElementById("showSignup");
  const showLogin = document.getElementById("showLogin");

  // Toggle to signup
  if (showSignup) {
    showSignup.addEventListener("click", (e) => {
      e.preventDefault();
      loginForm.classList.add("hidden");
      signupForm.classList.remove("hidden");
    });
  }

  // Toggle to login
  if (showLogin) {
    showLogin.addEventListener("click", (e) => {
      e.preventDefault();
      signupForm.classList.add("hidden");
      loginForm.classList.remove("hidden");
    });
  }

  // Signup custom alert
  const signupFormElement = document.getElementById("signupFormElement");
  if (signupFormElement) {
    signupFormElement.addEventListener("submit", (e) => {
      e.preventDefault();
      showAlert("Signup successful!", "../html/home.html");
    });
  }

  // Login custom alert
  const loginFormElement = document.getElementById("loginFormElement");
  if (loginFormElement) {
    loginFormElement.addEventListener("submit", (e) => {
      e.preventDefault();
      showAlert("Login successful!", "../html/home.html");
    });
  }
});

// Custom Alert Functions
function showAlert(message, redirectUrl = null) {
  document.getElementById("alertMessage").innerText = message;
  const alertBox = document.getElementById("customAlert");
  alertBox.style.display = "flex";

  // Store redirect URL (if any)
  alertBox.setAttribute("data-redirect", redirectUrl);
}

function closeAlert() {
  const alertBox = document.getElementById("customAlert");
  const redirectUrl = alertBox.getAttribute("data-redirect");
  alertBox.style.display = "none";

  // Redirect if provided
  if (redirectUrl) {
    window.location.href = redirectUrl;
  }
}
