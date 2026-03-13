import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

export default function ProtectedRoute() {

  const { user, isAuthChecked } = useSelector((state) => state.auth);
  console.log(user,isAuthChecked);
  if (!isAuthChecked) {
    return <div>Checking Authentication...</div>;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
}