import type { Meta, StoryObj } from "@storybook/react";

import { LabelInfo } from "./LabelInfo";

const meta = {
  component: LabelInfo,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LabelInfo>;

export default meta;

type Story = StoryObj<typeof meta>;
type StoryArgs = {
  children: string;
};

const defaultArgs: StoryArgs = {
  children: "Info text",
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
};
