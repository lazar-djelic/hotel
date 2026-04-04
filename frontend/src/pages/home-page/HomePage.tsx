import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { ROUTES } from "../../config/routes";
import { useAuth } from "../../context/AuthContext";
import { USER_ROLE } from "../../config/enums";
import { useTranslation } from "react-i18next";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="carousel w-full h-[500px]">
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945"
            className="w-full object-cover"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <button
              onClick={() => {
                document.getElementById("slide3")?.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                });
              }}
              className="btn btn-circle"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => {
                document.getElementById("slide2")?.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                });
              }}
              className="btn btn-circle"
            >
              <ChevronRight />
            </button>
          </div>

          <div className="absolute bottom-20 left-10 text-white">
            <h1 className="text-5xl font-bold">{t("homepage.slidetext")}</h1>
            <p className="mt-2 text-lg">{t("homepage.slidesubt")}</p>
            <button className="btn btn-primary mt-4">
              {t("homepage.slidebtn")}
            </button>
          </div>
        </div>

        <div id="slide2" className="carousel-item relative w-full">
          <img
            src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa"
            className="w-full object-cover"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <button
              onClick={() => {
                document.getElementById("slide1")?.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                });
              }}
              className="btn btn-circle"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => {
                document.getElementById("slide3")?.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                });
              }}
              className="btn btn-circle"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div id="slide3" className="carousel-item relative w-full">
          <img
            src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
            className="w-full object-cover"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <button
              onClick={() => {
                document.getElementById("slide2")?.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                });
              }}
              className="btn btn-circle"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => {
                document.getElementById("slide1")?.scrollIntoView({
                  behavior: "smooth",
                  block: "nearest",
                });
              }}
              className="btn btn-circle"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>

      <section className="py-16 px-6 bg-base-100 text-center">
        <h2 className="text-4xl font-bold mb-6">{t("homepage.title")}</h2>
        <p className="max-w-3xl mx-auto text-lg opacity-80">
          {t("homepage.paragraph")}
        </p>
      </section>

      <section className="py-16 px-6 bg-base-200">
        <h2 className="text-3xl font-bold text-center mb-10">
          {t("homepage.rooms")}
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32" />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{t("homepage.room1title")}</h3>
              <p>{t("homepage.room1desc")}</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <figure>
              <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427" />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{t("homepage.room2title")}</h3>
              <p>{t("homepage.room2desc")}</p>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <figure>
              <img src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461" />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{t("homepage.room3title")}</h3>
              <p>{t("homepage.room3desc")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-base-100">
        <h2 className="text-3xl font-bold text-center mb-10">
          {t("homepage.amenities")}
        </h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
          <div className="p-6 shadow rounded-lg bg-base-200">
            <h3 className="font-bold text-lg">{t("homepage.am1title")}</h3>
            <p className="opacity-70">{t("homepage.am1desc")}</p>
          </div>

          <div className="p-6 shadow rounded-lg bg-base-200">
            <h3 className="font-bold text-lg">{t("homepage.am2title")}</h3>
            <p className="opacity-70">{t("homepage.am2desc")}</p>
          </div>

          <div className="p-6 shadow rounded-lg bg-base-200">
            <h3 className="font-bold text-lg">{t("homepage.am3title")}</h3>
            <p className="opacity-70">{t("homepage.am3desc")}</p>
          </div>

          <div className="p-6 shadow rounded-lg bg-base-200">
            <h3 className="font-bold text-lg">{t("homepage.am4title")}</h3>
            <p className="opacity-70">{t("homepage.am4desc")}</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary text-primary-content text-center">
        <h2 className="text-4xl font-bold mb-4">{t("homepage.booktitle")}</h2>
        <p className="mb-6">{t("homepage.bookdesc")}</p>
        {user?.role !== USER_ROLE.admin &&
          user?.role !== USER_ROLE.receptionist &&
          user?.role !== USER_ROLE.staff && (
            <a
              href={ROUTES.GUEST.CREATE_ROOM_RES}
              className="btn btn-secondary btn-lg"
            >
              {t("homepage.bookbtn")}
            </a>
          )}
      </section>
    </div>
  );
};

export default HomePage;
