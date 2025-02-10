import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";

interface ProtectedRouteProps {
  role: "staff" | "user";
}

const ProtectedRoute = ({ role }: ProtectedRouteProps) => {
  const { user } = useAuth();
  console.log(user);
  const location = useLocation();

  if (role === "staff" && !user?.staff_id) {
    console.log("staff", user?.staff_id);
    return (
      <Navigate to="/staff/auth/login" state={{ from: location }} replace />
    );
  }

  if (role === "user" && !user?.user_id) {
    console.log("user", user?.user_id);
    return (
      <Navigate to="/user/auth/login" state={{ from: location }} replace />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
