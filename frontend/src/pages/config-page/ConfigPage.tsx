import React, { useState } from "react";
import { useConfig } from "../api/hotel-config/useConfig";
import Navbar from "../../components/Navbar";
import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import type { HotelConfig } from "../api/hotel-config/configStruct";
import { useTranslation } from "react-i18next";

const ConfigPage = () => {
  const { t } = useTranslation();
  const { conf } = useConfig();
  const [form, setForm] = useState<HotelConfig | null>(null);
  const current = form ?? conf;

  if (!current) {
    return <div className="loading loading-spinner">{t("loading")}</div>;
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="btn btn-ghost mb-6">
                <ArrowLeftIcon className="size-5" />
                {t("back")}
              </Link>
            </div>

            <div className="card bg-base-100">
              <div className="card-body">
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">{t("config.levels")}</span>
                  </label>
                  <input
                    className="input input-bordered"
                    type="number"
                    value={current.levels ?? 0}
                    min={0}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      setForm({ ...current, levels: newValue });
                    }}
                  />
                </div>

                <div className="form-control mb-4">
                  <label className="label cursor-pointer">
                    <span className="label-text">{t("config.conference")}</span>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={current.conference}
                      onChange={(e) =>
                        setForm({ ...current, conference: e.target.checked })
                      }
                    />
                  </label>
                </div>

                <div className="form-control mb-4">
                  <label className="label cursor-pointer">
                    <span className="label-text">{t("config.spa")}</span>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={current.spa}
                      onChange={(e) =>
                        setForm({ ...current, spa: e.target.checked })
                      }
                    />
                  </label>
                </div>

                <div className="form-control mb-4">
                  <label className="label cursor-pointer">
                    <span className="label-text">{t("config.pool")}</span>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={current.pool}
                      onChange={(e) =>
                        setForm({ ...current, pool: e.target.checked })
                      }
                    />
                  </label>
                </div>

                <div className="form-control mb-4">
                  <label className="label cursor-pointer">
                    <span className="label-text">{t("config.restaurant")}</span>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={current.restaurant}
                      onChange={(e) =>
                        setForm({ ...current, restaurant: e.target.checked })
                      }
                    />
                  </label>
                </div>

                <div className="form-control mb-4">
                  <label className="label cursor-pointer">
                    <span className="label-text">{t("config.gym")}</span>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={current.gym}
                      onChange={(e) =>
                        setForm({ ...current, gym: e.target.checked })
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPage;
