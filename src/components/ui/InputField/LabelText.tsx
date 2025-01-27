import { memo, PropsWithChildren } from "react";

type LabelTextProps = {
  htmlFor?: string;
};

export const LabelText = memo(function LabelText({ htmlFor, children }: PropsWithChildren<LabelTextProps>) {
  return (
    <label htmlFor={htmlFor} className="text-zinc-600 font-medium">
      {children}
    </label>
  );
});
