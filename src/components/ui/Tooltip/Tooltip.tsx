import { Tooltip as RadixTooltip } from "radix-ui";
import { PropsWithChildren } from "react";

export const Tooltip = ({ children }: PropsWithChildren) => (
  <RadixTooltip.Provider>
    <RadixTooltip.Root>{children}</RadixTooltip.Root>
  </RadixTooltip.Provider>
);

export const TooltipTrigger = RadixTooltip.Trigger;
export const TooltipContent = ({ children, ...props }: PropsWithChildren<RadixTooltip.TooltipContentProps>) => {
  return (
    <RadixTooltip.Portal>
      <RadixTooltip.Content
        sideOffset={5}
        className="bg-neutral-800 text-neutral-100 rounded-sm p-2 text-xs"
        {...props}
      >
        {children}
        <RadixTooltip.Arrow className="fill-neutral-800" />
      </RadixTooltip.Content>
    </RadixTooltip.Portal>
  );
};
