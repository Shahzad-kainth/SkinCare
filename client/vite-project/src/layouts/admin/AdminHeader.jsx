
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
    <header className="h-16 bg-white border-b px-6 flex items-center justify-between">
     
      <h1 className="text-lg font-semibold text-gray-800">
         <Link to="/">Home</Link>
      </h1>
      

      <button
        onClick={handleLogout}
        className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </header>
  );
};

export default AdminHeader;
