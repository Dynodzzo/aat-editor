import clsx from "clsx";
import { Switch as RadixSwitch } from "radix-ui";

type SwitchProps = {
  id?: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
};

export const Switch = ({ id, checked, disabled = false, onChange }: SwitchProps) => {
  const handleCheckedChange = (checked: boolean) => {
    onChange?.(checked);
  };

  return (
    <RadixSwitch.Root
      id={id}
      checked={checked}
      disabled={disabled}
      onCheckedChange={handleCheckedChange}
      className={clsx(
        "flex flex-row items-center w-6 h-[14px] cursor-pointer rounded-lg justify-end transition-all",
        "data-[state=checked]:disabled:bg-neutral-500 data-[state=unchecked]:disabled:bg-neutral-300 inset-ring",
        "data-[state=checked]:bg-neutral-600 data-[state=unchecked]:bg-neutral-100",
        "data-[state=checked]:inset-ring-transparent data-[state=unchecked]:inset-ring-neutral-500"
      )}
    >
      <RadixSwitch.Thumb
        className={clsx(
          "block size-[10px] rounded-full will-change-transform transition-all",
          "data-[state=checked]:bg-neutral-50 data-[state=unchecked]:bg-neutral-500 ",
          "data-[state=checked]:scale-100 data-[state=unchecked]:scale-70",
          "data-[state=checked]:translate-x-[-2px] data-[state=unchecked]:translate-x-[-13px]"
        )}
      />
    </RadixSwitch.Root>
  );
};
