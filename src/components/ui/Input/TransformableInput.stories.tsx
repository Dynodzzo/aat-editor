import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { TransformableInput } from "./TransformableInput";

export type TransformableInputArgs = React.ComponentProps<typeof TransformableInput>;

const meta = {
  component: TransformableInput,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<TransformableInputArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultArgs: TransformableInputArgs = {
  value: "",
  placeholder: "Try typing here",
};

const renderFunction = function Render(args: TransformableInputArgs) {
  const [value, setValue] = useState(args.value);

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event?.target.value);
  }

  return <TransformableInput {...args} value={value} onChange={onChange} />;
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  render: renderFunction,
};
