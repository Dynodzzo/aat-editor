import clsx from "clsx";
import { VisuallyHidden } from "radix-ui";
import { memo, useCallback, useLayoutEffect, useRef, useState } from "react";

export type TransformableInputProps = {
  value: string;
  label?: string;
  id?: string;
  placeholder?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TransformableInput = memo(function Input({
  value,
  label,
  id,
  placeholder = "",
  className = "",
  onChange,
}: TransformableInputProps) {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) onChange(event);
    },
    [onChange]
  );

  const handleFocus = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsEditing(false);
  }, []);

  useLayoutEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  return (
    <div
      className={clsx(
        "min-h-4 border-1 border-transparent rounded-sm flex items-stretch",
        "hover:not-focus-within:border-dashed hover:border-neutral-200",
        "focus-within:border-solid focus-within:border-neutral-200 focus-within:bg-white",
        className
      )}
    >
      {isEditing && (
        <>
          <VisuallyHidden.Root>
            <label htmlFor={id}>{label}</label>
          </VisuallyHidden.Root>
          <input
            ref={inputRef}
            id={id}
            className={clsx(
              "w-full inline-block align-middle [text-align:inherit]",
              "placeholder:italic placeholder:text-neutral-400",
              "focus-visible:outline-none"
            )}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </>
      )}
      {!isEditing && (
        <span tabIndex={0} onFocus={handleFocus} className={clsx("w-full min-h-full")}>
          {value}
        </span>
      )}
    </div>
  );
});
