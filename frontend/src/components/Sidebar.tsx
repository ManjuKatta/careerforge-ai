import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/" },
    { name: "Analyze Career", path: "/analyze" },
    { name: "Projects", path: "/projects" },
    { name: "History", path: "/history" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <aside className="w-64 bg-zinc-900 border-r border-zinc-800 p-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-violet-500 bg-clip-text text-transparent mb-10">
        CareerForge
      </h1>

      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-3 rounded-xl transition ${
              location.pathname === item.path
                ? "bg-blue-500/20 text-blue-400"
                : "hover:bg-zinc-800"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}