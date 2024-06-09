class SimpleCalculator {
    // Constructor initializes the calculator with display elements and resets values
    constructor(previousDisplayElement, currentDisplayElement) {
        this.previousDisplayElement = previousDisplayElement;
        this.currentDisplayElement = currentDisplayElement;
        this.reset();
    }

    // Reset all values to their default state
    reset() {
        this.currentValue = '';
        this.previousValue = '';
        this.operation = null;
    }
    
    // Remove the last character from the current value
    remove() {
        this.currentValue = this.currentValue.toString().slice(0, -1);
    }
     
    // Add a number or decimal point to the current value
    addNumber(number) {
        // Prevent multiple decimal points
        if (number === '.' && this.currentValue.includes('.')) return;
        // Append number to current value
        this.currentValue = this.currentValue.toString() + number.toString();
    }
    
    // Select an operation and prepare for the next number input
    selectOperation(operation) {
        // Ignore if no current value
        if (this.currentValue === '') return;
        // Perform calculation if there is a previous value
        if (this.previousValue !== '') {
            this.performCalculation();
        }
        // Set the selected operation
        this.operation = operation;
        // Move current value to previous value and clear current value
        this.previousValue = this.currentValue;
        this.currentValue = ''; // Clear current value for the next input
    }

    // Perform the calculation based on the selected operation
    performCalculation() {
        let result;
        const previous = parseFloat(this.previousValue);
        const current = parseFloat(this.currentValue);
        // Ensure both values are valid numbers
        if (isNaN(previous) || isNaN(current)) return;
        // Calculate based on the selected operation
        switch (this.operation) {
            case '+':
                result = previous + current;
                break;
            case '-':
                result = previous - current;
                break;
            case '*':
                result = previous * current;
                break;
            case '÷':
                result = previous / current;
                break;
            default:
                return;
        }
        // Update current value with the result and clear the operation and previous value
        this.currentValue = result;
        this.operation = null;
        this.previousValue = '';
    }

    // Update the display with the current and previous values
    updateDisplay() {
        this.currentDisplayElement.innerText = this.currentValue;
        this.previousDisplayElement.innerText = this.previousValue;
    }
}

// Get elements for buttons and display
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousDisplayElement = document.querySelector('[data-previous-operand]');
const currentDisplayElement = document.querySelector('[data-current-operand]');

// Initialize the calculator with display elements
const calculator = new SimpleCalculator(previousDisplayElement, currentDisplayElement);

// Add event listeners to number buttons
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Append number and update display
        calculator.addNumber(button.innerText);
        calculator.updateDisplay();
    });
});  

// Add event listeners to operation buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Select operation and update display
        calculator.selectOperation(button.innerText);
        calculator.updateDisplay();
    });
});  

// Add event listener to equals button
equalsButton.addEventListener('click', button => {
    // Perform calculation and update display
    calculator.performCalculation();
    calculator.updateDisplay();
});

// Add event listener to delete button
deleteButton.addEventListener('click', button => {
    // Remove the last character and update display
    calculator.remove();
    calculator.updateDisplay();
});

// Add event listener to all-clear button
allClearButton.addEventListener('click', button => {
    // Reset calculator and update display
    calculator.reset();
    calculator.updateDisplay();
});
