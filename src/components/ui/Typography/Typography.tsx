import clsx from "clsx";
import { memo, PropsWithChildren, useMemo } from "react";

type TypographyProps = {
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "subtitle1"
    | "subtitle2"
    | "body1"
    | "body2"
    | "caption"
    | "overline";
  className?: string;
};

export const Typography = memo(function Typography({
  variant = "body1",
  className = "",
  children,
}: PropsWithChildren<TypographyProps>) {
  const textSizeClass = useMemo(() => {
    switch (variant) {
      // case "h1":
      //   return "text-4xl font-bold";
      case "h2":
        return "text-xl font-medium text-zinc-600";
      // case "h3":
      //   return "text-2xl font-bold";
      // case "h4":
      //   return "text-xl font-bold";
      // case "h5":
      //   return "text-lg font-bold";
      // case "h6":
      //   return "text-base font-bold";
      // case "subtitle1":
      //   return "text-base font-medium";
      // case "subtitle2":
      //   return "text-sm font-medium";
      // case "body1":
      //   return "text-base font-normal";
      // case "body2":
      //   return "text-sm font-normal";
      // case "caption":
      //   return "text-xs font-normal";
      // case "overline":
      //   return "text-xs font-medium";
      default:
        return "text-base font-normal text-black";
    }
  }, [variant]);

  return <div className={clsx(textSizeClass, className)}>{children}</div>;
});
