"use strict";
let lengthDisplay = document.getElementById("length-display");
const slider = document.getElementById("slider");

let passwordLength = 10;
function setSlider() {
  slider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
}

setSlider();

slider.addEventListener("input", function (e) {
  passwordLength = e.target.value;
  setSlider();
});

function generateRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomUppercase() {
  return String.fromCharCode(generateRandom(65, 91));
}

function generateRandomLowercase() {
  return String.fromCharCode(generateRandom(97, 123));
}

function generateRandomNumber() {
  return generateRandom(1, 10);
}

const symbol = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';
function generateRandomSymbol() {
  let index = generateRandom(0, symbol.length);
  return symbol[index];
}

const indicator = document.getElementById("indicator");

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  indicator.style.boxShadow = `0 0 12px 1px ${color}`;
}
setIndicator("#ccc");

const number = document.getElementById("numbers");
const uppercase = document.getElementById("uppercase");
const lowercase = document.getElementById("lowercase");
const symbols = document.getElementById("symbol");

function calcStrength() {
  let hasNumber = false;
  let hasUpper = false;
  let hasLower = false;
  let hasSymbol = false;

  if (number.checked) hasNumber = true;
  if (uppercase.checked) hasUpper = true;
  if (lowercase.checked) hasLower = true;
  if (symbol.checked) hasSymbol = true;

  if (hasUpper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasUpper || hasLower) &&
    (hasNumber || hasSymbol) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else [setIndicator("#f00")];
}

const copyMessage = document.getElementById("copy-msg");
const copyBtn = document.getElementById("copy-btn");
const passwordDisplay = document.querySelector("input[passwordDisplay]");
async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);

    copyMessage.innerText = "copied";
  } catch (e) {
    copyMessage.innerText = "Failed";
  }

  copyMessage.classList.add(".active");

  setTimeout(function () {
    copyMessage.classList.remove(".active");
  }, 200);
}

copyBtn.addEventListener("click", function () {
  if (passwordDisplay.value) {
    copyContent();
  }
});

const checkBoxes = document.querySelectorAll(".checkbox");

let checkCount = 0;
function handleCheckBoxChange() {
  checkBoxes.forEach((checkBox) => {
    if (checkBox.checked) checkCount++;
  });

  if (passwordLength < checkCount) {
    passwordDisplay = checkCount;
    setSlider();
  }
}

checkBoxes.forEach((checkBox) => {
  checkBox.addEventListener("change", handleCheckBoxChange);
});

let password = "";
let generateBtn = document.getElementById("generate-btn");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

generateBtn.addEventListener("click", function () {
  password = "";
  let arrayOfCheckedFunction = [];

  if (number.checked) arrayOfCheckedFunction.push(generateRandomNumber);
  if (uppercase.checked) arrayOfCheckedFunction.push(generateRandomUppercase);
  if (lowercase.checked) arrayOfCheckedFunction.push(generateRandomLowercase);
  if (number.symbol) arrayOfCheckedFunction.push(generateRandomSymbol);

  for (let i = 0; i < arrayOfCheckedFunction.length; i++) {
    password += arrayOfCheckedFunction[i]();
  }

  for (let i = 0; i < passwordLength - arrayOfCheckedFunction.length; i++) {
    let randIndex = generateRandom(0, arrayOfCheckedFunction.length);
    password += arrayOfCheckedFunction[randIndex]();
  }

  password = shuffle(Array.from(password));
  passwordDisplay.value = password;
  calcStrength();
});
