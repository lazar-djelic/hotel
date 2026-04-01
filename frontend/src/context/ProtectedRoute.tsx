import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../config/routes";

type ProtectedRouteProps = {
  allowedRoles?: string[];
};

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.ALL.LOGIN} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
