import { Tabs as RadixTabs } from "radix-ui";
import { PropsWithChildren } from "react";

type TabsProps = {
  defaultValue: string;
};
type TabTriggerProps = {
  label: string;
  value: string;
};

type TabContentProps = {
  value: string;
};

export const Tabs = ({ defaultValue, children }: PropsWithChildren<TabsProps>) => {
  return <RadixTabs.Root defaultValue={defaultValue}>{children}</RadixTabs.Root>;
};

export const TabsList = ({ children }: PropsWithChildren) => {
  return <RadixTabs.List className="px-4 h-12 flex flex-row gap-3">{children}</RadixTabs.List>;
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

export const TabContent = ({ value, children }: PropsWithChildren<TabContentProps>) => {
  return (
    <RadixTabs.Content className="p-4" value={value}>
      {children}
    </RadixTabs.Content>
  );
};

const TabIndicator = () => {
  return <div className="absolute bottom-0 h-[3px] w-full bg-neutral-800 rounded-full" />;
};
