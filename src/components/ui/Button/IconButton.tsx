import clsx from "clsx";
import { memo, useMemo } from "react";

export type IconButtonType = "primary" | "secondary";

type IconButtonProps = {
  type?: IconButtonType;
  icon: JSX.Element;
  disabled?: boolean;
  onClick?: () => void;
};

const ICON_BUTTON_TYPE_STYLES: Record<IconButtonType, string> = {
  primary:
    "bg-neutral-800 inset-ring inset-ring-neutral-600 text-neutral-100 hover:bg-neutral-700 hover:inset-ring-neutral-400 active:inset-ring-2",
  secondary: "bg-transparent text-neutral-600 hover:bg-neutral-50 active:bg-neutral-200",
};

const ICON_BUTTON_STYLES = "p-1 rounded-full grid place-content-center cursor-pointer";

export const IconButton = memo(function ColorIndicator({
  type = "primary",
  icon,
  disabled,
  onClick,
}: React.PropsWithChildren<IconButtonProps>) {
  const iconButtonTypeStyles = useMemo(() => ICON_BUTTON_TYPE_STYLES[type], [type]);

  return (
    <button className={clsx(ICON_BUTTON_STYLES, iconButtonTypeStyles)} onClick={onClick} disabled={disabled}>
      {icon}
    </button>
  );
});
