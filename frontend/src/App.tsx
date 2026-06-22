import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Resume from "./pages/Resume";
import Dashboard from "./pages/Dashboard";
import Analyze from "./pages/Analyze";
import Projects from "./pages/Projects";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {

  const token =
    localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
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
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

                    <Route
  path="/analyze"
  element={
    <ProtectedRoute>
      <Analyze />
    </ProtectedRoute>
  }
/>
                    <Route
  path="/projects"
  element={
    <ProtectedRoute>
      <Projects />
    </ProtectedRoute>
  }
/>

                    <Route
  path="/history"
  element={
    <ProtectedRoute>
      <History />
    </ProtectedRoute>
  }
/>

                    <Route
  path="/settings"
  element={
    <ProtectedRoute>
      <Settings />
    </ProtectedRoute>
  }
/>
<Route
  path="/resume"
  element={
    <ProtectedRoute>
      <Resume />
    </ProtectedRoute>
  }
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