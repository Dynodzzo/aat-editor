import clsx from "clsx";
import { NavArrowDown } from "iconoir-react";
import { Select as RadixSelect } from "radix-ui";
import { PropsWithChildren } from "react";

type SelectProps = {
  value: string;
  trigger: JSX.Element;
  onChange?: (value: string) => void;
};

export const Select = ({ value, trigger, onChange, children }: PropsWithChildren<SelectProps>) => {
  const handleChange = (currentValue: string) => {
    if (onChange) {
      onChange(currentValue);
    }
  };

  return (
    <RadixSelect.Root value={value} onValueChange={handleChange}>
      {trigger}
      <RadixSelect.Portal>
        <RadixSelect.Content className="flex flex-column bg-neutral-50 rounded-sm shadow-lg ring ring-neutral-200 overflow-hidden cursor-pointer">
          <RadixSelect.Viewport className="flex flex-col gap-2">{children}</RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};

type SelectItemProps = {
  value: string;
};

export const SelectItem = ({ value, children }: PropsWithChildren<SelectItemProps>) => {
  return (
    <RadixSelect.Item
      className="text-neutral-500 px-4 py-2 data-highlighted:bg-neutral-100 data-highlighted:outline-none"
      value={value}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator />
    </RadixSelect.Item>
  );
};

export const SelectInputTrigger = ({
  id,
  placeholder = "",
  decorator,
  showArrow = true,
  className,
}: {
  id: string;
  placeholder?: string;
  decorator?: JSX.Element;
  showArrow?: boolean;
  className: string;
}) => {
  return (
    <RadixSelect.Trigger
      id={id}
      className={clsx(
        "px-2 py-1 flex flex-row items-center justify-between gap-1 bg-neutral-50 ring-1 ring-neutral-200 rounded-sm data-placeholder:italic data-placeholder:text-neutral-400 font-normal text-sm text-neutral-500 cursor-pointer focus-visible:outline-none",
        "focus-within:ring-2 focus-within:ring-neutral-400",
        className
      )}
    >
      <span className={""}>
        <RadixSelect.Value placeholder={placeholder}></RadixSelect.Value>
      </span>
      {decorator && decorator}
      {showArrow && (
        <RadixSelect.Icon>
          <NavArrowDown width={16} height={16} />
        </RadixSelect.Icon>
      )}
    </RadixSelect.Trigger>
  );
};

export const IconTrigger = ({ id, icon, className }: { id: string; icon?: JSX.Element; className: string }) => {
  return (
    <RadixSelect.Trigger
      id={id}
      className={clsx("px-2 py-1 flex flex-row items-center gap-1 text-neutral-500 cursor-pointer", className)}
    >
      <span className="flex-auto text-xs font-normal text-left leading-none">
        <RadixSelect.Value></RadixSelect.Value>
      </span>
      <RadixSelect.Icon>{icon}</RadixSelect.Icon>
    </RadixSelect.Trigger>
  );
};
