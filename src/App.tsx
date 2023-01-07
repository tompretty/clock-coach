import React, { useState } from "react";
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

interface TimeInputProps {
  onSubmit: (time: Time) => void;
}

function TimeInput({ onSubmit }: TimeInputProps) {
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    onSubmit({ hours: parseInt(hours), minutes: parseInt(minutes) });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />

        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
        />

        <button type="submit">Submit</button>
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
