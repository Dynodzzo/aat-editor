import clsx from "clsx";
import { memo, useMemo } from "react";

export type ButtonVariant = "outline" | "inline";

export type ButtonStyle = "primary" | "secondary";

type ButtonProps = {
  variant?: ButtonVariant;
  style?: ButtonStyle;
  prefix?: JSX.Element;
  disabled?: boolean;
  onClick?: () => void;
};

export const Button = memo(function ColorIndicator({
  variant = "outline",
  style = "primary",
  prefix,
  disabled,
  onClick,
  children,
}: React.PropsWithChildren<ButtonProps>) {
  const variantClass = useMemo(() => (variant === "outline" ? "inset-ring" : "border-none"), [variant]);

  const styleClass = useMemo(
    () =>
      style === "primary"
        ? "text-slate-600 hover:bg-zinc-100 active:bg-slate-200"
        : "text-zinc-500 hover:bg-zinc-100 active:bg-zinc-200",
    [style]
  );

  return (
    <button
      className={clsx(
        `px-2 py-2 rounded-md flex flex-row gap-1 items-center font-medium text-sm cursor-pointer`,
        variantClass,
        styleClass
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {prefix}
      {children}
    </button>
  );
});
