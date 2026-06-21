import { useState } from "react";
import api from "../services/api";
import ScoreRing from "../components/ScoreRing";

interface RoadmapItem {
  week: number;
  task: string;
}

interface AnalysisResult {
  role: string;
  required_skills: string[];
  missing_skills: string[];
  roadmap: RoadmapItem[];
  readiness_score: number;
}

export default function Analyze() {
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [loading, setLoading] = useState(false);

  const [result, setResult] =
    useState<AnalysisResult | null>(null);

  async function handleAnalyze() {
    try {
      setLoading(true);

      const response = await api.post(
        "/career/analyze",
        {
          user_id: 1,
          role,
          current_skills: skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean),
        }
      );

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Analysis failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Analyze Career
      </h1>

      {/* Form */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

        <div className="mb-6">
          <label className="block mb-2 text-zinc-400">
            Target Role
          </label>

          <select
            className="w-full bg-zinc-800 rounded-xl p-4"
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          >
            <option value="">
              Select Role
            </option>

            <option value="AI Engineer">
              AI Engineer
            </option>

            <option value="ML Engineer">
              ML Engineer
            </option>

            <option value="Data Analyst">
              Data Analyst
            </option>

          </select>
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-zinc-400">
            Current Skills
          </label>

          <input
            type="text"
            placeholder="Python, SQL"
            value={skills}
            onChange={(e) =>
              setSkills(e.target.value)
            }
            className="w-full bg-zinc-800 rounded-xl p-4"
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-xl font-semibold"
        >
          {loading
            ? "Analyzing..."
            : "Analyze Career"}
        </button>

      </div>

      {/* Results */}
      {result && (

        <div className="mt-8 space-y-8">

          {/* Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

              <h2 className="text-xl font-bold mb-4">
                Readiness Score
              </h2>

              <ScoreRing
                score={result.readiness_score}
              />

            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

              <p className="text-zinc-400">
                Missing Skills
              </p>

              <h2 className="text-5xl font-bold mt-3">
                {result.missing_skills.length}
              </h2>

            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

              <p className="text-zinc-400">
                Target Role
              </p>

              <h2 className="text-2xl font-bold mt-3">
                {result.role}
              </h2>

            </div>

          </div>

          {/* Missing Skills */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-6">
              Missing Skills
            </h2>

            <div className="flex flex-wrap gap-3">

              {result.missing_skills.map(
                (skill) => (
                  <span
                    key={skill}
                    className="bg-red-500/20 text-red-400 px-4 py-2 rounded-full"
                  >
                    {skill}
                  </span>
                )
              )}

            </div>

          </div>

          {/* Roadmap */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8">

            <h2 className="text-2xl font-bold mb-6">
              Learning Roadmap
            </h2>

            <div className="space-y-6">

              {result.roadmap.map((item) => (

                <div
                  key={item.week}
                  className="flex gap-4"
                >

                  <div className="flex flex-col items-center">

                    <div className="w-5 h-5 bg-blue-500 rounded-full" />

                    <div className="w-[2px] h-16 bg-zinc-700" />

                  </div>

                  <div>

                    <p className="text-blue-400 font-semibold">
                      Week {item.week}
                    </p>

                    <p>
                      {item.task}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}