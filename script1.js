window.onload = () => {
    const display = document.getElementById("display");
    const buttonContainer = document.querySelector(".button-grid");
    const historyDisplay = document.getElementById("history");

    buttonContainer.addEventListener("click", (event) => {
        const button = event.target;

        if (button.tagName === "BUTTON") {
            handleButtonClick(button.innerText);
        }
    });

    const handleButtonClick = (value) => {
        switch (value) {
            case 'C':
                clearDisplay();
                break;
            case '=':
                calculateResult();
                break;
            default:
                appendToDisplay(value);
                break;
        }
    };

    const appendToDisplay = (value) => {
        if (display.value === "0" && value !== '.') {
            display.value = value;
        } else {
            display.value += value;
        }
    };

    const calculateResult = () => {
        try {
            const result = eval(display.value.replace('x', '*').replace('%', '/100'));
            updateHistory(display.value + " = " + result);
            display.value = result;
        } catch (error) {
            alert("Invalid mathematical expression. Please try again.");
            clearDisplay();
        }
    };

    const clearDisplay = () => {
        display.value = "0";
    };

    const updateHistory = (calculation) => {
        const newHistoryItem = document.createElement('li');
        newHistoryItem.textContent = calculation;
        historyDisplay.appendChild(newHistoryItem);
    };

    // Optional: Add keyboard support
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        const operators = ['+', '-', '*', '/'];

        if (key >= '0' && key <= '9' || operators.includes(key) || key === '.') {
            appendToDisplay(key);
        } else if (key === 'Enter') {
            calculateResult();
        } else if (key === 'Escape') {
            clearDisplay();
        }
    });
};
