import { useEffect, useState } from "react";
import api from "../services/api";
import ReadinessChart from "../components/ReadinessChart";

interface LatestAnalysis {
  target_role: string;
  readiness_score: number;
  missing_skills: string;
}

export default function Dashboard() {

  const [data, setData] =
    useState<LatestAnalysis | null>(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  async function fetchDashboard() {

    try {

      const userId =
        localStorage.getItem("user_id");

      if (!userId) return;

      const response = await api.get(
        `/career/latest/${userId}`
      );

      if (response.data) {
        setData(response.data);
      }

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>

      {/* Hero */}

      <div
        className="
        rounded-3xl
        p-10
        bg-gradient-to-r
        from-violet-600
        via-blue-600
        to-cyan-500
        shadow-2xl
        "
      >

        <h1
          className="
          text-5xl
          font-bold
          mb-4
          text-white
          "
        >
          Welcome back,
          {" "}
          {localStorage.getItem("name")}
          👋
        </h1>

        <p
          className="
          text-xl
          text-white/90
          "
        >
          Continue building your dream career.
        </p>

      </div>

      {/* Stats */}

      <div
        className="
        grid
        grid-cols-3
        gap-6
        mt-8
        "
      >

        <div
          className="
          bg-zinc-900
          border
          border-zinc-800
          rounded-2xl
          p-6
          "
        >

          <p className="text-zinc-400">
            Readiness Score
          </p>

          <h2
            className="
            text-5xl
            font-bold
            mt-3
            text-green-400
            "
          >
            {data?.readiness_score ?? 0}%
          </h2>

        </div>

        <div
          className="
          bg-zinc-900
          border
          border-zinc-800
          rounded-2xl
          p-6
          "
        >

          <p className="text-zinc-400">
            Missing Skills
          </p>

          <h2
            className="
            text-5xl
            font-bold
            mt-3
            "
          >
            {
              data?.missing_skills
                ?.split(",")
                .filter(Boolean)
                .length ?? 0
            }
          </h2>

        </div>

        <div
          className="
          bg-zinc-900
          border
          border-zinc-800
          rounded-2xl
          p-6
          "
        >

          <p className="text-zinc-400">
            Target Role
          </p>

          <h2
            className="
            text-2xl
            font-bold
            mt-3
            "
          >
            {data?.target_role ?? "-"}
          </h2>

        </div>

      </div>

      {/* Chart / Empty State */}

      {
        data ? (
          <ReadinessChart />
        ) : (
          <div
            className="
            mt-10
            bg-zinc-900
            border
            border-zinc-800
            rounded-3xl
            p-10
            text-center
            "
          >

            <h2
              className="
              text-2xl
              font-bold
              "
            >
              No Analysis Yet
            </h2>

            <p
              className="
              text-zinc-400
              mt-2
              "
            >
              Start a career analysis to see your readiness score.
            </p>

          </div>
        )
      }

    </div>
  );
}