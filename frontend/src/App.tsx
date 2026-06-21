import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Analyze from "./pages/Analyze";
import Projects from "./pages/Projects";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {token ? (

          <Route
            path="/*"
            element={
              <div className="flex min-h-screen bg-zinc-950 text-white">

                <Sidebar />

                <main className="flex-1 p-8 text-white">

                  <Routes>

                    <Route
                      path="/"
                      element={<Dashboard />}
                    />

                    <Route
                      path="/analyze"
                      element={<Analyze />}
                    />

                    <Route
                      path="/projects"
                      element={<Projects />}
                    />

                    <Route
                      path="/history"
                      element={<History />}
                    />

                    <Route
                      path="/settings"
                      element={<Settings />}
                    />

                  </Routes>

                </main>

              </div>
            }
          />

        ) : (

          <Route
            path="*"
            element={<Login />}
          />

        )}

      </Routes>

    </BrowserRouter>
  );
}
export default App;