import clsx from "clsx";
import { Select as RadixSelect } from "radix-ui";

export const TextTrigger = ({
  id,
  icon,
  disabled,
  className,
  placeholder,
}: {
  id: string;
  icon?: JSX.Element;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}) => {
  return (
    <RadixSelect.Trigger
      id={id}
      disabled={disabled}
      className={clsx(
        "px-2 py-1 flex flex-row items-center gap-1 text-neutral-800 cursor-pointer data-disabled:text-neutral-400",
        className
      )}
    >
      <span className="flex-auto text-sm font-normal text-left leading-none">
        <RadixSelect.Value placeholder={placeholder}></RadixSelect.Value>
      </span>
      <RadixSelect.Icon className={clsx({ "text-neutral-600": !disabled, "text-neutral-300": disabled })}>
        {icon}
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
  );
};
