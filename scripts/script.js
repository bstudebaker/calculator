// Retrieving pieces of the DOM and assigning to variables
const calcDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-button');

// Calculate both number values depending on the operator
const calculate = {
    '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
    '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
    '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
    '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
    '=': (firstNumber, secondNumber) => secondNumber,
}

let firstNum = 0;
let awaitingNextValue = false;
let operatorValue = '';

// Function to send a number to the display
function sendNumber(num) {
    // Replace display value if first value is entered
    if (awaitingNextValue) {
        calcDisplay.textContent = num;
        awaitingNextValue = false;
    } else {
        // If current display is 0, replace it. If not 0, add num
        const displayValue = calcDisplay.textContent;
        calcDisplay.textContent = displayValue === '0' ? num : displayValue + num;
    }
}

// Function to add decimal point
function addDecimal() {
    // If an operator is pressed, don't add the decimal
    if (awaitingNextValue) return;
    // If there isn't a decimal, add one
    if (!calcDisplay.textContent.includes('.')) {
        calcDisplay.textContent = `${calcDisplay.textContent}.`;
    }
}

// Function to use the operator buttons
function useOperator(operator) {
    const currentNum = Number(calcDisplay.textContent);
    // Prevent multiple operators
    if (operator && awaitingNextValue) {
        operatorValue = operator;
        return;
    }
    // If no value is in firstNum, assign a value
    if (!firstNum) {
        firstNum = currentNum;
    } else {
        const calculation = calculate[operatorValue](firstNum, currentNum);
        calcDisplay.textContent = calculation;
        firstNum = calculation;
    }
    // Ready for next value, store the operator
    awaitingNextValue = true;
    operatorValue = operator;
}

// Reset values and display
function resetAll() {
    firstNum = 0;
    awaitingNextValue = false;
    operatorValue = '';
    calcDisplay.textContent = '0';
}

// Event Listeners for buttons except clear
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener('click', () => sendNumber(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
        inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    }
    else if (inputBtn.classList.contains('decimal')) {
        inputBtn.addEventListener('click', () => addDecimal());
    }
});

// Event Listener for clear
clearBtn.addEventListener('click', resetAll);