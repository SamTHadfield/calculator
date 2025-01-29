let firstNum = "";
let operator = "+";
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
// function numberButton(button) {
//   const buttonValue = button.target.value;

//   if (displayWindow.innerText === "0") displayWindow.innerText = " ";
//   if (operator === "") firstNum += buttonValue;
//   if (operator !== "") secondNum += buttonValue;
//   displayWindow.innerText += buttonValue;
// }

//////////////////////
// Event Listeners //
/////////////////////

// Number Buttons
const numberButtons = Array.from(document.querySelectorAll(".number-button"));
numberButtons.forEach((button) =>
  button.addEventListener("click", numberButton)
);

// Arithmetic Operator Buttons
const arithButtons = Array.from(document.querySelectorAll(".arith-button"));
arithButtons.forEach((button) =>
  button.addEventListener("click", arithmeticButton)
);

// Background Operator Buttons
const backButtons = Array.from(document.querySelectorAll(".background-button"));
backButtons.forEach((button) =>
  button.addEventListener("click", backgroundButton)
);
