import {
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

export default function Sidebar() {

  const location = useLocation();

  const navigate = useNavigate();

  const userName =
    localStorage.getItem("name");

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
    },
    {
      name: "Analyze Career",
      path: "/analyze",
    },
    {
      name: "Projects",
      path: "/projects",
    },
    {
      name: "Resume Analyzer",
      path: "/resume",
    },
    {
      name: "History",
      path: "/history",
    },
    {
      name: "Settings",
      path: "/settings",
    },
    {
  name: "AI Mentor",
  path: "/mentor",
},
  ];

  function handleLogout() {

    localStorage.removeItem("token");

    localStorage.removeItem("user_id");

    localStorage.removeItem("name");

    navigate("/login");
  }

  return (

    <aside
      className="
      w-64
      bg-zinc-900
      border-r
      border-zinc-800
      p-6
      flex
      flex-col
      "
    >

      {/* Logo */}

      <h1
        className="
        text-3xl
        font-extrabold
        bg-gradient-to-r
        from-blue-400
        via-violet-500
        to-cyan-400
        bg-clip-text
        text-transparent
        mb-10
        "
      >
        CareerForge
      </h1>

      {/* Navigation */}

      <nav className="space-y-3 flex-1">

        {menuItems.map((item) => (

          <Link
            key={item.path}
            to={item.path}
            className={`
            block
            px-4
            py-3
            rounded-xl
            transition
            font-medium

            ${
              location.pathname === item.path
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/20"
                : "hover:bg-zinc-800 text-zinc-300"
            }
            `}
          >

            {item.name}

          </Link>

        ))}

      </nav>

      {/* User Card */}

      <div
        className="
        mt-6
        bg-zinc-800/60
        border
        border-zinc-700
        rounded-2xl
        p-4
        "
      >

        <div className="flex items-center gap-3">

          <div
            className="
            w-12
            h-12
            rounded-full
            bg-gradient-to-r
            from-violet-500
            to-blue-500
            flex
            items-center
            justify-center
            text-lg
            font-bold
            "
          >
            {userName?.charAt(0)}
          </div>

          <div>

            <p className="font-semibold text-white">
              {userName}
            </p>

            <p className="text-zinc-400 text-sm">
              CareerForge User
            </p>

          </div>

        </div>

        {/* Logout Button */}

        <button
          onClick={handleLogout}
          className="
          mt-5
          w-full
          bg-red-500/20
          border
          border-red-500/30
          text-red-400
          rounded-xl
          p-3
          hover:bg-red-500/30
          transition
          font-medium
          "
        >
          Logout
        </button>

      </div>

    </aside>
  );
}