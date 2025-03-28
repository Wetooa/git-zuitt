// Grab the elements
const container = document.getElementById("container");
const text = document.getElementById("text");

const themeDarkButton = document.getElementById("themeDark");
const themeRedButton = document.getElementById("themeRed");
const themeGreenButton = document.getElementById("themeGreen");
const themeResetButton = document.getElementById("themeReset");

// Add event listeners to buttons
themeDarkButton.addEventListener("click", () => {
  container.style.backgroundColor = "black";
  text.style.color = "white";
  text.style.fontFamily = "Courier New, monospace";
});

themeRedButton.addEventListener("click", () => {
  container.style.backgroundColor = "red";
  text.style.color = "yellow";
  text.style.fontFamily = "Georgia, serif";
});

themeGreenButton.addEventListener("click", () => {
  container.style.backgroundColor = "green";
  text.style.color = "white";
  text.style.fontFamily = "Verdana, sans-serif";
});

themeResetButton.addEventListener("click", () => {
  container.style.backgroundColor = "white";
  text.style.color = "black";
  text.style.fontFamily = "Arial, sans-serif";
});
