const display = document.getElementById('display');
let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function appendToDisplay(value) {
    if (waitingForSecondOperand) {
        display.value = value;
        waitingForSecondOperand = false;
    } else {
        display.value = display.value === '0' ? value : display.value + value;
    }
}

function clearDisplay() {
    display.value = '0';
    firstOperand = null;
    operator = null;
    waitingForSecondOperand = false;
}

function calculate() {
    if (operator && firstOperand !== null) {
        const secondOperand = parseFloat(display.value);
        let result;
        
        switch (operator) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                result = firstOperand / secondOperand;
                break;
            default:
                return;
        }
        
        display.value = result.toString();
        firstOperand = result;
        waitingForSecondOperand = true;
        operator = null;
    }
}

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', function() {
        if (display.value !== '0' && !waitingForSecondOperand) {
            firstOperand = parseFloat(display.value);
            operator = this.textContent;
            waitingForSecondOperand = true;
        }
    });
});