import { memo, useId } from "react";
import { Input, InputProps } from "../Input/Input";

type InputFieldProps = InputProps & {
  label?: string;
  info?: string;
};

export const InputField = memo(function InputField({
  value,
  placeholder = "",
  label = "",
  info = "",
  variant = "outline",
  size = "md",
  onChange,
}: InputFieldProps) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row justify-between items-center">
        <label htmlFor={id} className="text-zinc-600 font-medium">
          {label}
        </label>
        <span className="text-zinc-600 text-xs font-light">{info}</span>
      </div>
      <Input id={id} value={value} placeholder={placeholder} variant={variant} size={size} onChange={onChange} />
    </div>
  );
});
