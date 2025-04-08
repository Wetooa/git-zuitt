const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const mobileInput = document.getElementById("mobileNumber");

const fullNameDisplay = document.getElementById("fullNamePreview");
const emailDisplay = document.getElementById("emailPreview");
const mobileDisplay = document.getElementById("mobileNumberPreview");

function updatePreview() {
  console.log("Updating preview...");

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();
  const mobileNumber = mobileInput.value.trim();

  fullNameDisplay.textContent = `${firstName} ${lastName}`.trim();
  emailDisplay.textContent = email;

  if (mobileNumber && !isValidNumber(mobileNumber)) {
    mobileDisplay.textContent = "Invalid mobile number!";
    mobileDisplay.style.color = "red";
  } else {
    mobileDisplay.textContent = mobileInput.value.trim();
    mobileDisplay.style.color = "black";
  }
}

function isValidNumber(number) {
  return /^0\d{10}/.test(number);
}

firstNameInput.addEventListener("input", updatePreview);
lastNameInput.addEventListener("input", updatePreview);
emailInput.addEventListener("input", updatePreview);
mobileInput.addEventListener("input", updatePreview);
