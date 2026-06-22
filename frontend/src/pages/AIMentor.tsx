import { useState } from "react";
import api from "../services/api";

export default function AIMentor() {

  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function askMentor() {

    if (!message.trim()) return;

    try {

      setLoading(true);

      const response = await api.post(
        "/chat",
        {
          message
        }
      );

      setReply(
        response.data.response
      );

    } catch (error) {

      console.error(error);

      setReply(
        "Failed to get AI response."
      );

    } finally {

      setLoading(false);

    }
  }

  return (

    <div>

      <h1 className="text-5xl font-bold mb-8">
        AI Career Mentor
      </h1>

      <div className="
      bg-zinc-900
      border border-zinc-800
      rounded-3xl
      p-8
      ">

        <textarea
          rows={5}
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          placeholder="Ask anything about your career..."
          className="
          w-full
          bg-zinc-800
          rounded-xl
          p-4
          text-white
          "
        />

        <button
          onClick={askMentor}
          className="
          mt-4
          px-6
          py-3
          rounded-xl
          bg-gradient-to-r
          from-violet-600
          to-blue-600
          "
        >
          {loading
            ? "Thinking..."
            : "Ask AI"}
        </button>

        {reply && (

          <div
            className="
            mt-8
            bg-zinc-800
            rounded-2xl
            p-6
            whitespace-pre-wrap
            "
          >
            {reply}
          </div>

        )}

      </div>

    </div>

  );
}