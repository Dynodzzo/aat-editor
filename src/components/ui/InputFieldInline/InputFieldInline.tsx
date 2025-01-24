import { memo } from "react";
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
  return (
    <div className="flex flex-row gap-2 items-center">
      <label className="text-zinc-600 font-medium">{label}</label>
      <Input value={value} placeholder={placeholder} variant={variant} size={size} onChange={onChange} />
    </div>
  );
});
