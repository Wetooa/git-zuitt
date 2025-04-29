// Form elements
const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const rememberMe = document.getElementById("remember");

// Error elements
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

// Base API URL
const API_URL = "https://movieapp-api-lms1.onrender.com";

/**
 * Validate email with a more comprehensive regex
 * @param {string} email - Email to validate
 * @returns {boolean} Whether email is valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate password meets minimum requirements
 * @param {string} password - Password to validate
 * @returns {boolean} Whether password is valid
 */
function isValidPassword(password) {
  return password.length >= 8;
}

/**
 * Show error message with animation
 * @param {HTMLElement} input - Input element
 * @param {HTMLElement} errorElement - Error message element
 * @param {boolean} isValid - Whether input is valid
 */
function showValidationFeedback(input, errorElement, isValid) {
  if (isValid) {
    errorElement.style.display = "none";
    input.style.borderColor = "#22c55e";
  } else {
    errorElement.style.display = "block";
    input.style.borderColor = "#dc2626";
    input.classList.add("shake-animation");
    // Remove animation class after animation completes
    setTimeout(() => {
      input.classList.remove("shake-animation");
    }, 500);
  }
}

/**
 * Save credentials to localStorage if remember me is checked
 */
function saveCredentials() {
  if (rememberMe.checked) {
    localStorage.setItem("zuitt_email", email.value);
    // Note: In a production app, you would NOT store the password in localStorage
    // This is just for demonstration purposes
    // A more secure approach would use a session token or JWT
  } else {
    localStorage.removeItem("zuitt_email");
    localStorage.removeItem("zuitt_password");
  }
}

/**
 * Load saved credentials if available
 */
function loadSavedCredentials() {
  const savedEmail = localStorage.getItem("zuitt_email");
  if (savedEmail) {
    email.value = savedEmail;
    rememberMe.checked = true;
  }
}

/**
 * Display a custom toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type of notification (success, error, warning)
 */
function showNotification(message, type = "info") {
  // Remove any existing notification
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Add to DOM
  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  // Auto-hide after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

/**
 * Disable form elements during submission
 * @param {boolean} isDisabled - Whether to disable form elements
 */
function setFormDisabled(isDisabled) {
  const formElements = loginForm.elements;

  for (let i = 0; i < formElements.length; i++) {
    formElements[i].disabled = isDisabled;
  }

  const submitBtn = loginForm.querySelector(".btn-submit");
  if (isDisabled) {
    submitBtn.textContent = "Logging in...";
    submitBtn.style.opacity = "0.7";
  } else {
    submitBtn.textContent = "Login";
    submitBtn.style.opacity = "1";
  }
}

/**
 * Handle login form submission
 * @param {Event} e - Form submission event
 */
async function handleLogin(e) {
  e.preventDefault();

  // Validate form inputs
  const isEmailValid = isValidEmail(email.value);
  const isPasswordValid = isValidPassword(password.value);

  showValidationFeedback(email, emailError, isEmailValid);
  showValidationFeedback(password, passwordError, isPasswordValid);

  if (isEmailValid && isPasswordValid) {
    try {
      setFormDisabled(true);

      const res = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value.trim(),
          password: password.value,
        }),
      });

      const data = await res.json();

      if (data.accessToken) {
        // Save token in localStorage (or sessionStorage for more security)
        localStorage.setItem("zuitt_token", data.accessToken);

        // Save user info if available
        if (data.user) {
          localStorage.setItem("zuitt_user", JSON.stringify(data.user));
        }

        // Save credentials if remember me is checked
        saveCredentials();

        // Show success notification
        showNotification("Login successful! Redirecting...", "success");

        // Redirect after a brief delay
        setTimeout(() => {
          window.location.href = "./movies.html";
        }, 1000);
      } else {
        showNotification(
          data.message || "Login failed. Please check your credentials.",
          "error",
        );
        setFormDisabled(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      showNotification(
        "Error connecting to server. Please try again later.",
        "error",
      );
      setFormDisabled(false);
    }
  } else {
    showNotification("Please fix the form errors and try again.", "warning");
  }
}

// Event Listeners
document.addEventListener("DOMContentLoaded", loadSavedCredentials);

email.addEventListener("input", () => {
  if (email.value) {
    showValidationFeedback(email, emailError, isValidEmail(email.value));
  } else {
    // Reset validation styling if field is empty
    email.style.borderColor = "";
    emailError.style.display = "none";
  }
});

password.addEventListener("input", () => {
  if (password.value) {
    showValidationFeedback(
      password,
      passwordError,
      isValidPassword(password.value),
    );
  } else {
    // Reset validation styling if field is empty
    password.style.borderColor = "";
    passwordError.style.display = "none";
  }
});

// Toggle password visibility
togglePassword.addEventListener("click", () => {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  togglePassword.textContent = type === "password" ? "👁️" : "🔒";
});

// Handle form submission
loginForm.addEventListener("submit", handleLogin);

// Add CSS for notifications
const style = document.createElement("style");
style.textContent = `
  .notification {
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 15px 20px;
    border-radius: 8px;
    background-color: #f8f9fa;
    color: #333;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1000;
    opacity: 0;
    transform: translateY(-20px);
    transition: opacity 0.3s, transform 0.3s;
    max-width: 300px;
  }
  
  .notification.show {
    opacity: 1;
    transform: translateY(0);
  }
  
  .notification.success {
    background-color: #d1e7dd;
    color: #0f5132;
    border-left: 4px solid #198754;
  }
  
  .notification.error {
    background-color: #f8d7da;
    color: #842029;
    border-left: 4px solid #dc3545;
  }
  
  .notification.warning {
    background-color: #fff3cd;
    color: #664d03;
    border-left: 4px solid #ffc107;
  }
  
  .notification.info {
    background-color: #cff4fc;
    color: #055160;
    border-left: 4px solid #0dcaf0;
  }
  
  .shake-animation {
    animation: shake 0.3s;
  }
`;
document.head.appendChild(style);
