# Ex04 Simple Calculator - React Project
## Date:14-03-2026
## Name : 
## Reg No :

## AIM
To  develop a Simple Calculator using React.js with clean and responsive design, ensuring a smooth user experience across different screen sizes.

## ALGORITHM
### STEP 1
Create a React App.

### STEP 2
Open a terminal and run:
  <ul><li>npx create-react-app simple-calculator</li>
  <li>cd simple-calculator</li>
  <li>npm start</li></ul>

### STEP 3
Inside the src/ folder, create a new file Calculator.js and define the basic structure.

### STEP 4
Plan the UI: Display screen, number buttons (0-9), operators (+, -, *, /), clear (C), and equal (=).

### STEP 5
Create a new file Calculator.css in src/ and add the styling.

### STEP 6
Open src/App.js and modify it.

### STEP 7
Start the development server.
  npm start

### STEP 8
Open http://localhost:3000/ in the browser.

### STEP 9
Test the calculator by entering numbers and operations.

### STEP 10
Fix styling issues and refine content placement.

### STEP 11
Deploy the website.

### STEP 12
Upload to GitHub Pages for free hosting.

## PROGRAM
# JSC CODE:
```
import React, { useState } from "react";
import "./App.css";

function Calculator() {
  const [display, setDisplay] = useState("0");
  const [firstValue, setFirstValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState(false);

  const inputNumber = (number) => {
    if (display === "Error") {
      setDisplay(number);
      return;
    }

    if (waitingForSecondValue) {
      setDisplay(number);
      setWaitingForSecondValue(false);
    } else {
      setDisplay(display === "0" ? number : display + number);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondValue) {
      setDisplay("0.");
      setWaitingForSecondValue(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clearCalculator = () => {
    setDisplay("0");
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecondValue(false);
  };

  const deleteNumber = () => {
    if (display === "Error") {
      clearCalculator();
      return;
    }

    if (display.length === 1) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const toggleSign = () => {
    if (display === "0" || display === "Error") return;

    setDisplay(
      display.startsWith("-")
        ? display.slice(1)
        : "-" + display
    );
  };

  const percentage = () => {
    if (display === "Error") return;

    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const calculate = (a, b, op) => {
    switch (op) {
      case "+":
        return a + b;

      case "-":
        return a - b;

      case "*":
        return a * b;

      case "/":
        return b === 0 ? "Error" : a / b;

      default:
        return b;
    }
  };

  const chooseOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (display === "Error") return;

    if (operator && waitingForSecondValue) {
      setOperator(nextOperator);
      return;
    }

    if (firstValue === null) {
      setFirstValue(inputValue);
    } else if (operator) {
      const result = calculate(firstValue, inputValue, operator);

      if (result === "Error") {
        setDisplay("Error");
        setFirstValue(null);
        setOperator(null);
        return;
      }

      setDisplay(String(result));
      setFirstValue(result);
    }

    setOperator(nextOperator);
    setWaitingForSecondValue(true);
  };

  const handleEquals = () => {
    if (operator === null || firstValue === null) return;

    const secondValue = parseFloat(display);
    const result = calculate(firstValue, secondValue, operator);

    setDisplay(String(result));
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecondValue(false);
  };

  return (
    <div className="calculator-page">

      <div className="calculator">

        {/* Display */}
        <div className="display">
          {display}
        </div>

        {/* Buttons */}
        <div className="buttons">

          <button
            className="function"
            onClick={clearCalculator}
          >
            AC
          </button>

          <button
            className="function"
            onClick={toggleSign}
          >
            +/−
          </button>

          <button
            className="function"
            onClick={percentage}
          >
            %
          </button>

          <button
            className="operator"
            onClick={() => chooseOperator("/")}
          >
            ÷
          </button>


          <button onClick={() => inputNumber("7")}>7</button>
          <button onClick={() => inputNumber("8")}>8</button>
          <button onClick={() => inputNumber("9")}>9</button>

          <button
            className="operator"
            onClick={() => chooseOperator("*")}
          >
            ×
          </button>


          <button onClick={() => inputNumber("4")}>4</button>
          <button onClick={() => inputNumber("5")}>5</button>
          <button onClick={() => inputNumber("6")}>6</button>

          <button
            className="operator"
            onClick={() => chooseOperator("-")}
          >
            −
          </button>


          <button onClick={() => inputNumber("1")}>1</button>
          <button onClick={() => inputNumber("2")}>2</button>
          <button onClick={() => inputNumber("3")}>3</button>

          <button
            className="operator"
            onClick={() => chooseOperator("+")}
          >
            +
          </button>


          <button
            className="zero"
            onClick={() => inputNumber("0")}
          >
            0
          </button>

          <button onClick={inputDecimal}>
            .
          </button>

          <button
            className="operator"
            onClick={handleEquals}
          >
            =
          </button>

        </div>
      </div>

    </div>
  );
}

export default Calculator;
```
# CSS CODE:
```
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display",
    "Helvetica Neue", Arial, sans-serif;

  background: #000;
}

/* Full screen background */

.calculator-page {
  width: 100%;
  min-height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background: #000;

  padding: 20px;
}

/* Calculator body */

.calculator {
  width: 100%;
  max-width: 390px;

  background: #000;

  padding: 25px 18px 30px;

  border-radius: 40px;

  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.8),
    inset 0 0 0 1px #1c1c1c;
}

/* Display */

.display {
  width: 100%;
  height: 150px;

  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  padding: 20px 10px;

  color: #ffffff;

  font-size: clamp(50px, 12vw, 72px);
  font-weight: 300;

  overflow: hidden;

  white-space: nowrap;

  text-align: right;
}

/* Button grid */

.buttons {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 12px;

  width: 100%;
}

/* All buttons */

button {
  width: 100%;
  aspect-ratio: 1 / 1;

  border: none;

  border-radius: 50%;

  background: #333333;

  color: white;

  font-size: 28px;
  font-weight: 400;

  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  transition:
    transform 0.1s ease,
    filter 0.1s ease,
    background 0.1s ease;
}

/* Button hover */

button:hover {
  filter: brightness(1.25);
}

/* Button press */

button:active {
  transform: scale(0.92);
  filter: brightness(1.5);
}

/* AC, +/-, % */

.function {
  background: #a5a5a5;

  color: #000;

  font-weight: 500;
}

.function:hover {
  background: #bdbdbd;
}

/* Operators */

.operator {
  background: #ff9f0a;

  color: white;

  font-size: 32px;
}

.operator:hover {
  background: #ffb340;
}

/* Zero button */

.zero {
  grid-column: span 2;

  aspect-ratio: auto;

  border-radius: 50px;

  justify-content: flex-start;

  padding-left: 30px;
}

/* Responsive tablet */

@media (max-width: 600px) {

  .calculator {
    max-width: 370px;

    padding: 20px 16px 25px;

    border-radius: 35px;
  }

  .display {
    height: 140px;

    font-size: 60px;
  }

  .buttons {
    gap: 10px;
  }

  button {
    font-size: 25px;
  }

  .operator {
    font-size: 29px;
  }
}


/* Small mobile */

@media (max-width: 380px) {

  .calculator-page {
    padding: 10px;
  }

  .calculator {
    padding: 15px 12px 20px;

    border-radius: 30px;
  }

  .display {
    height: 125px;

    font-size: 50px;

    padding-right: 8px;
  }

  .buttons {
    gap: 8px;
  }

  button {
    font-size: 22px;
  }

  .operator {
    font-size: 26px;
  }

  .zero {
    padding-left: 24px;
  }
}
```


## OUTPUT

<img width="591" height="742" alt="image" src="https://github.com/user-attachments/assets/5207acda-b595-41e7-b996-70dc3203677c" />


## RESULT
The program for developing a simple calculator in React.js is executed successfully.
