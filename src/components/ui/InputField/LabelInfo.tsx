import { memo, PropsWithChildren } from "react";

export const LabelInfo = memo(function LabelInfo({ children }: PropsWithChildren) {
  return <span className="text-neutral-600 text-xs font-light">{children}</span>;
});
