document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    let expression = ''; // Holds the full expression string (e.g., "5 + 3")
    
    // Button event listeners
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            const value = this.id;
            
            if (this.classList.contains('number')) {
                expression += value;
                updateDisplay();
            } else if (value === 'decimal') {
                // Only add decimal if the current number doesn't have one
                const lastNum = getLastNumber(expression);
                if (!lastNum.includes('.')) {
                    expression += '.';
                    updateDisplay();
                }
            } else if (this.classList.contains('operator')) {
                // Add operator only if expression ends with a number
                if (expression && !isOperator(expression.slice(-1)) && !expression.endsWith(' ')) {
                    expression += ' ' + getOperatorSymbol(value) + ' ';
                    updateDisplay();
                }
            } else if (value === 'equals') {
                calculate();
            } else if (value === 'clear') {
                expression = '';
                updateDisplay();
            } else if (value === 'del') {
                deleteLast();
            }
        });
    });
    
    // Keyboard support
    document.addEventListener('keydown', function(e) {
        const key = e.key;
        if (key >= '0' && key <= '9') {
            document.getElementById(key).click();
        } else if (key === '.') {
            document.getElementById('decimal').click();
        } else if (key === '+') {
            document.getElementById('add').click();
        } else if (key === '-') {
            document.getElementById('subtract').click();
        } else if (key === '*') {
            document.getElementById('multiply').click();
        } else if (key === '/') {
            document.getElementById('divide').click();
        } else if (key === 'Enter' || key === '=') {
            document.getElementById('equals').click();
        } else if (key === 'Escape' || key === 'c' || key === 'C') {
            document.getElementById('clear').click();
        } else if (key === 'Backspace') {
            document.getElementById('del').click();
        }
    });
    
    function updateDisplay() {
        display.textContent = expression || '0';
    }
    
    function getOperatorSymbol(id) {
        const symbols = {
            add: '+',
            subtract: '-',
            multiply: '×',
            divide: '÷'
        };
        return symbols[id] || '';
    }
    
    function isOperator(char) {
        return ['+', '-', '×', '÷'].includes(char);
    }
    
    function getLastNumber(expr) {
        const parts = expr.split(' ');
        return parts[parts.length - 1] || '';
    }
    
    function deleteLast() {
        if (expression) {
            expression = expression.trimEnd();
            if (expression.endsWith(' ')) {
                // Remove the operator and spaces
                expression = expression.slice(0, expression.lastIndexOf(' ')).trim();
            } else {
                // Remove last digit
                expression = expression.slice(0, -1);
            }
            updateDisplay();
        }
    }
    
    function calculate() {
        if (expression) {
            try {
                // Replace symbols with JS operators
                let calcExpr = expression.replace(/×/g, '*').replace(/÷/g, '/');
                // Simple evaluation (for basic ops, split and compute)
                const tokens = calcExpr.split(' ');
                let result = parseFloat(tokens[0]);
                for (let i = 1; i < tokens.length; i += 2) {
                    const op = tokens[i];
                    const num = parseFloat(tokens[i + 1]);
                    if (op === '+') result += num;
                    else if (op === '-') result -= num;
                    else if (op === '*') result *= num;
                    else if (op === '/' && num !== 0) result /= num;
                    else {
                        result = 'Error';
                        break;
                    }
                }
                expression = result.toString();
                updateDisplay();
            } catch {
                expression = 'Error';
                updateDisplay();
            }
        }
    }
});