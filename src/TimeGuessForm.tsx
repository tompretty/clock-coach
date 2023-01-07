import React, { useEffect, useRef } from "react";

interface TimeGuessFormProps {
  time: TimeInput;
  setTime: (time: TimeInput) => void;
  onSubmit: () => void;
}

export interface TimeInput {
  hours: TimeInputDigits;
  mins: TimeInputDigits;
}

interface TimeInputDigits {
  tens: string;
  units: string;
}

export function TimeGuessForm({ time, setTime, onSubmit }: TimeGuessFormProps) {
  const hoursTensRef = useRef<HTMLInputElement>(null);
  const hoursUnitsRef = useRef<HTMLInputElement>(null);
  const minsTensRef = useRef<HTMLInputElement>(null);
  const minsUnitsRef = useRef<HTMLInputElement>(null);

  const onHoursTensChange = getOnDigitChange({
    digit: time.hours.tens,
    setDigit: (digit) =>
      setTime({ ...time, hours: { ...time.hours, tens: digit } }),
    onGoForward: () => hoursUnitsRef.current?.focus(),
    onGoBack: () => {},
  });

  const onHoursUnitsChange = getOnDigitChange({
    digit: time.hours.units,
    setDigit: (digit) =>
      setTime({ ...time, hours: { ...time.hours, units: digit } }),
    onGoForward: () => minsTensRef.current?.focus(),
    onGoBack: () => hoursTensRef.current?.focus(),
  });

  const onMinsTensChange = getOnDigitChange({
    digit: time.mins.tens,
    setDigit: (digit) =>
      setTime({ ...time, mins: { ...time.mins, tens: digit } }),
    onGoForward: () => minsUnitsRef.current?.focus(),
    onGoBack: () => hoursUnitsRef.current?.focus(),
  });

  const onMinsUnitsChange = getOnDigitChange({
    digit: time.mins.units,
    setDigit: (digit) =>
      setTime({ ...time, mins: { ...time.mins, units: digit } }),
    onGoForward: () => {},
    onGoBack: () => minsTensRef.current?.focus(),
  });

  useEffect(() => {
    hoursTensRef.current?.focus();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    hoursTensRef.current?.focus();
    onSubmit();
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
            value={time.hours.tens}
            onChange={onHoursTensChange}
          />

          <input
            ref={hoursUnitsRef}
            className="time-digit time-digit-right"
            pattern="[0-9]+"
            size={1}
            value={time.hours.units}
            onChange={onHoursUnitsChange}
          />

          <span className="time-colon">:</span>

          <input
            ref={minsTensRef}
            className="time-digit"
            pattern="[0-9]+"
            size={1}
            value={time.mins.tens}
            onChange={onMinsTensChange}
          />

          <input
            ref={minsUnitsRef}
            className="time-digit time-digit-right"
            pattern="[0-9]+"
            size={1}
            value={time.mins.units}
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

// ---- Helpers ---- //

interface GetOnDigitChangeProps {
  digit: string;
  setDigit: (digit: string) => void;
  onGoForward: () => void;
  onGoBack: () => void;
}

function getOnDigitChange({
  digit,
  setDigit,
  onGoForward,
  onGoBack,
}: GetOnDigitChangeProps) {
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

  return onDigitChange;
}
