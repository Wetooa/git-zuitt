const state = {
  history: [],
  memory: null,
  elements: {
    input1: document.getElementById("input-number-1"),
    input2: document.getElementById("input-number-2"),
    resultDisplay: document.getElementById("result-display"),
    historyList: document.getElementById("history-list"),
    buttons: {
      add: document.getElementById("btn-add"),
      subtract: document.getElementById("btn-subtract"),
      multiply: document.getElementById("btn-multiply"),
      divide: document.getElementById("btn-divide"),
      memoryAdd: document.getElementById("btn-memory-add"),
      memoryRecall: document.getElementById("btn-memory-recall"),
      memoryClear: document.getElementById("btn-memory-clear"),
      clearHistory: document.getElementById("btn-clear-history"),
    },
  },
};

// ---------- Memory Functions ----------
function addToHistory(operation, label, a, b, result) {
  state.history.push({ operation, label, input1: a, input2: b, result });
  renderHistory();
}

function setMemory() {
  let input1 = parseFloat(state.elements.resultDisplay.innerText);

  if (input1 === NaN) {
    alert("Invalid input for memory!");
  }

  state.memory = input1;
  alert(`Memory set to ${state.memory}`);
}

function recallMemory() {
  if (!state.memory) {
    alert("Memory is empty!");
    return;
  }

  state.elements.input1.value = state.memory;
  validateInputs();
}

function clearMemory() {
  state.memory = null;
  alert("Memory cleared!");
}

function renderHistory() {
  const list = state.elements.historyList;
  list.innerHTML = "";

  if (state.history.length === 0) {
    list.innerHTML = "<li>No history yet.</li>";
    return;
  }

  state.history.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.input1} ${item.label} ${item.input2} = ${item.result}`;
    list.appendChild(li);
  });
}

// ---------- Calculator Functions ----------
function calculate(opLabel, fn) {
  const a = parseFloat(state.elements.input1.value);
  const b = parseFloat(state.elements.input2.value);
  if (isNaN(a) || isNaN(b)) return;

  if (opLabel === "÷" && b === 0) {
    const result = "Division Error by 0";
    state.elements.resultDisplay.innerHTML = result;
    addToHistory(fn, opLabel, a, b, result);
    return;
  }

  const result = fn(a, b);
  state.elements.resultDisplay.innerHTML = result;
  addToHistory(fn, opLabel, a, b, result);
}

// ---------- Event Bindings ----------
function setupEvents() {
  const { buttons } = state.elements;

  buttons.add.addEventListener("click", () => calculate("+", (a, b) => a + b));
  buttons.subtract.addEventListener("click", () =>
    calculate("−", (a, b) => a - b),
  );
  buttons.multiply.addEventListener("click", () =>
    calculate("×", (a, b) => a * b),
  );
  buttons.divide.addEventListener("click", () =>
    calculate("÷", (a, b) => a / b),
  );

  buttons.memoryAdd.addEventListener("click", setMemory);
  buttons.memoryRecall.addEventListener("click", recallMemory);
  buttons.memoryClear.addEventListener("click", clearMemory);

  buttons.clearHistory.addEventListener("click", () => {
    clearMemory();
    clearInputs();
  });

  state.elements.input1.addEventListener("input", validateInputs);
  state.elements.input2.addEventListener("input", validateInputs);
}

// ---------- Utilities ----------
function validateInputs() {
  const a = parseFloat(state.elements.input1.value);
  const b = parseFloat(state.elements.input2.value);
  const disabled = isNaN(a) || isNaN(b);

  ["add", "subtract", "multiply", "divide"].forEach((op) => {
    state.elements.buttons[op].disabled = disabled;
  });
}

function clearInputs() {
  state.elements.input1.value = "";
  state.elements.input2.value = "";
  state.elements.resultDisplay.innerHTML = "0";
  validateInputs();
}

// ---------- Initialize ----------
document.addEventListener("DOMContentLoaded", () => {
  setupEvents();
  validateInputs();
  clearInputs();
});
