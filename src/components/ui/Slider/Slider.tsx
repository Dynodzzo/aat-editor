import { Slider as RadixSlider } from "radix-ui";

type SliderProps = {
  value: number;
  onChange: (value: number) => void;
};

export const Slider = ({ value, onChange }: SliderProps) => {
  const handleValueChange = (value: number[]) => {
    onChange?.(value[0]);
  };

  return (
    <RadixSlider.Root
      className="relative flex flex-row size-full touch-none select-none items-center"
      value={[value]}
      onValueChange={handleValueChange}
    >
      <RadixSlider.Track className="relative h-1 grow rounded-full bg-neutral-200 overflow-clip">
        <RadixSlider.Range className="absolute h-full bg-neutral-800" />
      </RadixSlider.Track>
      <RadixSlider.Thumb className="block size-3 rounded-full bg-neutral-100 shadow-neutral-600 shadow-xs" />
    </RadixSlider.Root>
  );
};
