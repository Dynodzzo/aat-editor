import { CheckCircle, InfoCircle, WarningTriangle, Xmark, XmarkCircle } from "iconoir-react";
import { Toast as RadixToast } from "radix-ui";
import { memo } from "react";

type ToastProps = {
  title: string;
  description: string;
  type: "success" | "error" | "warning" | "info";
  duration?: number;
  isOpen: boolean;
  onOpenChange?: (isOpen: boolean) => void;
};

type ToastIconProps = {
  type: "success" | "error" | "warning" | "info";
};

export const Toast = memo(function Toast({
  title,
  description,
  type,
  duration = 5000,
  isOpen,
  onOpenChange,
}: ToastProps) {
  return (
    <RadixToast.Root
      duration={duration}
      className="bg-white border border-neutral-200 rounded-lg p-2"
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <div className="flex flex-row items-start gap-4">
        <ToastIcon type={type} />
        <div className="flex flex-col gap-2 flex-1">
          <RadixToast.Title className="font-normal text-sm leading-[16px] text-neutral-800">{title}</RadixToast.Title>
          <RadixToast.Description className="font-normal text-xs text-neutral-500">
            {description}
          </RadixToast.Description>
        </div>
        <RadixToast.Close className="cursor-pointer text-neutral-800">
          <Xmark width={16} height={16} />
        </RadixToast.Close>
      </div>
    </RadixToast.Root>
  );
});

const ToastIcon = ({ type }: ToastIconProps) => {
  switch (type) {
    case "success":
      return <CheckCircle width={16} height={16} strokeWidth={2} className="text-green-600" />;
    case "error":
      return <XmarkCircle width={16} height={16} strokeWidth={2} className="text-red-600" />;
    case "warning":
      return <WarningTriangle width={16} height={16} strokeWidth={2} className="text-amber-600" />;
    case "info":
      return <InfoCircle width={16} height={16} strokeWidth={2} className="text-blue-600" />;
  }
};
