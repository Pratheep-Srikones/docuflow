import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

interface ProtectedRouteProps {
  role: "staff" | "user";
}

const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();

  // ✅ Directly check localStorage if user is null
  const storedStaffId = localStorage.getItem("staff_id");
  const storedUserId = localStorage.getItem("user_id");

  if (role === "staff" && !user?.staff_id && !storedStaffId) {
    return (
      <Navigate to="/staff/auth/login" state={{ from: location }} replace />
    );
  }

  if (role === "user" && !user?.user_id && !storedUserId) {
    return (
      <Navigate to="/user/auth/login" state={{ from: location }} replace />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
