import clsx from "clsx";
import { NavArrowDown } from "iconoir-react";
import { Collapsible as RadixCollapsible } from "radix-ui";
import { PropsWithChildren } from "react";
import { IconButton } from "../Button/IconButton";

type CollapsibleProps = {
  className?: string;
};

type CollapsibleHeaderProps = {
  className?: string;
};

type CollapsibleContentProps = {
  className?: string;
};

export const Collapsible = ({ children, className, ...props }: PropsWithChildren<CollapsibleProps>) => {
  return (
    <RadixCollapsible.Root className={clsx("collapsible overflow-clip", className)} {...props}>
      {children}
    </RadixCollapsible.Root>
  );
};

export const CollapsibleHeader = ({ className, children }: PropsWithChildren<CollapsibleHeaderProps>) => {
  return (
    <div className={clsx("collapsible-header flex flex-row items-center justify-between bg-white", className)}>
      {children}
      <RadixCollapsible.Trigger className="collapsible-trigger data-[state=open]:rotate-180 transition-transform">
        <IconButton icon={<NavArrowDown width={16} height={16} />} type="secondary" className="" />
      </RadixCollapsible.Trigger>
    </div>
  );
};

export const CollapsibleContent = ({ className, children }: PropsWithChildren<CollapsibleContentProps>) => {
  return (
    <RadixCollapsible.Content
      className={clsx(
        "collapsible-content data-[state=open]:animate-expand data-[state=closed]:animate-retract",
        className
      )}
    >
      {children}
    </RadixCollapsible.Content>
  );
};
