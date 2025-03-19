import clsx from "clsx";
import { Select as RadixSelect } from "radix-ui";

export const IconTrigger = ({ id, icon, className }: { id: string; icon?: JSX.Element; className?: string }) => {
  return (
    <RadixSelect.Trigger
      id={id}
      className={clsx("flex flex-row items-center gap-1 text-neutral-500 cursor-pointer", className)}
    >
      <span className="flex-auto font-normal text-left leading-none">
        <RadixSelect.Value></RadixSelect.Value>
      </span>
      <RadixSelect.Icon>{icon}</RadixSelect.Icon>
    </RadixSelect.Trigger>
  );
};
