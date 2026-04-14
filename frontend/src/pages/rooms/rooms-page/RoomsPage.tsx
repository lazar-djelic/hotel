import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { ArrowLeftIcon, PlusIcon } from "lucide-react";
import { useRooms } from "../../api/rooms/all-rooms/useRooms";
import RoomCard from "./RoomCard";
import InputComp from "../../../components/NumberInputComp";
import { useState } from "react";
import { ROUTES } from "../../../config/routes";
import TaxesModal from "./TaxesModal";

const RoomsPage = () => {
  const { t } = useTranslation();
  const { rooms, loading } = useRooms();
  const [expanded, setExpanded] = useState<boolean | null>(null);
  const [search, setSearch] = useState(0);
  const [showTaxesModal, setShowTaxesModal] = useState(false);

  const filteredRooms = rooms.filter((room) =>
    room.roomnum.toString().includes(search.toString()),
  );

  return (
    <div>
      <div className="max-w-7xl mx-auto p-4">
        <div style={{ display: "flex" }} className="mb-8">
          <Link to="/" className="btn btn-ghost">
            <ArrowLeftIcon className="size-5" />
            {t("back")}
          </Link>
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <button
              className="btn btn-outline"
              onClick={() => setShowTaxesModal(true)}
            >
              {t("taxes.manage")}
            </button>
            <Link to={ROUTES.ADMIN.EXTRAS} className="btn btn-outline text-lg">
              {t("create.room.extras")}
            </Link>
            <Link to={ROUTES.ADMIN.ROOM} className="btn btn-outline text-lg">
              <PlusIcon className="size-8" />
              {t("create.room.new")}
            </Link>
          </div>
        </div>

        <InputComp
          labelText={t("room.search")}
          iValue={search}
          onChangeFn={(value) => setSearch(value)}
        />

        {loading && (
          <div className="text-center text-primary py-10">{t("loading")}</div>
        )}

        {!loading && rooms.length === 0 && (
          <div className="text-center text-primary py-10">
            {t("room.norooms")}
          </div>
        )}

        {rooms.length > 0 && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
              }}
            >
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setExpanded(true);
                  setTimeout(() => setExpanded(null), 0);
                }}
              >
                {t("room.expandall")}
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setExpanded(false);
                  setTimeout(() => setExpanded(null), 0);
                }}
              >
                {t("room.collapseall")}
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
              {filteredRooms.map((room) => (
                <RoomCard key={room._id} room={room} expanded={expanded} />
              ))}
            </div>
          </div>
        )}
      </div>
      {showTaxesModal && (
        <TaxesModal onClose={() => setShowTaxesModal(false)} />
      )}
    </div>
  );
};

export default RoomsPage;
