
import { useNavigate } from "react-router";
import {Link} from "react-router"
import {useSelector,useDispatch} from 'react-redux';
import {logoutUser} from '../../features/authSlice';
const AdminHeader = () => {
   const dispatch=useDispatch();
  const navigate = useNavigate()
    const logoutState=useSelector((state)=>state.auth.logout)
  const handleLogout = () => {
     dispatch(logoutUser())
     if(logoutState.status==='succeeded')
     navigate("/login");
  };

  return (
  <header className="h-16 bg-white border-b border-emerald-100 px-6 flex items-center justify-between sticky top-0 z-10">
    
    <h1 className="text-lg font-semibold text-emerald-700">
      <Link to="/" className="hover:text-emerald-900 transition">
        SkinCare Admin
      </Link>
    </h1>

    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm font-medium text-white bg-rose-400 rounded-lg hover:bg-rose-500 transition"
    >
      Logout
    </button>

  </header>
);
};

export default AdminHeader;
