let firstNum = "";
let operator = "";
let secondNum = "";
let displayWindow = document.querySelector("#display-window");

// console.log(typeof display);

// Math Operator Helper Functions
function add(firstNum, secondNum) {
  return firstNum + secondNum;
}

function subtract(firstNum, secondNum) {
  return firstNum - secondNum;
}

function multiply(firstNum, secondNum) {
  return firstNum * secondNum;
}

function divide(firstNum, secondNum) {
  return firstNum / secondNum;
}

// Operate Function
function operate(firstNum, operator, secondNum) {
  add(firstNum, secondNum);
  subtract(firstNum, secondNum);
  multiply(firstNum, secondNum);
  divide(firstNum, secondNum);
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
  if (operator === "") firstNum += buttonValue;
  if (operator !== "") secondNum += buttonValue;
}

function numberButton(button) {
  const buttonValue = button.target.value;
  updateDisplayNumber(buttonValue);
  storeNumber(buttonValue);
}

// Arithmetic Button Functions

function updateDisplayArithOperator(buttonValue) {
  if (operator === "") displayWindow.innerText += buttonValue;
}

function storeArithOperator(buttonValue) {
  if (operator === "") operator = buttonValue;
}

function arithOperatorButton(button) {
  const buttonValue = button.target.value;
  updateDisplayArithOperator(buttonValue);
  storeArithOperator(buttonValue);
}

//////////////////////
// Event Listeners //
/////////////////////

// Number Button Event Listeners
const numberButtons = Array.from(document.querySelectorAll(".number-button"));
numberButtons.forEach((button) =>
  button.addEventListener("click", numberButton)
);

// Arithmetic Button Event Listeners
const arithButtons = Array.from(document.querySelectorAll(".arith-button"));
arithButtons.forEach((button) =>
  button.addEventListener("click", arithOperatorButton)
);

// Background Operator Buttons
// const backButtons = Array.from(document.querySelectorAll(".background-button"));
// backButtons.forEach((button) =>
//   button.addEventListener("click", backgroundButton)
// );
