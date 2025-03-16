import clsx from "clsx";
import { Tabs as RadixTabs } from "radix-ui";
import { PropsWithChildren } from "react";

type TabsProps = {
  defaultValue: string;
  onChange: (value: string) => void;
};
type TabTriggerProps = {
  label: string;
  value: string;
};

type TabListProps = {
  className?: string;
};

type TabContentProps = {
  className?: string;
  hidden?: boolean;
  value: string;
};

export const Tabs = ({ defaultValue, onChange, children }: PropsWithChildren<TabsProps>) => {
  return (
    <RadixTabs.Root defaultValue={defaultValue} onValueChange={onChange}>
      {children}
    </RadixTabs.Root>
  );
};

export const TabsList = ({ className, children }: PropsWithChildren<TabListProps>) => {
  return <RadixTabs.List className={clsx("px-4 h-12 flex flex-row gap-3", className)}>{children}</RadixTabs.List>;
};

export const TabTrigger = ({ label, value }: TabTriggerProps) => {
  return (
    <RadixTabs.Trigger className="group relative text-neutral-800 font-medium text-sm cursor-pointer" value={value}>
      {label}
      <div className="group-data-[state=active]:block hidden">
        <TabIndicator />
      </div>
    </RadixTabs.Trigger>
  );
};

export const TabContent = ({ value, hidden = false, className, children }: PropsWithChildren<TabContentProps>) => {
  return (
    <RadixTabs.Content className={className} value={value} forceMount hidden={hidden}>
      {children}
    </RadixTabs.Content>
  );
};

const TabIndicator = () => {
  return <div className="absolute bottom-0 h-[3px] w-full bg-neutral-800 rounded-full" />;
};
