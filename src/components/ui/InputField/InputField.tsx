import clsx from "clsx";
import { memo, PropsWithChildren } from "react";

type InputFieldProps = {
  className?: string;
};

export const InputField = memo(function InputField({ className = "", children }: PropsWithChildren<InputFieldProps>) {
  return <div className={clsx("flex flex-col gap-1", className)}>{children}</div>;
});
