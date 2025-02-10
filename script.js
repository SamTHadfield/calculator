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

  if (str.length > 8) {
    let num = Number(str);
    str = num.toFixed(8);
  }

  display.innerText = str;
  firstNumStr = str;
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

///////////////////////
// Button Functions //
//////////////////////

function updateDisplay() {
  if (operatorStr === "") display.innerText = firstNumStr;
  if (operatorStr !== "") display.innerText = secondNumStr;
}

function storeFirstNumber(buttonValue) {
  if (firstNumStr.length > 8) firstNumStr = firstNumStr.substring(0, 8);

  if (firstNumStr === "" && buttonValue === ".") {
    firstNumStr = "0" + buttonValue; // "0."
  } else if (firstNumStr === "") {
    firstNumStr = buttonValue; // Place new value if not "."
  } else if (firstNumStr === "0" && buttonValue !== ".") {
    firstNumStr = buttonValue; // Replace value if not "." - if "." add to "0"
  } else if (firstNumStr !== "" && buttonValue !== ".") {
    firstNumStr += buttonValue; // concatenate non-decimal values
  } else if (!firstNumStr.includes(".") && buttonValue === ".") {
    firstNumStr += buttonValue; // concatenate decimal value if not already present in string
  }
  updateDisplay();
}

function storeSecondNumber(buttonValue) {
  if (secondNumStr.length > 8) secondNumStr = secondNumStr.substring(0, 8);

  if (secondNumStr === "" && buttonValue === ".") {
    secondNumStr = "0" + buttonValue; // "0."
  } else if (secondNumStr === "") {
    secondNumStr = buttonValue; // Place new value if not "."
  } else if (secondNumStr === "0" && buttonValue !== ".") {
    secondNumStr = buttonValue; // Replace value if not "." - if "." add to "0"
  } else if (secondNumStr !== "" && buttonValue !== ".") {
    secondNumStr += buttonValue; // concatenate non-decimal values
  } else if (!secondNumStr.includes(".") && buttonValue === ".") {
    secondNumStr += buttonValue; // concatenate decimal value if not already present in string
  }
  updateDisplay();
}

function routeNumber(buttonValue) {
  if (operatorStr === "") storeFirstNumber(buttonValue);
  if (operatorStr !== "") storeSecondNumber(buttonValue);
}

function numberClick(button) {
  let buttonValue = button.target.value;
  routeNumber(buttonValue);
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
function percentage() {
  let realNum = 0;
  let backToString = "";
  if (operatorStr === "") {
    realNum = Number(firstNumStr) / 100;
    backToString = realNum.toString();
    display.innerText = backToString;
    firstNumStr = backToString;
  } else if (operatorStr !== "") {
    realNum = Number(secondNumStr) / 100;
    backToString = realNum.toString();
    display.innerText = backToString;
    secondNumStr = backToString;
  }
}

// Back Button
function removeLastValue(numString, display) {
  const displayArr = display.innerText.split("");
  displayArr.pop();
  const newDisplayStr = displayArr.join("");
  display.innerText = newDisplayStr;

  const numStringArr = numString.split("");
  numStringArr.pop();
  const newNumStr = numStringArr.join("");

  if (operatorStr === "") {
    firstNumStr = newNumStr;
  } else if (operatorStr !== "") {
    secondNumStr = newNumStr;
  }
}

function backspace() {
  if (operatorStr === "") {
    removeLastValue(firstNumStr, display);
  } else if (operatorStr !== "") {
    removeLastValue(secondNumStr, display);
  }

  if (display.innerText === "") {
    display.innerText = "0";
  }
}

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
  console.log(buttonClass);

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
    routeNumber(key);
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

////////////////////////////////////////
// BUGS TO ADDRESS & FEATURES TO ADD //
///////////////////////////////////////

// 4) Need to refactor if/else statements for number buttons - they are long and cumbersome

// ✅ 3) Refactor arithmetic buttons to highlight when clicked and remove highlight when
//// clicked elsewhere

// ✅ 2) Write snarky message if user attempts to divide by "0"

// ✅ 1) Large totals still run off of display (Appears to be working)
