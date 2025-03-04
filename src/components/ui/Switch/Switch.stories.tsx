import type { Meta, StoryObj } from "@storybook/react";

import { useArgs } from "storybook/internal/preview-api";
import { Switch } from "./Switch";

const meta = {
  component: Switch,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;
type StoryArgs = {
  checked: boolean;
  disabled?: boolean;
};

const defaultArgs: StoryArgs = {
  checked: false,
};

const renderFunction = function Render(args: StoryArgs) {
  const [storyArgs, updateArgs] = useArgs<StoryArgs>();

  function onCheckedChange(checked: boolean) {
    updateArgs({ checked });
  }

  return <Switch {...args} checked={storyArgs.checked} onChange={onCheckedChange} />;
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  render: renderFunction,
};
