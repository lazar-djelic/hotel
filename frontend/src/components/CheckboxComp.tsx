type CheckboxCompProps = {
  labelText: string;
  isCheck: boolean;
  onChangeFn: (checked: boolean) => void;
};

const CheckboxComp = ({
  labelText,
  isCheck,
  onChangeFn,
}: CheckboxCompProps) => {
  return (
    <div className="form-control mb-4">
      <label className="label cursor-pointer">
        <span className="label-text">{labelText}</span>
        <input
          type="checkbox"
          className="checkbox"
          checked={isCheck}
          onChange={(e) => onChangeFn(e.target.checked)}
        />
      </label>
    </div>
  );
};

export default CheckboxComp;
