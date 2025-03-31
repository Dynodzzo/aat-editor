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

  function onChange(value: string) {
    setValue(value);
  }

  return <Input {...args} value={value} onChange={onChange} />;
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  render: renderFunction,
};
