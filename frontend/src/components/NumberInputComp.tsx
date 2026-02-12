type NumberInputCompProps = {
  labelText: string;
  iValue: number | string;
  onChangeFn: (value: number) => void;
};

const NumberInputComp = ({
  labelText,
  iValue,
  onChangeFn,
}: NumberInputCompProps) => {
  return (
    <div className="form-control mb-4">
      <label className="label">
        <span className="label-text">{labelText}</span>
      </label>
      <input
        className="input input-bordered [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        type="number"
        value={iValue || ""}
        min={0}
        onChange={(e) => onChangeFn(Number(e.target.value))}
      />
    </div>
  );
};

export default NumberInputComp;
