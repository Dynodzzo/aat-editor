import { NavArrowDown } from "iconoir-react";
import { Select as RadixSelect } from "radix-ui";
import { PropsWithChildren } from "react";

type SelectProps = {
  id?: string;
  value: string;
  placeholder?: string;
  decorator?: JSX.Element;
  onChange?: (value: string) => void;
};

export const Select = ({
  id = "",
  value,
  placeholder = "",
  decorator,
  onChange,
  children,
}: PropsWithChildren<SelectProps>) => {
  const handleChange = (currentValue: string) => {
    if (onChange) {
      onChange(currentValue);
    }
  };

  return (
    <RadixSelect.Root value={value} onValueChange={handleChange}>
      <RadixSelect.Trigger
        id={id}
        className="w-full h-min px-2 py-1 flex flex-row items-center gap-1 rounded-md bg-transparent inset-ring inset-ring-zinc-300 text-zinc-500 data-placeholder:italic data-placeholder:text-zinc-400 cursor-pointer"
      >
        <span className="flex-auto text-sm font-normal text-left">
          <RadixSelect.Value placeholder={placeholder}></RadixSelect.Value>
        </span>
        {decorator && decorator}
        <RadixSelect.Icon className="text-zinc-500">
          <NavArrowDown width={24} height={24} />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className="flex flex-column bg-zinc-100 rounded-md shadow-lg ring ring-zinc-300 overflow-hidden">
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
      className="text-zinc-500 px-4 py-2 data-highlighted:bg-zinc-50 data-highlighted:outline-none"
      value={value}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator />
    </RadixSelect.Item>
  );
};
