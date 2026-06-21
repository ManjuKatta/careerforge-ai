import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleLogin() {

    if (!email || !password) {
      setMessage("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/auth/login",
        {
          email,
          password
        }
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
        "user_id",
        response.data.user_id
      );

      localStorage.setItem(
        "name",
        response.data.name
      );

      navigate("/");

    } catch (error) {
      console.error(error);

      setMessage(
        "Invalid email or password"
      );

    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-violet-600/20 blur-[120px]" />

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 blur-[120px]" />

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-20">

        <h1 className="text-6xl font-extrabold bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
          CareerForge AI
        </h1>

        <p className="text-zinc-400 text-xl mt-6 max-w-lg">
          AI-powered career guidance platform helping
          professionals become industry-ready faster.
        </p>

        <div className="mt-10 space-y-4 text-zinc-300">
          <p>🚀 Personalized Roadmaps</p>
          <p>📊 Readiness Tracking</p>
          <p>🧠 Skill Gap Analysis</p>
          <p>💼 Project Recommendations</p>
        </div>

      </div>

      {/* Right Side */}
      <div className="flex-1 flex justify-center items-center">

        <div
          className="
          w-[420px]
          backdrop-blur-xl
          bg-white/5
          border border-white/10
          rounded-3xl
          p-10
          shadow-2xl
        "
        >

          <h2 className="text-4xl font-bold text-white">
            Welcome Back
          </h2>

          <p className="text-zinc-400 mt-2 mb-6">
            Sign in to access your roadmap,
            projects and career insights.
          </p>

          {message && (
            <div
              className="
              mb-4
              p-3
              rounded-xl
              bg-red-500/20
              border border-red-500/30
              text-red-400
            "
            >
              {message}
            </div>
          )}

          <div className="space-y-4">

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMessage("");
              }}
              className="
              w-full
              bg-zinc-900/70
              border border-zinc-700
              text-white
              placeholder-zinc-500
              p-4
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setMessage("");
              }}
              className="
              w-full
              bg-zinc-900/70
              border border-zinc-700
              text-white
              placeholder-zinc-500
              p-4
              rounded-xl
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              "
            />

            <button
              onClick={handleLogin}
              disabled={loading}
              className="
              w-full
              bg-gradient-to-r
              from-violet-600
              to-blue-600
              hover:scale-[1.02]
              transition
              rounded-xl
              p-4
              font-semibold
              text-white
              "
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

            <p className="text-center text-zinc-400">
              Don't have an account?

              <span
                className="text-blue-400 ml-2 cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}