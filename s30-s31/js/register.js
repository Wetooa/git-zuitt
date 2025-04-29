// Form elements
const registerForm = document.getElementById("registerForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");
const togglePassword = document.getElementById("togglePassword");
const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

// Error and indicator elements
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");
const termsError = document.getElementById("termsError");
const passwordStrength = document.getElementById("passwordStrength");
const strengthBar = document.querySelector(".strength-bar");
const strengthText = document.querySelector(".strength-text");

// Base API URL
const API_URL = "https://movieapp-api-lms1.onrender.com";

/**
 * Validate full name
 * @param {string} name - Name to validate
 * @returns {boolean} Whether name is valid
 */
function isValidName(name) {
  return name.trim().length >= 2; // At least 2 characters
}

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
 * Check if passwords match
 * @param {string} password - Main password
 * @param {string} confirmPassword - Confirmation password
 * @returns {boolean} Whether passwords match
 */
function passwordsMatch(password, confirmPassword) {
  return password === confirmPassword && password !== "";
}

/**
 * Calculate password strength score (0-100)
 * @param {string} password - Password to evaluate
 * @returns {number} Strength score from 0-100
 */
function getPasswordStrength(password) {
  if (!password) return 0;

  let score = 0;

  // Length check (up to 40 points)
  score += Math.min(password.length * 5, 40);

  // Character variety checks
  if (/[A-Z]/.test(password)) score += 15; // Uppercase
  if (/[a-z]/.test(password)) score += 10; // Lowercase
  if (/[0-9]/.test(password)) score += 15; // Numbers
  if (/[^A-Za-z0-9]/.test(password)) score += 20; // Special characters

  // Extra checks
  const hasRepeatingChars = /(.)\1{2,}/.test(password); // 3+ repeating chars
  if (hasRepeatingChars) score -= 15;

  const isCommonPassword = ["password", "123456", "qwerty", "welcome"].includes(
    password.toLowerCase(),
  );
  if (isCommonPassword) score = Math.min(score, 20);

  return Math.max(0, Math.min(score, 100)); // Clamp score between 0-100
}

/**
 * Update password strength indicator
 * @param {string} password - Password to evaluate
 */
function updatePasswordStrength(password) {
  const score = getPasswordStrength(password);

  // Create strength classes based on score
  let strengthClass = "";
  let strengthLabel = "";

  if (score < 40) {
    strengthClass = "weak";
    strengthLabel = "weak";
  } else if (score < 70) {
    strengthClass = "medium";
    strengthLabel = "medium";
  } else {
    strengthClass = "strong";
    strengthLabel = "strong";
  }

  // Remove all classes and add the appropriate one
  strengthBar.classList.remove("weak", "medium", "strong");
  strengthBar.classList.add(strengthClass);

  // Update width
  strengthBar.style.width = `${score}%`;

  // Update text
  strengthText.textContent = `Password strength: ${strengthLabel}`;

  // Ensure the password strength meter is visible
  passwordStrength.style.display = password ? "block" : "none";
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
  const formElements = registerForm.elements;

  for (let i = 0; i < formElements.length; i++) {
    formElements[i].disabled = isDisabled;
  }

  const submitBtn = registerForm.querySelector(".btn-submit");
  if (isDisabled) {
    submitBtn.textContent = "Creating account...";
    submitBtn.style.opacity = "0.7";
  } else {
    submitBtn.textContent = "Create Account";
    submitBtn.style.opacity = "1";
  }
}

/**
 * Validate all form fields
 * @returns {boolean} Whether all fields are valid
 */
function validateForm() {
  const isNameValid = isValidName(fullName.value);
  const isEmailValid = isValidEmail(email.value);
  const isPasswordValid = isValidPassword(password.value);
  const isConfirmValid = passwordsMatch(password.value, confirmPassword.value);
  const isTermsChecked = terms.checked;

  showValidationFeedback(fullName, nameError, isNameValid);
  showValidationFeedback(email, emailError, isEmailValid);
  showValidationFeedback(password, passwordError, isPasswordValid);
  showValidationFeedback(confirmPassword, confirmError, isConfirmValid);

  // Special handling for terms checkbox
  if (isTermsChecked) {
    termsError.style.display = "none";
  } else {
    termsError.style.display = "block";
  }

  return (
    isNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmValid &&
    isTermsChecked
  );
}

/**
 * Handle registration form submission
 * @param {Event} e - Form submission event
 */
async function handleRegistration(e) {
  e.preventDefault();

  if (validateForm()) {
    try {
      setFormDisabled(true);

      // Check if email is already registered
      const res = await fetch(`${API_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName.value.trim(),
          email: email.value.trim(),
          password: password.value,
        }),
      });

      const data = await res.json();

      if (data.message === "Registered Successfully") {
        showNotification(
          "Account created successfully! Redirecting to login...",
          "success",
        );

        // Redirect to login page after a brief delay
        setTimeout(() => {
          window.location.href = "./login.html";
        }, 1500);
      } else {
        showNotification(
          data.message || "Registration failed. Please try again.",
          "error",
        );
        setFormDisabled(false);
      }
    } catch (err) {
      console.error("Registration error:", err);
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
fullName.addEventListener("input", () => {
  if (fullName.value) {
    showValidationFeedback(fullName, nameError, isValidName(fullName.value));
  } else {
    fullName.style.borderColor = "";
    nameError.style.display = "none";
  }
});

email.addEventListener("input", () => {
  if (email.value) {
    showValidationFeedback(email, emailError, isValidEmail(email.value));
  } else {
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
    updatePasswordStrength(password.value);

    // If confirm password has value, check if they still match
    if (confirmPassword.value) {
      showValidationFeedback(
        confirmPassword,
        confirmError,
        passwordsMatch(password.value, confirmPassword.value),
      );
    }
  } else {
    password.style.borderColor = "";
    passwordError.style.display = "none";
    passwordStrength.style.display = "none";
  }
});

confirmPassword.addEventListener("input", () => {
  if (confirmPassword.value || password.value) {
    showValidationFeedback(
      confirmPassword,
      confirmError,
      passwordsMatch(password.value, confirmPassword.value),
    );
  } else {
    confirmPassword.style.borderColor = "";
    confirmError.style.display = "none";
  }
});

// Toggle password visibility
togglePassword.addEventListener("click", () => {
  const type =
    password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  togglePassword.textContent = type === "password" ? "👁️" : "🔒";
});

toggleConfirmPassword.addEventListener("click", () => {
  const type =
    confirmPassword.getAttribute("type") === "password" ? "text" : "password";
  confirmPassword.setAttribute("type", type);
  toggleConfirmPassword.textContent = type === "password" ? "👁️" : "🔒";
});

// Handle form submission
registerForm.addEventListener("submit", handleRegistration);

// Add CSS for notifications and fix password strength display
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
  
  /* Password strength indicator styles */
  .password-strength {
    display: block;
    width: 100%;
    height: 5px;
    background-color: #e5e7eb;
    border-radius: 2px;
    margin-top: 8px;
    overflow: hidden;
  }
  
  .strength-bar {
    height: 100%;
    width: 0;
    border-radius: 2px;
    transition: width 0.3s ease, background-color 0.3s ease;
  }
  
  .strength-bar.weak {
    background-color: #dc2626;
  }
  
  .strength-bar.medium {
    background-color: #facc15;
  }
  
  .strength-bar.strong {
    background-color: #22c55e;
  }
  
  .strength-text {
    display: block;
    margin-top: 5px;
    font-size: 0.8rem;
    color: #666;
  }
`;
document.head.appendChild(style);
