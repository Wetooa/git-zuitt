// Mini-Activity: 2:00PM

// Create a text area where users can type a message
const textarea = document.createElement("textarea");
const maxLength = 100;

textarea.maxLength = maxLength;
textarea.rows = 5;
textarea.cols = 30;

// Create a character count display
const charCount = document.createElement("div");
charCount.textContent = `Characters: 0/${maxLength}`;

// Add event listener to update character count
textarea.addEventListener("input", () => {
  const length = textarea.value.length;
  charCount.textContent = `Characters: ${length}/${maxLength}`;

  if (length >= 100) {
    charCount.style.color = "red";
    charCount.textContent += " (Character limit reached!)";
    textarea.disabled = true; // Disable the textarea
  } else {
    charCount.style.color = "black";
  }
});

// Append elements to the document body
document.body.appendChild(textarea);
document.body.appendChild(charCount);
