import type { Meta, StoryObj } from "@storybook/react";

import { MoreVert, NavArrowDown } from "iconoir-react";
import { useArgs } from "storybook/internal/preview-api";
import { ChipTrigger } from "./ChipTrigger";
import { IconTrigger } from "./IconTrigger";
import { InputTrigger } from "./InputTrigger";
import { Select, SelectItem } from "./Select";
import { TextTrigger } from "./TextTrigger";

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
  trigger: <InputTrigger id={"1"} placeholder="Select a fruit" className="min-w-32" />,
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

export const WithChipTrigger: Story = {
  args: {
    ...defaultArgs,
    trigger: <ChipTrigger id={"2"} color="SteelBlue" placeholder="Select a fruit" />,
  },
  render: renderFunction,
};

export const WithIconTrigger: Story = {
  args: {
    ...defaultArgs,
    trigger: <IconTrigger id={"3"} icon={<MoreVert width={16} height={16} />} />,
  },
  render: renderFunction,
};

export const WithTextTrigger: Story = {
  args: {
    ...defaultArgs,
    trigger: <TextTrigger id={"4"} icon={<NavArrowDown width={16} height={16} />} />,
  },
  render: renderFunction,
};
