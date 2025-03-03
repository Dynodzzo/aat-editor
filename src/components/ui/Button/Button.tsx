import clsx from "clsx";
import { memo, useMemo } from "react";

export type ButtonType = "primary" | "secondary";

type ButtonProps = {
  type?: ButtonType;
  prefix?: JSX.Element;
  disabled?: boolean;
  onClick?: () => void;
};

const BUTTON_TYPE_STYLES: Record<ButtonType, string> = {
  primary:
    "bg-neutral-800 inset-ring inset-ring-neutral-600 text-neutral-100 hover:bg-neutral-700 hover:inset-ring-neutral-400 active:inset-ring-2",
  secondary: "bg-transparent text-neutral-600 hover:bg-neutral-50 active:bg-neutral-200",
};

const BUTTON_STYLES = "p-2 rounded-sm flex flex-row gap-1 items-center font-medium text-xs cursor-pointer";

export const Button = memo(function ColorIndicator({
  type = "primary",
  prefix,
  disabled,
  onClick,
  children,
}: React.PropsWithChildren<ButtonProps>) {
  const buttonTypeStyles = useMemo(() => BUTTON_TYPE_STYLES[type], [type]);

  return (
    <button className={clsx(BUTTON_STYLES, buttonTypeStyles)} onClick={onClick} disabled={disabled}>
      {prefix}
      {children}
    </button>
  );
});
