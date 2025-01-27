import { memo, PropsWithChildren } from "react";

export const LabelInfo = memo(function LabelInfo({ children }: PropsWithChildren) {
  return <span className="text-zinc-600 text-xs font-light">{children}</span>;
});
