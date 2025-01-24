let firstNum;
let operator;
let secondNum;

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

operate(firstNum, operator, secondNum);
