type SimpleDateInCompProps = {
  labelText: string;
  value: string;
  onChangeFn: (value: string) => void;
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
        value={value.split("T")[0]}
        onChange={(e) =>
          onChangeFn(new Date(e.target.value).toISOString().split("T")[0])
        }
      />
    </div>
  );
};

export default SimpleDateInComp;
