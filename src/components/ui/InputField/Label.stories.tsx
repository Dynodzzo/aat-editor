import type { Meta, StoryObj } from "@storybook/react";

import { Label } from "./Label";
import { LabelInfo } from "./LabelInfo";
import { LabelText } from "./LabelText";

export type LabelArgs = React.ComponentProps<typeof Label> & {
  label: string;
  info?: string;
};

const meta = {
  component: Label,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<LabelArgs>;

export default meta;

type Story = StoryObj<LabelArgs>;

const LabelTemplate: Story = {
  render: ({ label, info }) => (
    <div className="w-25">
      <Label>
        <LabelText>{label}</LabelText>
        {info && <LabelInfo>{info}</LabelInfo>}
      </Label>
    </div>
  ),
};

export const LabelOnly: Story = {
  args: {
    label: "Label",
  },
  ...LabelTemplate,
};

export const WithInfoText: Story = {
  args: {
    label: "Label",
    info: "Help text",
  },
  ...LabelTemplate,
};
