import React, { useEffect, useRef, useState } from "react";
import { BerlinClockFace } from "./BerlinClockFace";
import "./App.css";

function App() {
  const [time, setTime] = useState(getRandomTime());

  function onSubmitTimeInput(guess: Time) {
    if (guess.hours === time.hours && guess.minutes === time.minutes) {
      console.log({ message: "CORRECT" });

      setTime(getRandomTime());
    } else {
      console.log({
        message: `INCORRECT, guessed: ${guess.hours}:${guess.minutes}, actual: ${time.hours}:${time.minutes}`,
      });
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Clock coach</h1>

        <TimeInput onSubmit={onSubmitTimeInput} />

        <div className="clock-container">
          <BerlinClockFace hours={time.hours} minutes={time.minutes} />
        </div>
      </div>
    </div>
  );
}

interface UseDigitFunctions {
  onGoForward: () => void;
  onGoBack: () => void;
}

function useDigitInput({ onGoForward, onGoBack }: UseDigitFunctions) {
  const [digit, setDigit] = useState("0");

  function onDigitChange(e: React.ChangeEvent<HTMLInputElement>) {
    const input = e.target.value;

    if (!/^[0-9]*$/.test(input)) {
      return;
    }

    // added to the left
    if (input.length === 2 && input[0] === digit) {
      setDigit(input[1]);
      onGoForward();
    }
    // added to the right
    else if (input.length === 2 && input[1] === digit) {
      setDigit(input[0]);
      onGoForward();
    }
    // overwritten digit
    else if (input.length === 1) {
      setDigit(input);
      onGoForward();
    }
    // deleted digit
    else {
      setDigit("0");
      onGoBack();
    }
  }

  return { digit, onDigitChange };
}

interface TimeInputProps {
  onSubmit: (time: Time) => void;
}

function TimeInput({ onSubmit }: TimeInputProps) {
  const hoursTensRef = useRef<HTMLInputElement>(null);
  const hoursUnitsRef = useRef<HTMLInputElement>(null);
  const minsTensRef = useRef<HTMLInputElement>(null);
  const minsUnitsRef = useRef<HTMLInputElement>(null);

  const { digit: hoursTens, onDigitChange: onHoursTensChange } = useDigitInput({
    onGoForward: () => hoursUnitsRef.current?.focus(),
    onGoBack: () => {},
  });
  const { digit: hoursUnits, onDigitChange: onHoursUnitsChange } =
    useDigitInput({
      onGoForward: () => minsTensRef.current?.focus(),
      onGoBack: () => hoursTensRef.current?.focus(),
    });
  const { digit: minsTens, onDigitChange: onMinsTensChange } = useDigitInput({
    onGoForward: () => minsUnitsRef.current?.focus(),
    onGoBack: () => hoursUnitsRef.current?.focus(),
  });
  const { digit: minsUnits, onDigitChange: onMinsUnitsChange } = useDigitInput({
    onGoForward: () => {},
    onGoBack: () => minsTensRef.current?.focus(),
  });

  useEffect(() => {
    hoursTensRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onSubmit({
      hours: parseInt(hoursTens + hoursUnits),
      minutes: parseInt(minsTens + minsUnits),
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            ref={hoursTensRef}
            className="time-digit"
            pattern="[0-9]+"
            size={1}
            value={hoursTens}
            onChange={onHoursTensChange}
          />

          <input
            ref={hoursUnitsRef}
            className="time-digit time-digit-right"
            pattern="[0-9]+"
            size={1}
            value={hoursUnits}
            onChange={onHoursUnitsChange}
          />

          <span className="time-colon">:</span>

          <input
            ref={minsTensRef}
            className="time-digit"
            pattern="[0-9]+"
            size={1}
            value={minsTens}
            onChange={onMinsTensChange}
          />

          <input
            ref={minsUnitsRef}
            className="time-digit time-digit-right"
            pattern="[0-9]+"
            size={1}
            value={minsUnits}
            onChange={onMinsUnitsChange}
          />
        </div>

        <div className="submit-container">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

interface Time {
  hours: number;
  minutes: number;
}

function getRandomTime(): Time {
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);

  return { hours, minutes };
}

export default App;
