import clsx from "clsx";
import { DropdownMenu as RadixDropdownMenu } from "radix-ui";
import React, { memo, PropsWithChildren } from "react";

export type DropdownMenuProps = {
  icon: React.ReactNode;
  className?: string;
};

export type DropdownMenuItemProps = {
  onSelect: () => void;
};

export const DropdownMenu = memo(function DropdownMenu({
  icon,
  className = "",
  children,
}: PropsWithChildren<DropdownMenuProps>) {
  return (
    <RadixDropdownMenu.Root>
      <RadixDropdownMenu.Trigger className={clsx(className)} asChild>
        <div className={clsx("text-neutral-500")}>{icon}</div>
      </RadixDropdownMenu.Trigger>

      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content
          align="start"
          sideOffset={10}
          className={clsx("flex flex-col bg-neutral-50 ring ring-neutral-200 rounded-sm shadow-lg min-w-30")}
        >
          {children}
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
});

export const DropdownMenuItem = memo(function DropdownMenuItem({
  children,
  onSelect,
}: PropsWithChildren<DropdownMenuItemProps>) {
  return (
    <RadixDropdownMenu.Item
      onSelect={onSelect}
      className={clsx("px-4 py-2 cursor-pointer text-sm text-neutral-500 hover:bg-neutral-100")}
    >
      {children}
    </RadixDropdownMenu.Item>
  );
});
