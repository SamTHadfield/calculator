let firstNumStr = "";
let operatorStr = "";
let secondNumStr = "";
let display = document.querySelector("#display-window");

/////////////////////////////////////
// Math Operator Helper Functions //
////////////////////////////////////
function operatorResult(totalNumber) {
  display.innerText = totalNumber;
  firstNumStr = totalNumber;
  secondNumStr = "";
  operatorStr = "";
}

function add(firstNumber, secondNumber) {
  const totalNumber = firstNumber + secondNumber;
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
  const totalNumber = firstNumber / secondNumber;
  operatorResult(totalNumber);
}

// Operate Function
function operate() {
  const firstNumber = Number(firstNumStr);
  const secondNumber = Number(secondNumStr);

  switch (operatorStr) {
    case "+":
      add(firstNumber, secondNumber);
      break;
    case "–":
      subtract(firstNumber, secondNumber);
      break;
    case "*":
      multiply(firstNumber, secondNumber);
      break;
    case "÷":
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
  if (firstNumStr.length > 9) firstNumStr = firstNumStr.substring(0, 9);

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
  if (secondNumStr.length > 9) secondNumStr = secondNumStr.substring(0, 9);

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

function numberButton(button) {
  const buttonValue = button.target.value;
  routeNumber(buttonValue);
}

///////////////////////////////////////////
// Arithmetic Operator Button Functions //
//////////////////////////////////////////

// Pseudocode //
// • Highlight Arith button when clicked
// • Undo highlight when number button is clicked
// • Undo highlight when a different arith button is clicked and "move" highlight
//   to new arith button

// function colorButton(button) {
//   button.target.style.backgroundColor.class  #f8d49b;
// }

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

function backgroundOperatorButton(button) {
  const buttonValue = button.target.value;

  switch (buttonValue) {
    case "AC":
      allClear();
      break;
    case "+/–":
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

//////////////////////
// Event Listeners //
/////////////////////

// Number Button Event Listeners
const numberButtons = Array.from(document.querySelectorAll(".number-button"));
numberButtons.forEach((button) =>
  button.addEventListener("click", numberButton)
);

// Arithmetic Operator Button Event Listeners
const arithButtons = Array.from(document.querySelectorAll(".arith-button"));
arithButtons.forEach((button) =>
  button.addEventListener("click", arithOperatorButton)
);

// Background Operator Button Event Listeners
const backButtons = Array.from(document.querySelectorAll(".background-button"));
backButtons.forEach((button) =>
  button.addEventListener("click", backgroundOperatorButton)
);

////////////////////////////////////////
// BUGS TO ADDRESS & FEATURES TO ADD //
///////////////////////////////////////

// • Need to refactor if/else statements for number buttons - they are long and cumbersome

// • Numbers run off display - If too many numbers are included in the display, the numbers
//// will not scroll but rather run out the side of the container and off the page.
//// - Solution: Limit the length of the stored number to 10 characters (which is the amount of
////   characters that can fit in the display).

// • Refactor arithmetic buttons to highlight when clicked and remove highlight when
//// clicked elsewhere

// • You must hit the "equals" button to return a value - Not really a bug per se, more of a
//// feature that needs to be added. If two number are ready to be totaled, should be able
//// to hit any arithmetic operator and spit back the total - rather than requiring user to
//// explicitly hit the equals button.

// • Add keyboard support with additional event listeners!
