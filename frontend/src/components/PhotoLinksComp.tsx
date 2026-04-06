import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type PhotoLinksCompProps = {
  labelText: string;
  photos: string[];
  onChangeFn: (photos: string[]) => void;
  disabled?: boolean;
};

const PhotoLinksComp = ({
  labelText,
  photos,
  onChangeFn,
  disabled = false,
}: PhotoLinksCompProps) => {
  const { t } = useTranslation();
  const [tempInput, setTempInput] = useState("");

  const addPhoto = () => {
    if (tempInput.trim()) {
      onChangeFn([...(photos || []), tempInput.trim()]);
      setTempInput("");
    }
  };

  const removePhoto = (index: number) => {
    const updated = photos.filter((_, i) => i !== index);
    onChangeFn(updated);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addPhoto();
    }
  };

  return (
    <div className="form-control mb-4">
      <label className="label">
        <span className="label-text">{labelText}</span>
      </label>

      {photos && photos.length > 0 && (
        <div className="mb-3">
          <div className="space-y-2">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-base-200 p-2 rounded"
              >
                <span className="text-sm truncate flex-1">{photo}</span>
                <button
                  type="button"
                  className="btn btn-sm btn-ghost btn-error"
                  onClick={() => removePhoto(index)}
                  disabled={disabled}
                >
                  <Trash2Icon className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          className="input input-bordered flex-1"
          placeholder="https://example.com/photo.jpg"
          value={tempInput}
          onChange={(e) => setTempInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={addPhoto}
          disabled={disabled || !tempInput.trim()}
        >
          {t("create.add")}
        </button>
      </div>
    </div>
  );
};

export default PhotoLinksComp;
