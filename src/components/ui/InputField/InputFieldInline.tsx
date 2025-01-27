import clsx from "clsx";
import { memo, PropsWithChildren } from "react";

type InputFieldInlineProps = {
  className?: string;
};

export const InputFieldInline = memo(function InputFieldInline({
  className = "",
  children,
}: PropsWithChildren<InputFieldInlineProps>) {
  return <div className={clsx("flex flex-row gap-2 items-center grow", className)}>{children}</div>;
});
