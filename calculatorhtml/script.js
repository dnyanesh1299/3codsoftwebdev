document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let displayValue = '0';
    let pendingValue = null;
    let operator = null;

    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            const value = button.getAttribute('data-value');

            switch (action) {
                case 'number':
                    if (displayValue === '0') {
                        displayValue = value;
                    } else {
                        displayValue += value;
                    }
                    break;
                case 'decimal':
                    if (!displayValue.includes('.')) {
                        displayValue += value;
                    }
                    break;
                case 'operator':
                    if (pendingValue !== null) {
                        displayValue = calculate(pendingValue, displayValue, operator);
                    }
                    pendingValue = displayValue;
                    displayValue = '0';
                    operator = value;
                    break;
                case 'clear':
                    displayValue = '0';
                    pendingValue = null;
                    operator = null;
                    break;
                case 'delete':
                    displayValue = displayValue.slice(0, -1);
                    if (displayValue === '') {
                        displayValue = '0';
                    }
                    break;
                case 'calculate':
                    if (pendingValue !== null) {
                        displayValue = calculate(pendingValue, displayValue, operator);
                        pendingValue = null;
                        operator = null;
                    }
                    break;
                default:
                    break;
            }

            updateDisplay();
        });
    });

    function updateDisplay() {
        display.textContent = displayValue;
    }

    function calculate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);

        switch (operator) {
            case '+':
                return (a + b).toString();
            case '-':
                return (a - b).toString();
            case '*':
                return (a * b).toString();
            case '/':
                return (a / b).toString();
            case '%':
                return (a * (b / 100)).toString();
            default:
                return b;
        }
    }
});
