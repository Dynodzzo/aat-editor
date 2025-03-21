import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AutoHeightTextarea } from "./AutoHeightTextarea";

export type AutoHeightTextareaArgs = React.ComponentProps<typeof AutoHeightTextarea>;

const meta = {
  component: AutoHeightTextarea,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<AutoHeightTextareaArgs>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultArgs: AutoHeightTextareaArgs = {
  value: "",
  placeholder: "Try typing here",
};

const renderFunction = function Render(args: AutoHeightTextareaArgs) {
  const [value, setValue] = useState(args.value);

  function onChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setValue(event?.target.value);
  }

  return <AutoHeightTextarea {...args} value={value} onChange={onChange} />;
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  render: renderFunction,
};
