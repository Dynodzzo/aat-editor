import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Input, InputSize, InputVariant } from "./Input";

const meta = {
  component: Input,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;
type StoryArgs = {
  value: string;
  placeholder?: string;
  label?: string;
  info?: string;
  variant?: InputVariant;
  size?: InputSize;
};

const defaultArgs: StoryArgs = {
  value: "",
  placeholder: "Try typing here",
};

const renderFunction = function Render(args: StoryArgs) {
  const [value, setValue] = useState(args.value);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event?.target.value);
  }

  return <Input {...args} value={value} onChange={onChange} />;
};

export const FillMedium: Story = {
  args: {
    ...defaultArgs,
    variant: "fill",
    size: "md",
  },
  render: renderFunction,
};

export const FillSmall: Story = {
  args: {
    ...defaultArgs,
    variant: "fill",
    size: "sm",
  },
  render: renderFunction,
};

export const OutlineMedium: Story = {
  args: {
    ...defaultArgs,
    variant: "outline",
    size: "md",
  },
  render: renderFunction,
};

export const OutlineSmall: Story = {
  args: {
    ...defaultArgs,
    variant: "outline",
    size: "sm",
  },
  render: renderFunction,
};
