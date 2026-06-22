import { useEffect, useState } from "react";
import api from "../services/api";

export default function Settings() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [targetRole, setTargetRole] =
    useState("");

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {

    try {

      const userId =
        localStorage.getItem("user_id");

      const response =
        await api.get(
          `/users/${userId}`
        );

      setName(response.data.name);

      setEmail(response.data.email);

      setTargetRole(
        response.data.target_role
      );

    } catch (error) {
      console.error(error);
    }
  }

  async function updateUser() {

    try {

      const userId =
        localStorage.getItem("user_id");

      await api.put(
        `/users/${userId}`,
        {
          name,
          email,
          target_role: targetRole
        }
      );

      setMessage(
        "Profile updated successfully"
      );

      localStorage.setItem(
        "name",
        name
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Update failed"
      );
    }
  }

  return (

    <div className="max-w-3xl">

      <h1 className="text-4xl font-bold mb-8">
        Settings
      </h1>

      {message && (
        <div className="
        mb-6
        p-4
        rounded-xl
        bg-green-500/20
        text-green-400
        ">
          {message}
        </div>
      )}

      <div className="
      bg-zinc-900
      border border-zinc-800
      rounded-3xl
      p-8
      space-y-6
      ">

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Name"
          className="
          w-full
          bg-zinc-800
          p-4
          rounded-xl
          "
        />

        <input
          type="email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Email"
          className="
          w-full
          bg-zinc-800
          p-4
          rounded-xl
          "
        />

        <select
          value={targetRole}
          onChange={(e) =>
            setTargetRole(
              e.target.value
            )
          }
          className="
          w-full
          bg-zinc-800
          p-4
          rounded-xl
          "
        >
          <option>
            AI Engineer
          </option>

          <option>
            ML Engineer
          </option>

          <option>
            Data Analyst
          </option>

        </select>

        <button
          onClick={updateUser}
          className="
          w-full
          bg-gradient-to-r
          from-violet-600
          to-blue-600
          rounded-xl
          p-4
          font-semibold
          "
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}