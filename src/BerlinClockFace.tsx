interface BerlinClockFaceProps {
  hours: number;
  minutes: number;
}

export function BerlinClockFace({ hours, minutes }: BerlinClockFaceProps) {
  const num5HourSegmentsLitUp = Math.floor(hours / 5);
  const num1HourSegmentsLitUp = hours % 5;
  const num5MinSegmentsLitUp = Math.floor(minutes / 5);
  const num1MinSegmentsLitUp = minutes % 5;

  return (
    <div>
      <svg viewBox="0 0 45 45">
        <BerlinClockFaceRow
          xStart={1}
          yStart={1}
          width={10}
          height={10}
          numSegments={4}
          numSegmentsLitUp={num5HourSegmentsLitUp}
          getColour={() => "red"}
        />

        <BerlinClockFaceRow
          xStart={1}
          yStart={12}
          width={10}
          height={10}
          numSegments={4}
          numSegmentsLitUp={num1HourSegmentsLitUp}
          getColour={() => "red"}
        />

        <BerlinClockFaceRow
          xStart={1}
          yStart={23}
          width={3}
          height={10}
          numSegments={11}
          numSegmentsLitUp={num5MinSegmentsLitUp}
          getColour={(i) => ((i + 1) % 3 === 0 ? "red" : "yellow")}
        />

        <BerlinClockFaceRow
          xStart={1}
          yStart={34}
          width={10}
          height={10}
          numSegments={4}
          numSegmentsLitUp={num1MinSegmentsLitUp}
          getColour={() => "red"}
        />
      </svg>
    </div>
  );
}

interface BerlinClockFaceRowProps {
  xStart: number;
  yStart: number;
  width: number;
  height: number;
  numSegments: number;
  numSegmentsLitUp: number;
  getColour: (i: number) => string;
}

function BerlinClockFaceRow({
  xStart,
  yStart,
  width,
  height,
  numSegments,
  numSegmentsLitUp,
  getColour,
}: BerlinClockFaceRowProps) {
  return (
    <g>
      {Array.from(Array(numSegments).keys()).map((i) => (
        <rect
          key={i}
          x={xStart + i * (width + 1)}
          y={yStart}
          width={width}
          height={height}
          fill={i + 1 <= numSegmentsLitUp ? getColour(i) : "white"}
          stroke="black"
          strokeWidth="2"
          paintOrder="stroke"
        />
      ))}
    </g>
  );
}
