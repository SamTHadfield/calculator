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

function percentage(firstNum, secondNum) {
  return firstNum % secondNum;
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

// Arithmetic Operator Button Functions
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

// Background Operator Button Functions
function allClear() {
  displayWindow.innerText = "0";
  firstNum = "";
  operator = "";
  secondNum = "";
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

function equals() {}

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
      equals;
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
