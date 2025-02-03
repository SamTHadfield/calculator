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

// Goals
// 1. Divert to either firstNumStr or secondNumStr based on operator
// 3. If firstNumStr or secondNumStr are not empty, need to be able to add "-" to an existing #
// 4. Should only be able to add one "-" at a time.
// 5. Need to be able to remove ("-") with click of a button
// 6. If display is 0, do not push to global variable

function toggleFirstNum() {
  if (displayWindow.innerText !== "0" && !firstNumStr.includes("-")) {
    firstNumStr = "-" + firstNumStr;
    displayWindow.innerText = firstNumStr;
  } else if (firstNumStr.includes("-")) {
    firstNumStr = firstNumStr.slice(1);
    displayWindow.innerText = firstNumStr;
  }
}

function toggleSecondNum() {
  if (secondNumStr !== "" && !secondNumStr.includes("-")) {
    secondNumStr = "-" + secondNumStr;
    displayWindow.innerText = secondNumStr;
  } else if (secondNumStr.includes("-")) {
    secondNumStr = secondNumStr.slice(1);
    displayWindow.innerText = secondNumStr;
  }
}

function toggleNegative() {
  if (operatorStr === "") toggleFirstNum();
  if (operatorStr !== "") toggleSecondNum();
}

function percentage() {
  let realNum = 0;
  let backToString = "";
  if (operatorStr === "") {
    realNum = Number(firstNumStr) / 100;
    backToString = realNum.toString();
    displayWindow.innerText = backToString;
    firstNumStr = backToString;
  } else if (operatorStr !== "") {
    realNum = Number(secondNumStr) / 100;
    backToString = realNum.toString();
    displayWindow.innerText = backToString;
    secondNumStr = backToString;
  }
}

function removeLastValue(numString, displayWindow) {
  const displayArr = displayWindow.innerText.split("");
  displayArr.pop();
  const newDisplayStr = displayArr.join("");
  displayWindow.innerText = newDisplayStr;

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
    removeLastValue(firstNumStr, displayWindow);
  } else if (operatorStr !== "") {
    removeLastValue(secondNumStr, displayWindow);
  }

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
// BUGS TO ADDRESS //
/////////////////////

// • Can add multiple decimals only in secondNum

// • Global value variables should maybe be numbers not strings.

// • Disable "0" from being placed in global variables all by itself. This should prevent
//// successive 0s from being added to display without a leading number. But double check this.

// • Refactor arithmetic buttons to highlight when clicked and remove highlight when
//// clicked elsewhere

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
