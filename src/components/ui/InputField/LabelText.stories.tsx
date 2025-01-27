import type { Meta, StoryObj } from "@storybook/react";

import { LabelText } from "./LabelText";

const meta = {
  component: LabelText,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof LabelText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    htmlFor: "label",
    children: "Label",
  },
};
