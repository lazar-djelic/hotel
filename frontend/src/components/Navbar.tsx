import { Link, useNavigate } from "react-router";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { useLogout } from "../pages/profile-page/useLogout";
import { useAuth } from "../context/AuthContext";
import { USER_ROLE } from "../config/enums";
import { MenuIcon, MoonIcon, SunIcon } from "lucide-react";
import { setTheme } from "../config/theme";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { setLanguage } from "../config/language";
import { ROUTES } from "../config/routes";
import { useMyMessages } from "../pages/api/messages/useMyMessages";
import { useUnseenMessages } from "../pages/api/messages/useUnseenMessages";

const Navbar: FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const logoutMutation = useLogout();

  const { user, isAuthenticated } = useAuth();
  const shouldFetchMessages =
    isAuthenticated &&
    (user?.role === USER_ROLE.guest || user?.role === USER_ROLE.receptionist);
  const { messages } = useMyMessages(shouldFetchMessages);
  const unseenCount = useUnseenMessages(shouldFetchMessages, user, messages);

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  const toggleTheme = (theme: string = "business") => {
    setTheme(theme);
  };

  const toggleLanguage = (lng: string = "en") => {
    setLanguage(lng);
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 shadow-md">
      <h1 className="flex-1 text-3xl font-bold font-mono tracking-tight px-20">
        <Link to={"/"}>Hotel name</Link>
      </h1>

      <div className="flex-none">
        <ul className="menu menu-horizontal px-20">
          {isAuthenticated && user.role === USER_ROLE.admin && (
            <>
              <li>
                <Link to={ROUTES.ADMIN.USERS}>
                  <span>{t("navbar.users")}</span>
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ADMIN.AMENITIES}>
                  <span>{t("navbar.amenities")}</span>
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ADMIN.ROOMS}>
                  <span>{t("navbar.rooms")}</span>
                </Link>
              </li>
            </>
          )}

          {isAuthenticated && user.role === USER_ROLE.receptionist && (
            <>
              <li>
                <Link to={ROUTES.RECEPTION.CHECK_IN}>
                  <span>{t("navbar.checkin")}</span>
                </Link>
              </li>
              <li>
                <Link to={ROUTES.RECEPTION.CHECK_OUT}>
                  <span>{t("navbar.checkout")}</span>
                </Link>
              </li>
              <li>
                <Link to={ROUTES.RECEPTION.ROOM_RES_S}>
                  <span>{t("navbar.roomress")}</span>
                </Link>
              </li>
              <li>
                <Link to={ROUTES.RECEPTION.AM_RES_S}>
                  <span>{t("navbar.amress")}</span>
                </Link>
              </li>
            </>
          )}

          {isAuthenticated && user.role === USER_ROLE.staff && (
            <>
              <li>
                <Link to={ROUTES.STAFF.HOUSEKEEPING}>
                  <span>{t("navbar.housekeeping")}</span>
                </Link>
              </li>
              <li>
                <Link to={ROUTES.STAFF.ADD_EXTRA}>
                  <span>{t("navbar.addextra")}</span>
                </Link>
              </li>
            </>
          )}

          {isAuthenticated && user.role === USER_ROLE.guest && (
            <>
              <li>
                <Link to={ROUTES.GUEST.CREATE_ROOM_RES}>
                  <span>{t("navbar.createroomres")}</span>
                </Link>
              </li>
              <li>
                <Link to={ROUTES.GUEST.CREATE_AM_RES}>
                  <span>{t("navbar.createamres")}</span>
                </Link>
              </li>
            </>
          )}

          <li>
            <Link to={ROUTES.ALL.REVIEWS}>
              <span>{t("navbar.reviews")}</span>
            </Link>
          </li>

          {isAuthenticated && user.role === USER_ROLE.receptionist && (
            <li>
              <div className="indicator">
                {unseenCount > 0 && (
                  <span className="indicator-item badge badge-secondary w-2 h-2 min-h-0 p-0"></span>
                )}
                <Link to={ROUTES.RECEPTION.MESSAGES}>
                  <span>{t("navbar.messages")}</span>
                </Link>
              </div>
            </li>
          )}

          {isAuthenticated && user.role === USER_ROLE.guest && (
            <li>
              <div className="indicator">
                {unseenCount > 0 && (
                  <span className="indicator-item badge badge-secondary w-2 h-2 min-h-0 p-0"></span>
                )}
                <Link to={ROUTES.GUEST.MESSAGES}>
                  <span>{t("navbar.messages")}</span>
                </Link>
              </div>
            </li>
          )}

          <div className="dropdown dropdown-end" tabIndex={0}>
            <button className="btn btn-md btn-ghost -mt-1">
              <MenuIcon />
              {t("navbar.menu")}
            </button>
            <ul className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
              {!isAuthenticated ? (
                <>
                  <li>
                    <Link to={ROUTES.ALL.LOGIN}>
                      <span>{t("navbar.login")}</span>
                    </Link>
                  </li>
                  <li>
                    <Link to={ROUTES.ALL.REGISTER}>
                      <span>{t("navbar.register")}</span>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {user.role === USER_ROLE.guest && (
                    <li>
                      <Link to={ROUTES.GUEST.PROFILE}>
                        <span>{t("navbar.profile")}</span>
                      </Link>
                    </li>
                  )}
                  <li>
                    <button
                      onClick={() => {
                        handleLogout();
                      }}
                      disabled={logoutMutation.isPending}
                    >
                      {logoutMutation.isPending
                        ? "Logging out..."
                        : t("navbar.logout")}
                    </button>
                  </li>
                </>
              )}

              <li>
                <details>
                  <summary>{t("navbar.theme")}</summary>
                  <ul className="p-2">
                    <li>
                      <button
                        onClick={() => toggleTheme("corporate")}
                        className="btn btn-sm flex items-center gap-4"
                      >
                        <SunIcon />
                        {t("navbar.light")}
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => toggleTheme("business")}
                        className="btn btn-sm flex items-center gap-4"
                      >
                        <MoonIcon />
                        {t("navbar.dark")}
                      </button>
                    </li>
                  </ul>
                </details>
              </li>

              <li>
                <details>
                  <summary>{t("navbar.language")}</summary>
                  <ul className="p-2">
                    <li>
                      <button
                        onClick={() => toggleLanguage("en")}
                        className="btn btn-sm flex items-center gap-4"
                      >
                        <span className="fi fi-gb swap-off text-lg" />
                        {t("navbar.english")}
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => toggleLanguage("sr")}
                        className="btn btn-sm flex items-center gap-4"
                      >
                        <span className="fi fi-rs swap-on text-lg" />
                        {t("navbar.serbian")}
                      </button>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
