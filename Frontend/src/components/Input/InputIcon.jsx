import { Input as NextInput } from "@nextui-org/react";

function Input({
  type,
  value,
  onChange,
  label,
  placeholder,
  labelPlacement,
  startContent,
  endContent,
}) {
  return (
    <NextInput
      type={type}
      label={label}
      placeholder={placeholder}
      labelPlacement={labelPlacement}
      startContent={startContent}
      endContent={endContent}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
