import { useThrottle } from "@uidotdev/usehooks";
import clsx from "clsx";
import { VisuallyHidden } from "radix-ui";
import { memo, useCallback, useEffect, useRef, useState } from "react";

export type AutoHeightTextareaProps = {
  value: string;
  label?: string;
  id?: string;
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
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
  const [hasTyped, setHasTyped] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const throttledValue = useThrottle(inputValue, 300);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHasTyped(true);
    setInputValue(event.target.value);
    adjustHeight();
  }, []);

  useEffect(() => {
    setHasTyped(false);
    setInputValue(value);
    adjustHeight();
  }, [value]);

  useEffect(() => {
    if (!hasTyped) return;
    if (onChange) onChange(throttledValue);
  }, [throttledValue, onChange, hasTyped]);

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
        value={inputValue}
        onChange={handleChange}
        rows={1}
      ></textarea>
    </>
  );
});
