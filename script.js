let firstNumStr = "";
let operatorStr = "";
let secondNumStr = "";
let displayWindow = document.querySelector("#display-window");

/////////////////////////////////////
// Math Operator Helper Functions //
////////////////////////////////////
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

function decimalException(buttonValue) {
  if (displayWindow.innerText === "0") {
    displayWindow.innerText += buttonValue;
  } else if (!displayWindow.innerText.includes(".")) {
    displayWindow.innerText += buttonValue;
  }
}

// Number Button Functions
function updateDisplayNumber(buttonValue) {
  if (buttonValue === ".") decimalException(buttonValue);

  if (displayWindow.innerText === "0") {
    displayWindow.innerText = firstNumStr;
  } else if (operatorStr !== "") {
    displayWindow.innerText = secondNumStr;
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
  storeNumber(buttonValue);
  updateDisplayNumber(buttonValue);
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

// function percentageResult(number) {
//   let result = number / 100;
//   let resultStr = result.toString();
//   displayWindow.innerText = resultStr;
// }

// function percentage() {
//   const firstNumber = Number(firstNumStr);
//   const secondNumber = Number(secondNumStr);

//   operatorStr === ""
//     ? (firstNumStr = percentageResult(firstNumber))
//     : (secondNumStr = percentageResult(secondNumber));
// }

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
// BUGS TO ADDRESS //
/////////////////////

// • Decimal in secondNum - since I allowed decimal to appear in the display only once,
//// user cannot add decimal to secondNum if decimal is already in firstNum.
//// - TOP says to hold only one decimal in the display at given time.
//// - Solution: Refactor the arithmetic operators to not appear in the display. They do
////   need to be highlighted once they are clicked. Also need to refactor firstNum and
////   secondNum so that only one can appear in the display at any given time.

// • Numbers run off display - If too many numbers are included in the display, the numbers
//// will not scroll but rather run out the side of the container and off the page.
//// - Solution: Look up a scroll option

// • Display flexes - Display flexes based on numbers.
//// - Solution: Set display to static value. The issue here is that removing the flex may
////   compromise remainder of structure. Check size of the display while flexed and maybe
////   try to recreate size in a static mode.

// • You must hit the "equals" button to return a value - Not really a bug per se, more of a
//// feature which needs to be added. If two number are ready to be totaled, should be able
//// to hit any arithmetic operator and spit back the total - rather than requiring user to
//// explicitly hit the equals button.
