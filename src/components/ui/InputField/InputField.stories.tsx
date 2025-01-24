import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import { InputField } from "./InputField";

const meta = {
  component: InputField,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InputField>;

export default meta;

type Story = StoryObj<typeof meta>;
type StoryArgs = {
  value: string;
  placeholder?: string;
  label?: string;
  info?: string;
  variant?: "fill" | "outline";
};

const defaultArgs: StoryArgs = {
  value: "",
  placeholder: "Try typing here",
  label: "Label",
  info: "Help",
};

const renderFunction = function Render(args: StoryArgs) {
  const [{ value }, updateArgs] = useArgs<StoryArgs>();

  function onChange(event: React.ChangeEvent<HTMLInputElement>) {
    updateArgs({ value: event?.target.value });
  }

  return <InputField {...args} value={value} onChange={onChange} />;
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
