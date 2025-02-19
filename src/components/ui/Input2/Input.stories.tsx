import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Input } from "./Input";

export type InputArgs = React.ComponentProps<typeof Input>;

const meta = {
  component: Input,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<InputArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultArgs: InputArgs = {
  value: "",
  placeholder: "Try typing here",
};

const renderFunction = function Render(args: InputArgs) {
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
