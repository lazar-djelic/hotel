import { useTranslation } from "react-i18next";

const HomePage = () => {
  const { t } = useTranslation();

  return (
    <div className="">
      <div>{t("welcome")}</div>
    </div>
  );
};

export default HomePage;
