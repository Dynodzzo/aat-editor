import type { Meta, StoryObj } from "@storybook/react";

import { PlaySolid } from "iconoir-react";
import { Button, ButtonStyle, ButtonVariant } from "./Button";

const meta = {
  component: Button,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;
type StoryArgs = {
  variant?: ButtonVariant;
  style?: ButtonStyle;
  prefix?: JSX.Element;
};

const renderFunction = function Render(args: StoryArgs) {
  return <Button {...args}>Button</Button>;
};

export const PrimaryOutline: Story = {
  args: {
    variant: "outline",
    style: "primary",
  },
  render: renderFunction,
};

export const PrimaryInline: Story = {
  args: {
    variant: "inline",
    style: "primary",
  },
  render: renderFunction,
};

export const SecondaryOutline: Story = {
  args: {
    variant: "outline",
    style: "secondary",
  },
  render: renderFunction,
};

export const SecondaryInline: Story = {
  args: {
    variant: "inline",
    style: "secondary",
  },
  render: renderFunction,
};

export const WithPrefix: Story = {
  args: {
    variant: "outline",
    style: "primary",
    prefix: <PlaySolid width={20} height={20} />,
  },
  render: renderFunction,
};
