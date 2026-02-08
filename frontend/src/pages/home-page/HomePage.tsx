import Navbar from "../../components/Navbar";
import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <Navbar />

      <div>{t("welcome")}</div>
    </div>
  );
};

export default HomePage;
