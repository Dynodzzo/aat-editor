import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";
import { useArgs } from "storybook/internal/preview-api";
import { Input } from "../Input/Input";
import { InputArgs } from "../Input/Input.stories";
import { InputFieldInline } from "./InputFieldInline";
import { Label } from "./Label";
import { LabelArgs } from "./Label.stories";
import { LabelInfo } from "./LabelInfo";
import { LabelText } from "./LabelText";

type InputFieldInlineArgs = React.ComponentProps<typeof InputFieldInline> & LabelArgs & InputArgs;
type Story = StoryObj<InputFieldInlineArgs>;

const defaultArgs: InputFieldInlineArgs = {
  value: "",
  placeholder: "Try typing here",
  label: "Label",
};

const meta = {
  component: InputFieldInline,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InputFieldInline>;

export default meta;

const InputFieldInlineTemplate: Story = {
  render: function Render({ label, info, value, placeholder, variant, size }) {
    const [currentValue, setCurrentValue] = useState<string>(value);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, updateArgs] = useArgs<InputFieldInlineArgs>();

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
      setCurrentValue(event?.target.value);
      updateArgs({ value: event?.target.value });
    }

    return (
      <InputFieldInline>
        <Label>
          <LabelText>{label}</LabelText>
          {info && <LabelInfo>{info}</LabelInfo>}
        </Label>
        <Input value={currentValue} placeholder={placeholder} onChange={onChange} variant={variant} size={size} />
      </InputFieldInline>
    );
  },
};

export const FillSmall: Story = {
  args: {
    ...defaultArgs,
    variant: "fill",
    size: "sm",
  },
  ...InputFieldInlineTemplate,
};

export const FillMedium: Story = {
  args: {
    ...defaultArgs,
    variant: "fill",
    size: "md",
  },
  ...InputFieldInlineTemplate,
};

export const OutlineSmall: Story = {
  args: {
    ...defaultArgs,
    variant: "outline",
    size: "sm",
  },
  ...InputFieldInlineTemplate,
};

export const OutlineMedium: Story = {
  args: {
    ...defaultArgs,
    variant: "outline",
    size: "md",
  },
  ...InputFieldInlineTemplate,
};
