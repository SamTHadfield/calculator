let firstNumStr = "";
let operatorStr = "";
let secondNumStr = "";
let display = document.querySelector("#display-window");

/////////////////////////////////////
// Math Operator Helper Functions //
////////////////////////////////////

function divideByZero() {
  const error = "cringe";
  display.innerText = error;
  firstNumStr = error;
  operatorStr = "";
  secondNumStr = "";
}

function operatorResult(totalNumber) {
  let str = totalNumber.toString();
  let fixedStr = str.substring(0, 8);
  display.innerText = fixedStr;
  firstNumStr = fixedStr;
  operatorStr = "";
  secondNumStr = "";
}

function add(firstNumber, secondNumber) {
  const totalNumber = firstNumber + secondNumber; //const totalNumber =
  operatorResult(totalNumber);
}

function subtract(firstNumber, secondNumber) {
  const totalNumber = firstNumber - secondNumber;
  operatorResult(totalNumber);
}

function multiply(firstNumber, secondNumber) {
  const totalNumber = firstNumber * secondNumber;
  operatorResult(totalNumber);
}

function divide(firstNumber, secondNumber) {
  if (secondNumber === 0) {
    divideByZero();
  } else {
    const totalNumber = firstNumber / secondNumber;
    operatorResult(totalNumber);
  }
}

// Operate Function
function operate() {
  const firstNumber = Number(firstNumStr);
  const secondNumber = Number(secondNumStr);

  switch (operatorStr) {
    case "+":
      add(firstNumber, secondNumber);
      break;
    case "-":
      subtract(firstNumber, secondNumber);
      break;
    case "*":
      multiply(firstNumber, secondNumber);
      break;
    case "/":
      divide(firstNumber, secondNumber);
      break;
  }
}

//////////////////////////////
// Number Button Functions //
//////////////////////////////

function updateDisplay() {
  if (operatorStr === "") display.innerText = firstNumStr;
  if (operatorStr !== "") display.innerText = secondNumStr;
}

function storeNumber(buttonValue, numStr, maxValue) {
  if (numStr.length >= maxValue) return numStr;

  if (buttonValue === "." && numStr === "") return "0.";
  if (buttonValue === "." && numStr.includes(".")) return numStr;
  if (numStr === "0" && buttonValue !== ".") return buttonValue;

  return numStr + buttonValue;
}

function storeFirstNumber(buttonValue) {
  firstNumStr = storeNumber(buttonValue, firstNumStr, 9);
  updateDisplay();
}

function storeSecondNumber(buttonValue) {
  secondNumStr = storeNumber(buttonValue, secondNumStr, 9);
  updateDisplay();
}

function handleInputValue(buttonValue) {
  if (operatorStr === "") storeFirstNumber(buttonValue);
  if (operatorStr !== "") storeSecondNumber(buttonValue);
}

function numberClick(button) {
  let buttonValue = button.target.value;
  handleInputValue(buttonValue);
}

// Number Button Event Listeners
const numberButtons = Array.from(document.querySelectorAll(".number-button"));

numberButtons.forEach(
  (button) => button.addEventListener("click", numberClick) // numberButton
);
numberButtons.forEach((button) =>
  button.addEventListener("mousedown", highlight)
);
numberButtons.forEach((button) =>
  button.addEventListener("mouseup", removeHighlight)
);

///////////////////////////////////////////
// Arithmetic Operator Button Functions //
//////////////////////////////////////////

function storeArithOperator(buttonValue) {
  if (operatorStr === "") {
    operatorStr = buttonValue;
  }
}

function arithOperatorButton(button) {
  const buttonValue = button.target.value;
  // colorButton(button);
  storeArithOperator(buttonValue);
}

// Arithmetic Operator Event Listeners
const arithButtons = Array.from(document.querySelectorAll(".arith-button"));
arithButtons.forEach((button) =>
  button.addEventListener("click", arithOperatorButton)
);
arithButtons.forEach((button) => button.addEventListener("focus", highlight));
arithButtons.forEach((button) =>
  button.addEventListener("blur", removeHighlight)
);

