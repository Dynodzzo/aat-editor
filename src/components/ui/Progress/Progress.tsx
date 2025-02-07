import { Progress as RadixProgress } from "radix-ui";

type ProgressProps = {
  progress: number;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};

export const Progress = ({ progress, onClick }: ProgressProps) => {
  return (
    <RadixProgress.Root
      className="relative bg-gray-600 h-3 border-2 border-gray-600 rounded-full cursor-pointer overflow-hidden grid place-items-center"
      style={{
        // Fix overflow clipping in Safari
        // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
        transform: "translateZ(0)",
      }}
      onClick={onClick}
      value={progress}
    >
      <RadixProgress.Indicator
        className="bg-gray-300 h-2 w-full"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </RadixProgress.Root>
  );
};
