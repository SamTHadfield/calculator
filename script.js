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

// Decimal exceptions
// If variable is empty, we want variable to change to "0" + "."
// If the variable already holds a decimal, we cannot add another to the variable

// Zero exceptions
// We cannot add a "0" to an empty variable
// Zeros cannot come in succession by themselves (e.g. "00000000") unless after a decimal "0.0000"
// function storeNumber(buttonValue) {
//   if (operatorStr === "") {
//     firstNumStr += buttonValue;
//   }
// }

function decimalException(buttonValue) {
  if (display.innerText === "0") {
    display.innerText += buttonValue;
    buttonValue = "0" + buttonValue;
    storeNumber(buttonValue);
  } else if (display.innerText === "") {
    buttonValue = "0" + buttonValue;
    display.innerText = buttonValue;
    storeNumber(buttonValue);
  } else if (!display.innerText.includes(buttonValue)) {
    display.innerText += buttonValue;
    storeNumber(buttonValue);
  }
}

function zeroException(buttonValue) {
  if (display.innerText !== "0") {
    display.innerText += buttonValue;
    storeNumber(buttonValue);
  }
}

function updateDisplayDefault(buttonValue) {
  if (display.innerText === "0" || display.innerText === "") {
    display.innerText = buttonValue;
  } else if (display.innerText !== "0" && display.innerText !== "") {
    display.innerText += buttonValue;
  }
  storeNumber(buttonValue);
}

function updateDisplay(buttonValue) {
  switch (buttonValue) {
    case ".":
      decimalException(buttonValue);
      break;
    case "0":
      zeroException(buttonValue);
      break;
    default:
      updateDisplayDefault(buttonValue);
  }

  // "." can't be used more than once
  // "." must come after either a 0 or an integer
  // "0" cannot be added if there is already a single "0" in display
  // A single "0" in display will need to be replaced unless followed by a decimal
}

function numberButton(button) {
  const buttonValue = button.target.value;
  updateDisplay(buttonValue);
}

// 1. If displayWindow.innerText is only "0"
// 2. Cannot lead with "0" in secondNumber unless there is a decimal

///////////////////////////////////////////
// Arithmetic Operator Button Functions //
//////////////////////////////////////////

// Pseudocode //
// • Highlight Arith button when clicked
// • Undo highlight when number button is clicked
// • Undo highlight when a different arith button is clicked and "move" highlight
//   to new arith button

// function colorButton(button) {
//   button.target.style.backgroundColor = "#7b9e89";
// }

function storeArithOperator(buttonValue) {
  if (operatorStr === "") {
    operatorStr = buttonValue;
  }
}

function arithOperatorButton(button) {
  const buttonValue = button.target.value;
  storeArithOperator(buttonValue);
  // colorButton(button);
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
  if (secondNumStr !== "" && !secondNumStr.includes("-")) {
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

// Equals button
function equals() {
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

//////////////////////
// BUGS TO ADDRESS & FEATURES TO ADD //
/////////////////////

// • May look at refactoring "equals" switch case to go direct to operate function rather than
//// through a middleman function.

// • Can add multiple decimals only in secondNum

// • Disable "0" from being placed in global variables all by itself. This should prevent
//// successive 0s from being added to display without a leading number. But double check this.

// • Refactor arithmetic buttons to highlight when clicked and remove highlight when
//// clicked elsewhere

// • Numbers run off display - If too many numbers are included in the display, the numbers
//// will not scroll but rather run out the side of the container and off the page.
//// - Solution: Look up a scroll option, consult Project page in TOP

// • Display flexes - Display flexes based on numbers.
//// - Solution: Set display to static value. The issue here is that removing the flex may
////   compromise remainder of structure. Check size of the display while flexed and maybe
////   try to recreate size in a static mode.

// • You must hit the "equals" button to return a value - Not really a bug per se, more of a
//// feature which needs to be added. If two number are ready to be totaled, should be able
//// to hit any arithmetic operator and spit back the total - rather than requiring user to
//// explicitly hit the equals button.

// • Add keyboard support!
