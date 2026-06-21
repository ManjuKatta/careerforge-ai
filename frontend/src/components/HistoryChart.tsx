import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface HistoryItem {
  id: number;
  readiness_score: number;
  created_at: string;
}

interface Props {
  history: HistoryItem[];
}

export default function HistoryChart({
  history,
}: Props) {

  const chartData = history.map(
    (item, index) => ({
      analysis: new Date(
      item.created_at
      ).toLocaleDateString(),
      score: item.readiness_score,
    })
  );

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mb-8">

      <h2 className="text-2xl font-bold mb-6">
        Readiness Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart data={chartData}>

          <XAxis dataKey="analysis" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#60a5fa"
            strokeWidth={4}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}