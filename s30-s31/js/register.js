const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmError = document.getElementById("confirmError");

email.addEventListener("input", () => {
  emailError.style.display = email.value.includes("@") ? "none" : "block";
});

password.addEventListener("input", () => {
  passwordError.style.display = password.value.length >= 8 ? "none" : "block";
});

confirmPassword.addEventListener("input", () => {
  confirmError.style.display =
    confirmPassword.value === password.value ? "none" : "block";
});

const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (
    email.value.includes("@") &&
    password.value.length >= 8 &&
    password.value === confirmPassword.value
  ) {
    try {
      const res = await fetch(
        "https://movieapp-api-lms1.onrender.com/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        },
      );

      const data = await res.json();
      console.log(data);

      if (data.message === "Registered Successfully") {
        alert("🎉 Registered Successfully!");
      } else {
        alert("⚠️ Registration failed.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Error connecting to server.");
    }
  } else {
    alert("❌ Please fix the errors before submitting.");
  }
});
