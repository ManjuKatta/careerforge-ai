import { useState } from "react";
import api from "../services/api";

export default function Resume() {

  const [file, setFile] =
    useState<File | null>(null);

  const [role, setRole] =
    useState("");

  const [result, setResult] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(false);

  async function handleAnalyze() {

    if (!file || !role) {
      alert("Select role and resume");
      return;
    }

    try {

      setLoading(true);

      const formData =
        new FormData();

      formData.append(
        "file",
        file
      );

      formData.append(
        "role",
        role
      );

      const response =
        await api.post(
          "/resume/analyze",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      setResult(
        response.data
      );

    } catch (error) {

      console.error(error);

      alert(
        "Resume analysis failed"
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="text-white">

    <div className="mb-8">

      <h1 className="text-5xl font-bold">
        Resume Analyzer
      </h1>

      <p className="text-zinc-400 mt-2">
        Upload your resume and get AI-powered career insights.
      </p>

    </div>

      <div className="
max-w-4xl
bg-zinc-900
border
border-zinc-800
rounded-3xl
p-8
shadow-2xl
">

        <div className="space-y-5">

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="
w-full
bg-zinc-800
text-white
p-4
rounded-xl
border
border-zinc-700
focus:outline-none
focus:ring-2
focus:ring-blue-500
"
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

          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setFile(
                e.target.files?.[0] || null
              )
            }
            className="
w-full
bg-zinc-800
text-zinc-300
p-4
rounded-xl
border
border-zinc-700
"
          />

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="
w-full
bg-gradient-to-r
from-violet-600
to-blue-600
rounded-xl
p-4
font-semibold
hover:scale-[1.01]
transition
"
          >
            {loading
              ? "Analyzing..."
              : "Analyze Resume"}
          </button>

        </div>

      </div>

      {result && (

        <div className="mt-8 space-y-6">

          <div className="
          bg-zinc-900
          rounded-3xl
          p-8
          ">

            <p className="text-zinc-400">
              Resume Score
            </p>

            <h2 className="
            text-6xl
            font-bold
            text-green-400
            mt-2
            ">
              {result.readiness_score}%
            </h2>

          </div>

          <div className="
          bg-zinc-900
          rounded-3xl
          p-8
          ">

            <h2 className="
            text-2xl
            font-bold
            mb-4
            ">
              Detected Skills
            </h2>

            <div className="
            flex flex-wrap gap-3
            ">
              {result.detected_skills.map(
                (skill: string) => (
                  <span
                    key={skill}
                    className="
                    bg-green-500/20
                    text-green-400
                    px-4 py-2
                    rounded-full
                    "
                  >
                    {skill}
                  </span>
                )
              )}
            </div>

          </div>

          <div className="
          bg-zinc-900
          rounded-3xl
          p-8
          ">

            <h2 className="
            text-2xl
            font-bold
            mb-4
            ">
              Missing Skills
            </h2>

            <div className="
            flex flex-wrap gap-3
            ">
              {result.missing_skills.map(
                (skill: string) => (
                  <span
                    key={skill}
                    className="
                    bg-red-500/20
                    text-red-400
                    px-4 py-2
                    rounded-full
                    "
                  >
                    {skill}
                  </span>
                )
              )}
            </div>

          </div>

          <div className="
          bg-zinc-900
          rounded-3xl
          p-8
          ">

            <h2 className="
            text-2xl
            font-bold
            mb-4
            ">
              Recommended Projects
            </h2>

            <div className="space-y-4">

              {result.recommended_projects.map(
                (project: any) => (

                  <div
                    key={project.title}
                    className="
                    bg-zinc-800
                    p-4
                    rounded-xl
                    "
                  >
                    <h3 className="font-bold">
                      {project.title}
                    </h3>

                    <p className="text-zinc-400">
                      {project.skill}
                    </p>
                  </div>

                )
              )}

            </div>

          </div>

        </div>

      )}

    </div>
  );
}