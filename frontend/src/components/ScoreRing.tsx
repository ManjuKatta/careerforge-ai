interface Props {
  score: number;
}

export default function ScoreRing({
  score,
}: Props) {

  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  const offset =
    circumference -
    (score / 100) * circumference;

  return (
    <div className="flex justify-center">

      <svg
        width="220"
        height="220"
      >

        <circle
          cx="110"
          cy="110"
          r={radius}
          stroke="#27272a"
          strokeWidth="15"
          fill="none"
        />

        <circle
          cx="110"
          cy="110"
          r={radius}
          stroke="#3b82f6"
          strokeWidth="15"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 110 110)"
        />

        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fill="white"
          fontSize="42"
          fontWeight="bold"
        >
          {score}%
        </text>

      </svg>

    </div>
  );
}