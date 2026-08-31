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