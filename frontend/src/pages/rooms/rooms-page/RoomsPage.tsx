import { useTranslation } from "react-i18next";
import Navbar from "../../../components/Navbar";
import { Link } from "react-router";
import { ArrowLeftIcon, PlusIcon } from "lucide-react";
import { useRooms } from "../../api/rooms/all-rooms/useRooms";
import RoomCard from "./RoomCard";
import InputComp from "../../../components/NumberInputComp";
import { useState } from "react";

const RoomsPage = () => {
  const { t } = useTranslation();
  const [roomNumber, setRoomNumber] = useState(0);
  const { rooms, loading } = useRooms(roomNumber);
  const [expanded, setExpanded] = useState<boolean | null>(null);

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-4">
        <div style={{ display: "flex" }} className="mb-8">
          <Link to="/config" className="btn btn-ghost">
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
            <Link to="/room" className="btn btn-outline text-lg">
              <PlusIcon className="size-8" />
              {t("create.room.new")}
            </Link>
          </div>
        </div>

        <InputComp
          labelText={t("room.search")}
          iValue={roomNumber}
          onChangeFn={(value) => setRoomNumber(value)}
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
              {rooms.map((room) => (
                <RoomCard key={room._id} room={room} expanded={expanded} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomsPage;
