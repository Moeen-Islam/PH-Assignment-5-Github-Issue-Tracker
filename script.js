const loginForm = document.getElementById("loginForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

const usernameError = document.getElementById("usernameError");
const passwordError = document.getElementById("passwordError");
const loginError = document.getElementById("loginError");

function showError(input, errorElement, message) {
  input.classList.add("border-red-500");
  errorElement.textContent = message;
  errorElement.classList.remove("hidden");
}

function clearError(input, errorElement) {
  input.classList.remove("border-red-500");
  errorElement.textContent = "";
  errorElement.classList.add("hidden");
}

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const usernameValue = usernameInput.value.trim();
  const passwordValue = passwordInput.value.trim();

  let hasError = false;

  clearError(usernameInput, usernameError);
  clearError(passwordInput, passwordError);
  loginError.classList.add("hidden");
  loginError.textContent = "";

  if (usernameValue === "") {
    showError(usernameInput, usernameError, "Username is required");
    hasError = true;
  }

  if (passwordValue === "") {
    showError(passwordInput, passwordError, "Password is required");
    hasError = true;
  }

  if (hasError) {
    return;
  }

  if (usernameValue === "admin" && passwordValue === "admin123") {
    window.location.assign("./home.html");
  } else {
    loginError.textContent = "Invalid username or password";
    loginError.classList.remove("hidden");
  }
});

usernameInput.addEventListener("input", function () {
  if (usernameInput.value.trim() !== "") {
    clearError(usernameInput, usernameError);
  }
});

passwordInput.addEventListener("input", function () {
  if (passwordInput.value.trim() !== "") {
    clearError(passwordInput, passwordError);
  }
});