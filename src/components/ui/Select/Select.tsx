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
        <RadixSelect.Content className="min-w-30 flex flex-column bg-neutral-50 rounded-sm shadow-lg ring ring-neutral-200 overflow-hidden cursor-pointer">
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
