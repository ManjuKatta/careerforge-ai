import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", score: 20 },
  { month: "Feb", score: 35 },
  { month: "Mar", score: 40 },
  { month: "Apr", score: 55 },
  { month: "May", score: 70 },
];

export default function ReadinessChart() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6">
        Readiness Growth
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
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