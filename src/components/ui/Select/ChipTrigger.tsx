import clsx from "clsx";
import { Select as RadixSelect } from "radix-ui";

export const ChipTrigger = ({
  color,
  id,
  placeholder = "",
  className = "",
}: {
  color: string;
  id?: string;
  placeholder?: string;
  showArrow?: boolean;
  className?: string;
}) => {
  return (
    <RadixSelect.Trigger
      id={id}
      className={clsx(
        "pl-[2px] pr-1.5 py-[2px] flex flex-row items-center justify-between gap-1 bg-neutral-50 ring-1 ring-neutral-200 rounded-2xl data-placeholder:italic data-placeholder:text-neutral-400 font-normal text-[10px] text-neutral-800 cursor-pointer focus-visible:outline-none",
        "hover:bg-neutral-200 hover:ring-neutral-400",
        "focus-within:ring-2 focus-within:ring-neutral-400 focus-within:bg-neutral-200",
        className
      )}
    >
      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: color }}></div>
      <RadixSelect.Value placeholder={placeholder}></RadixSelect.Value>
    </RadixSelect.Trigger>
  );
};
