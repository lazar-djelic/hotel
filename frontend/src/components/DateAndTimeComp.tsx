type SimpleDateInCompProps = {
  labelText: string;
  value: string;
  onChangeFn: (value: string) => void;
};

const DateAndTimeComp = ({
  labelText,
  value,
  onChangeFn,
}: SimpleDateInCompProps) => {
  return (
    <div className="form-control mb-4">
      <label className="label">
        <span className="label-text">{labelText}</span>
      </label>
      <input
        className="input input-bordered"
        type="datetime-local"
        value={value || ""}
        onChange={(e) => onChangeFn(e.target.value)}
      />
    </div>
  );
};

export default DateAndTimeComp;
