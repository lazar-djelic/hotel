import React, { useState, useMemo, useRef, useEffect } from "react";
import type { ExtraStruct } from "../api/structs/ExtraStruct";

type OptionMap = Record<string, string>;

interface Props {
  options: OptionMap;
  extras: ExtraStruct[];
  setExtras: (
    value: ExtraStruct | ((prev: ExtraStruct) => ExtraStruct),
  ) => void;
  placeholder?: string;
}

export const AutocompleteSelect: React.FC<Props> = ({
  options,
  extras,
  setExtras,
  placeholder = "Start typing...",
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState("");

  const optionValues = useMemo(() => Object.values(options), [options]);

  const filtered = useMemo(() => {
    return optionValues.filter((opt) =>
      opt.toLowerCase().includes(value.toLowerCase()),
    );
  }, [value, optionValues]);

  const handleSelect = (val: string) => {
    setValue(val);
    setOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <input
        type="text"
        className="input input-bordered w-full"
        value={value}
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setValue(e.target.value);
          setOpen(true);
        }}
      />

      {open && filtered.length > 0 && (
        <ul className="menu absolute z-20 mt-1 w-full rounded-box bg-base-100 shadow border border-base-200 max-h-60 overflow-y-auto">
          {filtered.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()} // prevents blur
                onClick={() => handleSelect(opt)}
              >
                {opt}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
