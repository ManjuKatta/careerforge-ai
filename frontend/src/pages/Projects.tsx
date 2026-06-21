import { useState, useEffect } from "react";
import api from "../services/api";

interface Project {
  title: string;
  skill: string;
}

export default function Projects() {

  const [projects, setProjects] =
    useState<Project[]>([]);

  const [loading, setLoading] =
    useState(false);
  useEffect(() => {
  loadProjects();
}, []);
    async function loadProjects() {
  try {
    setLoading(true);

    const response = await api.get(
      `/projects/user/${localStorage.getItem("user_id")}`
    );

    setProjects(response.data);

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

  

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-4xl font-bold">
          Recommended Projects
        </h1>

        <div className="text-zinc-400">
  Personalized project recommendations
</div>

      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {projects.map((project) => (

          <div
            key={project.title}
            className="
              bg-zinc-900
              border
              border-zinc-800
              rounded-3xl
              p-6
              hover:border-blue-500
              transition
            "
          >

            <div className="mb-4">

              <span className="
                bg-blue-500/20
                text-blue-400
                px-3
                py-1
                rounded-full
                text-sm
              ">
                {project.skill}
              </span>

            </div>

            <h2 className="text-2xl font-bold">
              {project.title}
            </h2>

            <p className="text-zinc-400 mt-3">
              Recommended project to strengthen your
              {` ${project.skill}`} skills.
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}