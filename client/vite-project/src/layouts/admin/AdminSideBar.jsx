import { NavLink, Link } from "react-router";

function AdminSideBar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-6 flex flex-col">

      <Link to="/admin">
        <h2 className="text-xl font-bold text-teal-700 mb-8 tracking-tight">
          SkinCare Admin
        </h2>
      </Link>

      <nav className="flex flex-col gap-2">

        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `px-4 py-2.5 rounded-xl text-sm font-medium transition duration-200 ${
              isActive
                ? "bg-teal-400 text-white shadow-sm"
                : "text-gray-500 hover:bg-teal-50 hover:text-teal-700"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/blogs"
          className={({ isActive }) =>
            `px-4 py-2.5 rounded-xl text-sm font-medium transition duration-200 ${
              isActive
                ? "bg-teal-400 text-white shadow-sm"
                : "text-gray-500 hover:bg-teal-50 hover:text-teal-700"
            }`
          }
        >
          Blogs
        </NavLink>

      </nav>

      {/* Bottom tagline */}
      <p className="mt-auto text-xs text-teal-400 tracking-widest uppercase pt-6">
        🌿 Skincare · Admin
      </p>

    </aside>
  );
}

export default AdminSideBar;