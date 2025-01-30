let firstNumStr = "";
let operatorStr = "";
let secondNumStr = "";
let displayWindow = document.querySelector("#display-window");

// console.log(typeof display);

// Math Operator Helper Functions
function operatorResult(totalNumber) {
  displayWindow.innerText = totalNumber;
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

function percentage(firstNumber, secondNumber) {
  // START HERE on 01/31
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
    case "%":
      percentage(firstNumber, secondNumber);
      break;
  }
}

///////////////////////
// Button Functions //
//////////////////////

// Number Button Functions
function updateDisplayNumber(buttonValue) {
  if (displayWindow.innerText === "0" && buttonValue !== ".") {
    displayWindow.innerText = buttonValue;
  } else if (displayWindow.innerText === "0" && buttonValue === ".") {
    displayWindow.innerText += buttonValue;
  } else if (!displayWindow.innerText.includes(".") && buttonValue === ".") {
    displayWindow.innerText += buttonValue;
  } else if (displayWindow.innerText !== "0" && buttonValue !== ".") {
    displayWindow.innerText += buttonValue;
  }
}

function storeNumber(buttonValue) {
  if (operatorStr === "") firstNumStr += buttonValue;
  if (operatorStr !== "") secondNumStr += buttonValue;
}

function numberButton(button) {
  const buttonValue = button.target.value;
  updateDisplayNumber(buttonValue);
  storeNumber(buttonValue);
}

// Arithmetic Operator Button Functions
function updateDisplayArithOperator(buttonValue) {
  if (operatorStr === "") displayWindow.innerText += buttonValue;
}

function storeArithOperator(buttonValue) {
  if (operatorStr === "") operatorStr = buttonValue;
}

function arithOperatorButton(button) {
  const buttonValue = button.target.value;
  updateDisplayArithOperator(buttonValue);
  storeArithOperator(buttonValue);
}

// Background Operator Button Functions
function allClear() {
  displayWindow.innerText = "0";
  firstNumStr = "";
  operatorStr = "";
  secondNumStr = "";
}

function togglePosOrNeg() {
  // Needs to add or remove "(- )" from number
  // May need to use "insertBefore/insertAfter" to accomplish this
  // Whether toggling firstNum or secondNum, will need to add or remove the "(– )"
  //// from display as well as global variable
  // Cannot add to an arithmetic operator, only a number
  // Try to accomplish this task with toggle
}

function backspace() {
  const str = displayWindow.innerText;
  const arr = str.split("");
  arr.pop();
  const newStr = arr.join("");
  displayWindow.innerText = newStr;

  if (displayWindow.innerText === "") {
    displayWindow.innerText = "0";
  }
}

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
      togglePosOrNeg(buttonValue);
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
