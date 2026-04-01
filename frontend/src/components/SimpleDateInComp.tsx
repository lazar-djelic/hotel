type SimpleDateInCompProps = {
  labelText: string;
  value: string;
  onChangeFn: (value: string) => void;
};

const toLocalDateString = (isoString: string): string => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const SimpleDateInComp = ({
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
        type="date"
        value={toLocalDateString(value)}
        onChange={(e) => onChangeFn(new Date(e.target.value).toISOString())}
      />
    </div>
  );
};

export default SimpleDateInComp;
