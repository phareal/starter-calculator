const displayElement = document.querySelector("[data-display]");
const historyElement = document.querySelector("[data-display-history]");
const keypad = document.querySelector("[data-keypad]");

const operatorSymbols = {
  add: "+",
  subtract: "−",
  multiply: "×",
  divide: "÷",
};

const state = {
  currentValue: "0",
  previousValue: null,
  operator: null,
  overwrite: false,
};

function updateDisplay() {
  displayElement.textContent = state.currentValue;
}

function updateHistory(text = "") {
  historyElement.textContent = text;
}

function clearAll() {
  state.currentValue = "0";
  state.previousValue = null;
  state.operator = null;
  state.overwrite = false;
  updateDisplay();
  updateHistory();
}

function appendDigit(digit) {
  if (state.overwrite || state.currentValue === "0") {
    state.currentValue = digit;
    state.overwrite = false;
  } else {
    state.currentValue += digit;
  }
  updateDisplay();
}

function insertDecimal() {
  if (state.overwrite) {
    state.currentValue = "0.";
    state.overwrite = false;
    updateDisplay();
    return;
  }

  if (!state.currentValue.includes(".")) {
    state.currentValue += ".";
    updateDisplay();
  }
}

function setOperator(nextOperator) {
  if (state.operator && !state.overwrite) {
    computeResult();
  }
  state.previousValue = state.currentValue;
  state.operator = nextOperator;
  state.overwrite = true;
  const symbol = operatorSymbols[nextOperator] || "";
  updateHistory(`${state.previousValue} ${symbol}`);
}

function percent() {
  const value = parseFloat(state.currentValue);
  if (!Number.isNaN(value)) {
    state.currentValue = String(value / 100);
    updateDisplay();
  }
}

function backspace() {
  if (state.overwrite) {
    state.currentValue = "0";
    state.overwrite = false;
    updateDisplay();
    return;
  }

  if (state.currentValue.length <= 1) {
    state.currentValue = "0";
  } else {
    state.currentValue = state.currentValue.slice(0, -1);
  }
  updateDisplay();
}

function computeResult() {
  if (state.previousValue === null || !state.operator) {
    return;
  }

  const prev = parseFloat(state.previousValue);
  const current = parseFloat(state.currentValue);

  if (Number.isNaN(prev) || Number.isNaN(current)) {
    return;
  }

  let result;

  switch (state.operator) {
    case "add":
      result = ''// do the calcul here
      break;
    case "subtract":
      result = ''// do the calcul here
      break;
    case "multiply":
      result = ''// do the calcul here
      break;
    case "divide":
      result = current === 0 ? "Error" : prev / current;
      break;
    default:
      return;
  }

  state.currentValue = String(result);
  state.previousValue = null;
  state.operator = null;
  state.overwrite = true;
  updateDisplay();
  updateHistory();
}

function handleKeyClick(event) {
  const key = event.target.closest(".key");
  if (!key || !keypad.contains(key)) return;

  const digit = key.getAttribute("data-digit");
  const action = key.getAttribute("data-action");

  if (digit !== null) {
    appendDigit(digit);
    return;
  }

  switch (action) {
    case "decimal":
      insertDecimal();
      break;
    case "clear":
      clearAll();
      break;
    case "percent":
      percent();
      break;
    case "backspace":
      backspace();
      break;
    case "operator":
      setOperator(key.getAttribute("data-operator"));
      break;
    case "equals":
      computeResult();
      break;
    default:
      break;
  }
}

keypad.addEventListener("click", handleKeyClick);

