import { Link } from "react-router";
import { MoonIcon, SunIcon } from "lucide-react";
import type { FC } from "react";

const Navbar: FC = () => {
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
              <span>Reservations</span>
            </Link>
          </li>
          <li>
            <Link to={"/reviews"}>
              <span>Reviews</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
