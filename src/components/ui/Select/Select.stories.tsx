import type { Meta, StoryObj } from "@storybook/react";

import { MoreVert } from "iconoir-react";
import { useArgs } from "storybook/internal/preview-api";
import { ChipSelectTrigger, Select, InputSelectTrigger, SelectItem, IconSelectTrigger } from "./Select";

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
  trigger: <InputSelectTrigger id={"1"} placeholder="Select a fruit" className="min-w-32" />,
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

export const ChipTrigger: Story = {
  args: {
    ...defaultArgs,
    trigger: <ChipSelectTrigger id={"2"} color="SteelBlue" placeholder="Select a fruit" />,
  },
  render: renderFunction,
};

export const IconTrigger: Story = {
  args: {
    ...defaultArgs,
    trigger: <IconSelectTrigger id={"3"} icon={<MoreVert width={16} height={16} />} />,
  },
  render: renderFunction,
};
