import { NavLink,Link} from "react-router";
function AdminSideBar(){
   const linkClass='px-3 py-2 rounded text-sm font-medium hover:bg-gray-800 transition';
    return(
        <aside className="w-64 bg-gray-900 text-white min-h-screen p-5 ">
            <Link to="/admin"><h2 className="text-xl font-bold mb-6">Admin Panel</h2></Link>  
              <nav className="flex flex-col gap-2">
                  <NavLink
                  to="/admin/dashboard"
                  className={({isActive})=>{
                    return `${linkClass} ${isActive ? "bg-gray-800":""}`
                  }}
                  >
                    Dashboard
                  </NavLink>
                  <NavLink
                  to="/admin/blogs"
                  className={({isActive})=>{
                    return `${linkClass} ${isActive ? "bg-gray-800":""}`
                  }}
                  >
                    Blogs
                  </NavLink>
                  <NavLink
                  to="/admin/create"
                  className={({isActive})=>{
                    return `${linkClass} ${isActive ? "bg-gray-800":""}`
                  }}
                  >
                    Create
                  </NavLink>
               
              </nav>
        </aside>
    )
}

export default AdminSideBar;