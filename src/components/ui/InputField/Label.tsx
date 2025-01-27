import { memo, PropsWithChildren } from "react";

export const Label = memo(function Label({ children }: PropsWithChildren) {
  return <div className="flex flex-row justify-between items-center">{children}</div>;
});
