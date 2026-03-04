import { useState } from "react";
import { useConfig } from "../api/hotel-config/useConfig";
import CheckboxComp from "../../components/CheckboxComp";
import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import type { HotelConfig } from "../api/hotel-config/configStruct";
import { useTranslation } from "react-i18next";
import NumberInputComp from "../../components/NumberInputComp";

const ConfigPage = () => {
  const { t } = useTranslation();
  const { conf } = useConfig();
  const [form, setForm] = useState<HotelConfig | null>(null);
  const current = form ?? conf;

  if (!current) {
    return <div className="loading loading-spinner">{t("loading")}</div>;
  }

  return (
    <div>
      <div className="bg-base-200">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="btn btn-ghost">
                <ArrowLeftIcon className="size-5" />
                {t("back")}
              </Link>

              <div style={{ display: "flex" }}>
                <div style={{ marginLeft: "auto" }}>
                  <Link to="/rooms" className="btn btn-outline text-lg">
                    {t("config.rooms.rooms")}
                  </Link>
                </div>
              </div>
            </div>

            <div className="card bg-base-100">
              <div className="card-body">
                <NumberInputComp
                  labelText={t("config.levels")}
                  iValue={current.levels}
                  onChangeFn={(value) => {
                    setForm({ ...current, levels: value });
                  }}
                />

                <CheckboxComp
                  labelText={t("config.conference")}
                  isCheck={current.conference}
                  onChangeFn={(checked) =>
                    setForm({ ...current, conference: checked })
                  }
                />

                <CheckboxComp
                  labelText={t("config.spa")}
                  isCheck={current.spa}
                  onChangeFn={(checked) =>
                    setForm({ ...current, spa: checked })
                  }
                />

                <CheckboxComp
                  labelText={t("config.pool")}
                  isCheck={current.pool}
                  onChangeFn={(checked) =>
                    setForm({ ...current, pool: checked })
                  }
                />

                <CheckboxComp
                  labelText={t("config.restaurant")}
                  isCheck={current.restaurant}
                  onChangeFn={(checked) =>
                    setForm({ ...current, restaurant: checked })
                  }
                />

                <CheckboxComp
                  labelText={t("config.gym")}
                  isCheck={current.gym}
                  onChangeFn={(checked) =>
                    setForm({ ...current, gym: checked })
                  }
                />

                <CheckboxComp
                  labelText={t("config.sauna")}
                  isCheck={current.sauna}
                  onChangeFn={(checked) =>
                    setForm({ ...current, sauna: checked })
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPage;
