import { useTranslation } from "react-i18next";
import { useAmenities } from "../../api/amenities/all-amenities/useAmenities";
import { useNavigate } from "react-router";
import { PlusIcon } from "lucide-react";
import { ROUTES } from "../../../config/routes";

const AllAmenities = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { amenities, loading } = useAmenities();

  return (
    <div className="max-w-6xl mx-auto p-4 mt-8">
      <div className="mb-16 text-5xl font-semibold">Amenities</div>
      <div className="flex gap-2 justify-end mb-8">
        <button
          className="btn btn-outline"
          onClick={() => navigate(ROUTES.ADMIN.AMENITY)}
        >
          <PlusIcon className="size-8" />
          {t("amenity.create")}
        </button>
      </div>

      {loading && (
        <div className="text-center text-primary py-10">{t("loading")}</div>
      )}

      {!loading && amenities.length === 0 && (
        <>
          <div className="max-w-7xl mx-auto p-4 mt-8">
            <div className="text-center text-primary py-10">
              {t("amenity.noam")}
            </div>
          </div>
        </>
      )}

      {amenities.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table table-lg w-full">
            <thead>
              <tr className="bg-base-300">
                <th>{t("amenity.name")}</th>
                <th>{t("amenity.type")}</th>
                <th>{t("amenity.capacity")}</th>
                <th>{t("amenity.slotdur")}</th>
                <th>{t("amenity.opentime")}</th>
                <th>{t("amenity.closetime")}</th>
                <th>{t("amenity.resreq")}</th>
                <th>{t("amenity.oneperslot")}</th>
              </tr>
            </thead>
            <tbody>
              {amenities.map((amenity, index) => {
                return (
                  <tr
                    key={index}
                    onClick={() => {
                      navigate(`${ROUTES.ADMIN.AMENITY}/${amenity._id}`);
                    }}
                    className="cursor-pointer transition-all border-l-4
           border-l-blue-400
           bg-[rgba(96,165,250,0.08)] hover:bg-[rgba(96,165,250,0.12)]"
                  >
                    <td className="font-medium">{amenity.name}</td>
                    <td>{amenity.type}</td>
                    <td>{amenity.capacity}</td>
                    <td>{amenity.slotDuration}</td>
                    <td>{amenity.openTime}</td>
                    <td>{amenity.closeTime}</td>
                    <td>{amenity.requiresReservation ? t("yes") : t("no")}</td>
                    <td>{amenity.onePerSlot ? t("yes") : t("no")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllAmenities;
