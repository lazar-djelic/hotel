import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/AuthContext";
import { ROUTES } from "../config/routes";
import { useTranslation } from "react-i18next";

type ProtectedRouteProps = {
  allowedRoles?: string[];
};

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { t } = useTranslation();

  if (isLoading) {
    return <div className="text-center mt-20">{t("loading")}</div>;
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
