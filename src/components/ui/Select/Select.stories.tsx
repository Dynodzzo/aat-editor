import type { Meta, StoryObj } from "@storybook/react";

import { useArgs } from "storybook/internal/preview-api";
import { Select, SelectItem } from "./Select";

const meta = {
  component: Select,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;
type StoryArgs = {
  value: string;
  placeholder?: string;
  decorator?: JSX.Element;
};

const defaultArgs: StoryArgs = {
  value: "",
  placeholder: "Select...",
};

const renderFunction = function Render(args: StoryArgs) {
  const [storyArgs, updateArgs] = useArgs<StoryArgs>();

  function onChange(currentValue: string) {
    updateArgs({ value: currentValue });
  }

  return (
    <Select {...args} value={storyArgs.value} onChange={onChange}>
      <SelectItem value="Apple">Apple</SelectItem>
      <SelectItem value="Banana">Banana</SelectItem>
      <SelectItem value="Kiwi">Kiwi</SelectItem>
      <SelectItem value="Peach">Peach</SelectItem>
    </Select>
  );
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  render: renderFunction,
};
