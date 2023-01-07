import React, { useState } from "react";
import { BerlinClockFace } from "./BerlinClockFace";
import { TimeGuessForm, TimeInput } from "./TimeGuessForm";
import "./App.css";

interface Time {
  hours: number;
  mins: number;
}

function App() {
  const [time, setTime] = useState<Time>(getRandomTime());
  const [guess, setGuess] = useState<TimeInput>(EMPTY_TIME_INPUT);

  const { flashStatus, flashSuccess, flashError } = useFlash();

  function onSubmitTimeInput() {
    const hours = parseInt(guess.hours.tens + guess.hours.units);
    const mins = parseInt(guess.mins.tens + guess.mins.units);

    if (hours === time.hours && mins === time.mins) {
      console.log({ message: "CORRECT" });

      setTime(getRandomTime());
      setGuess(EMPTY_TIME_INPUT);
      flashSuccess();
    } else {
      console.log({
        message: `INCORRECT, guessed: ${guess.hours}:${guess.mins}, actual: ${time.hours}:${time.mins}`,
      });

      flashError();
    }
  }

  return (
    <div className="app">
      <div className="container">
        <h1>Clock coach</h1>

        <TimeGuessForm
          time={guess}
          setTime={setGuess}
          onSubmit={onSubmitTimeInput}
        />

        <div className="clock-container">
          <BerlinClockFace hours={time.hours} minutes={time.mins} />
        </div>
      </div>

      <Flash status={flashStatus} />
    </div>
  );
}

// ---- Helpers ---- //

// ------ Components ------ //

interface FlashProps {
  status: FlashStatus;
}

type FlashStatus = "DONT_SHOW" | "SHOW_SUCCESS" | "SHOW_ERROR";

function Flash({ status }: FlashProps) {
  if (status === "DONT_SHOW") {
    return null;
  }

  const className =
    status === "SHOW_SUCCESS" ? "flash flash-success" : "flash flash-error";

  return <div className={className}></div>;
}

// ------ Hooks ------ //

function useFlash() {
  const [flashStatus, setFlashStatus] = useState<FlashStatus>("DONT_SHOW");

  function flashSuccess() {
    setFlashStatus("SHOW_SUCCESS");

    setTimeout(() => setFlashStatus("DONT_SHOW"), 1000);
  }

  function flashError() {
    setFlashStatus("SHOW_ERROR");

    setTimeout(() => setFlashStatus("DONT_SHOW"), 1000);
  }

  return { flashStatus, flashSuccess, flashError };
}

// ------ Functions ------ //

function getRandomTime(): Time {
  const hours = Math.floor(Math.random() * 24);
  const mins = Math.floor(Math.random() * 60);

  return { hours, mins };
}

// ------ Constants ------ //

const EMPTY_TIME_INPUT: TimeInput = {
  hours: { tens: "0", units: "0" },
  mins: { tens: "0", units: "0" },
};

export default App;
