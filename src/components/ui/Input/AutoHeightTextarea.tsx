import clsx from "clsx";
import { VisuallyHidden } from "radix-ui";
import { memo, useCallback, useRef } from "react";

export type AutoHeightTextareaProps = {
  value: string;
  label?: string;
  id?: string;
  placeholder?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const AutoHeightTextarea = memo(function AutoHeightTextarea({
  value,
  label,
  id,
  placeholder = "",
  className = "",
  onChange,
}: AutoHeightTextareaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (onChange) onChange(event);

      adjustHeight();
    },
    [onChange]
  );

  const adjustHeight = () => {
    ref.current!.style.height = "inherit";
    ref.current!.style.height = `${ref.current?.scrollHeight}px`;
  };

  return (
    <>
      <VisuallyHidden.Root>
        <label htmlFor={id}>{label}</label>
      </VisuallyHidden.Root>
      <textarea
        ref={ref}
        id={id}
        placeholder={placeholder}
        className={clsx(
          "border-1 border-transparent rounded-sm resize-none overflow-hidden",
          "hover:not-focus-within:border-dashed hover:border-neutral-200 hover:not-focus-within:bg-white",
          "focus-within:border-solid focus-within:border-neutral-200 focus-within:bg-white",
          "placeholder:italic placeholder:text-neutral-400",
          "focus-visible:outline-none",
          className
        )}
        value={value}
        onChange={handleChange}
        rows={1}
      ></textarea>
    </>
  );
});
