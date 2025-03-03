import type { Meta, StoryObj } from "@storybook/react";

import { PlaySolid } from "iconoir-react";
import { IconButton, IconButtonType } from "./IconButton";

const meta = {
  component: IconButton,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;
type StoryArgs = {
  type?: IconButtonType;
  icon: JSX.Element;
};

const renderFunction = function Render(args: StoryArgs) {
  return <IconButton {...args}>Button</IconButton>;
};

export const Primary: Story = {
  args: {
    type: "primary",
    icon: <PlaySolid width={16} height={16} />,
  },
  render: renderFunction,
};

export const Secondary: Story = {
  args: {
    type: "secondary",
    icon: <PlaySolid width={16} height={16} />,
  },
  render: renderFunction,
};
