import type { Meta, StoryObj } from "@storybook/react";

import { ColorIndicator } from "./ColorIndicator";

const meta = {
  component: ColorIndicator,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ColorIndicator>;

export default meta;

type Story = StoryObj<typeof meta>;
type StoryArgs = {
  color: string;
};

const defaultArgs: StoryArgs = {
  color: "#55C066",
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
};
