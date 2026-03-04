import { useState, type FC } from "react";
import { useNavigate } from "react-router";
import { useRegister } from "./useRegister";
import { useTranslation } from "react-i18next";

const Register: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    registerMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate("/");
        },
        onError: (err: any) => {
          setError(err.response?.data?.message || "Registration failed");
        },
      },
    );
  };

  return (
    <div className="flex-1 flex justify-center items-start pt-24 bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {t("navbar.register")}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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

          <div>
            <label className="label">
              <span className="label-text">{t("auth.confpass")}</span>
            </label>
            <input
              type="password"
              className="input input-bordered w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full mt-4"
            disabled={registerMutation.isPending}
          >
            {registerMutation.isPending
              ? t("auth.loadRegister")
              : t("auth.registerbtn")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
