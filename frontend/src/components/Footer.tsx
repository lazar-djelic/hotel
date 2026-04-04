import type { FC } from "react";
import { useTranslation } from "react-i18next";

const Footer: FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer p-10 bg-neutral text-neutral-content mt-auto place-items-center">
      <div>
        <span className="footer-title">{t("homepage.fhotel")}</span>
        <p>
          {t("navbar.hotelname")} <br />
          {t("homepage.fhoteldesc")}
        </p>
      </div>

      <div>
        <span className="footer-title">{t("homepage.faddress")}</span>
        <p>Aleksandra Medvedeva 14</p>
        <p>Niš</p>
      </div>

      <div>
        <span className="footer-title">{t("homepage.fworkinghours")}</span>
        <p>{t("homepage.fwhreception")}: 24/7</p>
        <p>{t("homepage.fwhrestaurant")}: 7:00 - 22:00</p>
      </div>

      <div>
        <span className="footer-title">{t("homepage.fcontact")}</span>
        <p>+381 (18) 529-105</p>
        <p>efinfo@elfak.ni.ac.rs</p>
      </div>
    </footer>
  );
};

export default Footer;
