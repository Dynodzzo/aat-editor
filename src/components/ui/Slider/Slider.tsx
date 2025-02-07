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
      <RadixSlider.Track className="relative h-2 grow rounded-full bg-gray-100 overflow-clip">
        <RadixSlider.Range className="absolute h-full bg-gray-600" />
      </RadixSlider.Track>
      <RadixSlider.Thumb className="block size-3 rounded-[10px] bg-zinc-50 shadow-gray-600 shadow-xs" />
    </RadixSlider.Root>
  );
};
