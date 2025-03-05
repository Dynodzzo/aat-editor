import clsx from "clsx";
import { NavArrowDown } from "iconoir-react";
import { Select as RadixSelect } from "radix-ui";

export const InputTrigger = ({
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
  className?: string;
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
      <RadixSelect.Value placeholder={placeholder}></RadixSelect.Value>
      {decorator && decorator}
      {showArrow && (
        <RadixSelect.Icon>
          <NavArrowDown width={16} height={16} />
        </RadixSelect.Icon>
      )}
    </RadixSelect.Trigger>
  );
};
