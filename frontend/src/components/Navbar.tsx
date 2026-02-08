import { Link } from "react-router";
import { MoonIcon, SunIcon } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const Navbar: FC = () => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  return (
    <div className="navbar bg-base-100">
      <h1 className="flex-1 text-3xl font-bold font-mono tracking-tight px-20">
        <Link to={"/"}>Hotel manager</Link>
      </h1>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-20">
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              checked={i18n.language === "en"}
              onChange={(e) =>
                i18n.changeLanguage(e.target.checked ? "en" : "sr")
              }
            />
            <span className="fi fi-rs swap-on px-8 text-xl" />
            <span className="fi fi-gb swap-off px-8 text-xl" />
          </label>

          <label className="swap swap-rotate">
            <input
              type="checkbox"
              onChange={(e) => {
                document.documentElement.setAttribute(
                  "data-theme",
                  e.target.checked ? "pastel" : "night",
                );
              }}
              className="theme-controller"
              value="pastel"
            />
            <MoonIcon className="swap-on" />
            <SunIcon className="swap-off" />
          </label>

          <li>
            <Link to={"/reservations"}>
              <span>{t("navbar.reservations")}</span>
            </Link>
          </li>
          <li>
            <Link to={"/reviews"}>
              <span>{t("navbar.reviews")}</span>
            </Link>
          </li>
          <li>
            <Link to={"/config"}>
              <span>{t("navbar.configuration")}</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
