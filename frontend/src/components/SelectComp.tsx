type SelectOption = {
  value: string;
  label: string;
};

type SelectCompProps = {
  labelText: string;
  sValue: string;
  onChangeFn: (value: string) => void;
  options: SelectOption[];
};

const SelectComp = ({
  labelText,
  sValue,
  onChangeFn,
  options,
}: SelectCompProps) => {
  return (
    <div className="form-control mb-4">
      <label className="label">
        <span className="label-text">{labelText}</span>
      </label>

      <select
        className="select select-bordered"
        value={sValue}
        onChange={(e) => onChangeFn(e.target.value)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComp;
