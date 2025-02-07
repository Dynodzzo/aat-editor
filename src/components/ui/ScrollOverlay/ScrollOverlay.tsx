import clsx from "clsx";

type ScrollOverlayProps = {
  isVisible: boolean;
  colorClass?: string;
};

const DEFAULT_COLOR_CLASS = "to-white";

export const ScrollOverlay = ({ isVisible, colorClass = DEFAULT_COLOR_CLASS }: ScrollOverlayProps) => {
  return (
    <div
      className={clsx(
        "absolute bottom-0 h-15 w-full bg-linear-to-b from-transparent transition-all duration-500 ease-in-out pointer-events-none",
        {
          "opacity-0": !isVisible,
          "opacity-100": isVisible,
        },
        colorClass
      )}
    ></div>
  );
};
