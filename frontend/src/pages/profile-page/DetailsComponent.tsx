import { useTranslation } from "react-i18next";
import { formatDate } from "../../lib/utils";
import type { Guest } from "../../types/Guest";

interface DetailsComponentProps {
  guest: Guest;
}

const DetailsComponent = ({ guest }: DetailsComponentProps) => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="grid grid-cols-2 gap-y-2">
          <span className="text-gray-500">{t("profile.address")}</span>
          <span>{guest.address}</span>

          <span className="text-gray-500">{t("profile.birthDate")}</span>
          <span>{formatDate(guest.birthDate.toString(), i18n.language)}</span>

          <span className="text-gray-500">{t("profile.personalID")}</span>
          <span>{guest.personalID}</span>

          <span className="text-gray-500">{t("profile.phone")}</span>
          <span>{guest.phone}</span>
        </div>
      </div>
    </div>
  );
};

export default DetailsComponent;
