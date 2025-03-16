import clsx from "clsx";
import { memo, PropsWithChildren } from "react";

type LabelProps = {
  className?: string;
};

export const Label = memo(function Label({ className, children }: PropsWithChildren<LabelProps>) {
  return <div className={clsx("flex flex-row justify-between", className)}>{children}</div>;
});
