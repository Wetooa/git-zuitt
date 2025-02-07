function checkHeight(height) {
  console.log(
    height < 150
      ? "Did not passed the minimum height requirement"
      : "Passed the minimum height requirement.",
  );
}

checkHeight(10);

function getProdcut(num1, num2) {
  if (typeof num1 !== "number" && typeof num2 !== "number") {
    return "Invalid input";
  }
  return num1 * num2;
}
console.log(getProdcut(2, 3));

console.log(1 / 0);

console.log(50 * (1 - 101 / 100));

num = "10";
console.log(typeof num === "number");
console.log(num + num);
