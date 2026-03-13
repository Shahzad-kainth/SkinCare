import { NavLink,Link} from "react-router";
function AdminSideBar(){
   const linkClass='px-3 py-2 rounded text-sm font-medium hover:bg-gray-800 transition';
    return (
  <aside className="w-64 bg-white border-r border-emerald-100 min-h-screen p-6">
    
    <Link to="/admin">
      <h2 className="text-2xl font-bold text-emerald-700 mb-8">
        SkinCare Admin
      </h2>
    </Link>

    <nav className="flex flex-col gap-2">

      <NavLink
        to="/admin/dashboard"
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg text-sm font-medium transition ${
            isActive
              ? "bg-emerald-500 text-white"
              : "text-gray-700 hover:bg-emerald-50"
          }`
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/admin/blogs"
        className={({ isActive }) =>
          `px-4 py-2 rounded-lg text-sm font-medium transition ${
            isActive
              ? "bg-emerald-500 text-white"
              : "text-gray-700 hover:bg-emerald-50"
          }`
        }
      >
        Blogs
      </NavLink>
   
    </nav>

  </aside>
);
}

export default AdminSideBar;