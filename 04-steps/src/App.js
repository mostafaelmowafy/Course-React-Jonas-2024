import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function preHandler() {
    if (step > 1) setStep((s) => --s);
  }
  function nextHandler() {
    if (step < 3) setStep((s) => ++s);
  }
  return (
    <>
      <button className="close" onClick={() => setIsOpen((open) => !open)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 && "active"}>1</div>
            <div className={step >= 2 && "active"}>2</div>
            <div className={step >= 3 && "active"}>3</div>
          </div>
          <div className="message">
            <p>
              Step {step}: {messages[step - 1]}
            </p>
          </div>
          <div className="buttons">
            <Button onClick={preHandler}>
              <span>⏮️</span>Previous
            </Button>
            <Button onClick={nextHandler}>
              Next<span>⏭️</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
function Button({ onClick, children }) {
  return <button onClick={onClick}>{children}</button>;
}
