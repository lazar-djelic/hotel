import { useEffect, useState, type FC } from "react";
import { Link, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { useLogin } from "./useLogin";
import { useAuth } from "../../../context/AuthContext";
import { ROUTES } from "../../../config/routes";

const Login: FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { t } = useTranslation();
  const loginMutation = useLogin();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate("/");
        },
      },
    );
  };

  return (
    <div className="flex-1 flex justify-center items-start pt-24 bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {t("navbar.login")}
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text">{t("auth.email")}</span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">{t("auth.password")}</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {loginMutation.isError && (
            <div className="text-red-500 text-sm text-center">
              {(loginMutation.error as any)?.response?.data?.message ||
                "Login failed"}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending
              ? t("auth.loadLoging")
              : t("auth.loginbtn")}
          </button>

          <div className="divider">{t("auth.ORdivider")}</div>

          <div className="form-control mt-2 text-center">
            <Link
              to={ROUTES.ALL.REGISTER}
              className="text-sm link link-hover text-primary"
            >
              {t("navbar.register")}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
