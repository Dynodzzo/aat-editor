import type { Meta, StoryObj } from "@storybook/react";

import { Chip } from "./Chip";

const meta = {
  component: Chip,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;
type StoryArgs = {
  value: string;
  highlighted?: boolean;
};

const defaultArgs: StoryArgs = {
  value: "Value",
};

export const Idle: Story = {
  args: {
    ...defaultArgs,
    highlighted: false,
  },
};

export const Highlighted: Story = {
  args: {
    ...defaultArgs,
    highlighted: true,
  },
};