///////////////////////////////////////////
// Background Operator Button Functions //
//////////////////////////////////////////

// AC Button
function allClear() {
  display.innerText = "0";
  firstNumStr = "";
  operatorStr = "";
  secondNumStr = "";
}

// Toggle Button
function toggleFirstNum() {
  if (display.innerText !== "0" && !firstNumStr.includes("-")) {
    firstNumStr = "-" + firstNumStr;
    display.innerText = firstNumStr;
  } else if (firstNumStr.includes("-")) {
    firstNumStr = firstNumStr.slice(1);
    display.innerText = firstNumStr;
  }
}

function toggleSecondNum() {
  if (
    secondNumStr !== "" &&
    secondNumStr !== "0" &&
    !secondNumStr.includes("-")
  ) {
    secondNumStr = "-" + secondNumStr;
    display.innerText = secondNumStr;
  } else if (secondNumStr.includes("-")) {
    secondNumStr = secondNumStr.slice(1);
    display.innerText = secondNumStr;
  }
}

function toggleNegative() {
  if (operatorStr === "") toggleFirstNum();
  if (operatorStr !== "") toggleSecondNum();
}

// Percentage Button
function calculatePercentage(numStr) {
  return (Number(numStr) / 100).toString();
}

function percentage() {
  if (operatorStr === "") {
    firstNumStr = calculatePercentage(firstNumStr);
    display.innerText = firstNumStr;
  } else {
    secondNumStr = calculatePercentage(secondNumStr);
    display.innerText = secondNumStr;
  }
}

// Back Button
function popDisplay() {
  const displayArr = display.innerText.split("");
  displayArr.pop();
  const newDisplayStr = displayArr.join("");
  display.innerText = newDisplayStr;

  if (display.innerText === "") {
    display.innerText = "0";
  }
}

function popString() {
  if (operatorStr === "") {
    const numberArr = firstNumStr.split("");
    numberArr.pop();
    firstNumStr = numberArr.join("");
  } else if (operatorStr !== "") {
    const numberArr = secondNumStr.split("");
    numberArr.pop();
    secondNumStr = numberArr.join("");
  }
}

function backspace() {
  popString();
  popDisplay();
}

// Equals Button
function equals() {
  if (firstNumStr !== "" && operatorStr !== "" && secondNumStr !== "")
    operate();
}

function backgroundOperatorClick(button) {
  let buttonValue = button.target.value;
  switch (buttonValue) {
    case "AC":
      allClear();
      break;
    case "+/-":
      toggleNegative();
      break;
    case "%":
      percentage();
      break;
    case "back":
      backspace();
      break;
    case "=":
      equals();
      break;
  }
}

// Background Operator Event Listeners
const backButtons = Array.from(document.querySelectorAll(".background-button"));
backButtons.forEach((button) =>
  button.addEventListener("click", backgroundOperatorClick)
);
backButtons.forEach((button) =>
  button.addEventListener("mousedown", highlight)
);
backButtons.forEach((button) =>
  button.addEventListener("mouseup", removeHighlight)
);

// Highlighting Buttons On Click
function highlight(e) {
  e.target.style.backgroundColor = "#A9A9A9";
}

function removeHighlight(e) {
  const buttonClass = e.target.classList.value;

  switch (buttonClass) {
    case "button number-button audio":
      e.target.style.backgroundColor = "#f0a202";
      break;
    case "button arith-button audio":
    case "button background-button audio":
      e.target.style.backgroundColor = "#d95d39";
      break;
  }
}

// Keyboard Event Listeners
window.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key) || key === ".") {
    handleInputValue(key);
  } else
    switch (key) {
      case "+":
      case "-":
      case "/":
      case "*":
        storeArithOperator(key);
        break;
      case "c": // All Clear // Works
        allClear();
        break;
      case "–": // Toggle negative // Works
        toggleNegative();
        break;
      case "%": // Works
        percentage();
        break;
      case "Backspace": // Works
        backspace();
        break;
      case "=":
      case "Enter":
        equals();
        break;
    }
});
