type StringInputCompProps = {
  labelText: string;
  iValue: string;
  disable: boolean;
  onChangeFn: (value: string) => void;
};

const StringInputComp = ({
  labelText,
  iValue,
  disable,
  onChangeFn,
}: StringInputCompProps) => {
  return (
    <div className="form-control mb-4">
      <label className="label">
        <span className="label-text">{labelText}</span>
      </label>
      <input
        className="input input-bordered [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        type="text"
        disabled={disable}
        value={iValue || ""}
        onChange={(e) => onChangeFn(e.target.value)}
      />
    </div>
  );
};

export default StringInputComp;
