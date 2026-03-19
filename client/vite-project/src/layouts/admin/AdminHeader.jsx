import { useNavigate, Link } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../Slices/authSlice';

const AdminHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutState = useSelector((state) => state.auth.logout);

  const handleLogout = () => {
    dispatch(logoutUser());
    if (logoutState.status === 'succeeded')
      navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 px-4 md:px-6 flex items-center justify-between">

      <div className="flex items-center gap-3">
        {/* Mobile: show brand name since sidebar is hidden */}
        <Link to="/admin" className="md:hidden text-lg font-bold text-teal-700">
          SkinCare Admin
        </Link>
        {/* Desktop: show Home link */}
        <h1 className="hidden md:block text-lg font-semibold text-teal-700">
          <Link to="/" className="hover:text-teal-500 transition duration-200">
            Home
          </Link>
        </h1>
      </div>

      <button
        onClick={handleLogout}
        className="px-4 py-2 text-sm font-medium text-white bg-rose-400 rounded-xl hover:bg-rose-500 transition duration-200"
      >
        Logout
      </button>

    </header>
  );
};

export default AdminHeader;