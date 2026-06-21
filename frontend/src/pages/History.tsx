import { useEffect, useState } from "react";
import api from "../services/api";
import HistoryChart from "../components/HistoryChart";
interface HistoryItem {
  id: number;
  user_id: number;
  target_role: string;
  missing_skills: string;
  readiness_score: number;
  created_at:string;
  
}
function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString();
}
export default function History() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      const response = await api.get(
        `/career/history/${localStorage.getItem("user_id")}`
      );

      setHistory(response.data);

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-white">
        Loading...
      </div>
    );
  }

  return (
    <div>

      <h1 className="text-4xl font-bold mb-8">
        Analysis History
      </h1>
      <HistoryChart history={history} />
      <div className="grid gap-6">

        {history
          .slice()
          .reverse()
          .map((item) => (

            <div
              key={item.id}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h2 className="text-2xl font-bold">
                    {item.target_role}
                  </h2>
                  <p className="text-zinc-500 text-sm mt-1">
                    {formatDate(item.created_at)}
                  </p>
                  <p className="text-zinc-400 mt-2">
                    Missing Skills:
                  </p>

                  <p>
                    {item.missing_skills}
                  </p>

                </div>

                <div>

                  <p className="text-zinc-400">
                    Readiness
                  </p>

                  <h2 className="text-5xl font-bold text-green-400">
                    {item.readiness_score}%
                  </h2>

                </div>

              </div>

            </div>

          ))}

      </div>

    </div>
  );
}