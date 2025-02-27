import type { Meta, StoryObj } from "@storybook/react";

import { useId } from "react";
import { useArgs } from "storybook/internal/preview-api";
import { Select, SelectInputTrigger, SelectItem } from "./Select";

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
  trigger: JSX.Element;
};

const defaultArgs: StoryArgs = {
  value: "",
  trigger: <></>,
};

const renderFunction = function Render(args: StoryArgs) {
  const [storyArgs, updateArgs] = useArgs<StoryArgs>();
  const id = useId();

  function onChange(currentValue: string) {
    updateArgs({ value: currentValue });
  }

  return (
    <Select
      {...args}
      value={storyArgs.value}
      trigger={<SelectInputTrigger id={id} placeholder="Select a fruit" className="min-w-32" />}
      onChange={onChange}
    >
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
