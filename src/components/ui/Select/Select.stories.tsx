import type { Meta, StoryObj } from "@storybook/react";

import { useArgs } from "storybook/internal/preview-api";
import { Select } from "./Select";

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
  options: string[];
  decorator?: JSX.Element;
};

const defaultArgs: StoryArgs = {
  value: "",
  placeholder: "Select...",
  options: ["Apple", "Banana", "Kiwi", "Peach"],
};

const renderFunction = function Render(args: StoryArgs) {
  const [storyArgs, updateArgs] = useArgs<StoryArgs>();

  function onChange(currentValue: string) {
    updateArgs({ value: currentValue });
  }

  return <Select {...args} value={storyArgs.value} onChange={onChange} />;
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  render: renderFunction,
};
