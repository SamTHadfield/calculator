let firstNum;
let operator;
let secondNum;
let display = 0;
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

// Populate Display
function populateDisplay(e) {
  console.log(e.target.value);
}

// Event Listeners
const buttons = Array.from(document.querySelectorAll(".button"));
buttons.forEach((button) => button.addEventListener("click", populateDisplay));
