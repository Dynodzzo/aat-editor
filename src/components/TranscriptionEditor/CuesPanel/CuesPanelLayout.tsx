import { memo, PropsWithChildren } from "react";

export const CuesPanelLayout = memo(function CuesPanelLayout({ children }: PropsWithChildren) {
  return <div className="flex flex-col">{children}</div>;
});
