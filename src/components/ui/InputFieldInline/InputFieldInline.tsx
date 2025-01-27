import { memo, useId } from "react";
import { Input, InputProps } from "../Input/Input";

type InputFieldInlineProps = InputProps & {
  label?: string;
};

export const InputFieldInline = memo(function InputFieldInline({
  value,
  placeholder = "",
  label = "",
  variant = "outline",
  size = "md",
  onChange,
}: InputFieldInlineProps) {
  const id = useId();
  return (
    <div className="flex flex-row gap-2 items-center">
      <label htmlFor={id} className="text-zinc-600 font-medium">
        {label}
      </label>
      <Input id={id} value={value} placeholder={placeholder} variant={variant} size={size} onChange={onChange} />
    </div>
  );
});
