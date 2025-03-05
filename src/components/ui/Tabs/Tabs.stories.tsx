import type { Meta, StoryObj } from "@storybook/react";

import { TabContent, Tabs, TabsList, TabTrigger } from "./Tabs";

const meta = {
  component: Tabs,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;
type StoryArgs = {
  defaultValue: string;
};

const defaultArgs: StoryArgs = {
  defaultValue: "1",
};

const renderFunction = function Render(args: StoryArgs) {
  return (
    <Tabs {...args}>
      <TabsList>
        <TabTrigger label="Tab 1" value="1" />
        <TabTrigger label="Tab 2" value="2" />
      </TabsList>
      <TabContent value="1">Tab 1 content</TabContent>
      <TabContent value="2">Tab 2 content</TabContent>
    </Tabs>
  );
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  render: renderFunction,
};
