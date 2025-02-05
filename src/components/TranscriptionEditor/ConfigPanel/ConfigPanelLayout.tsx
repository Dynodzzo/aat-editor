import { memo, PropsWithChildren } from "react";

export const ConfigPanelLayout = memo(function ConfigPanelLayout({ children }: PropsWithChildren) {
  return <div className="flex flex-col gap-4">{children}</div>;
});
