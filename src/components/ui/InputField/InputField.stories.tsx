import { useArgs } from "@storybook/preview-api";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Input } from "../Input/Input";
import { InputArgs } from "../Input/Input.stories";
import { InputField } from "./InputField";
import { Label } from "./Label";
import { LabelArgs } from "./Label.stories";
import { LabelInfo } from "./LabelInfo";
import { LabelText } from "./LabelText";

type InputFieldArgs = React.ComponentProps<typeof InputField> & LabelArgs & InputArgs;
type Story = StoryObj<InputFieldArgs>;

const defaultArgs: InputFieldArgs = {
  value: "",
  placeholder: "Try typing here",
  label: "Label",
  info: "Help",
};

const meta = {
  component: InputField,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<InputFieldArgs>;

export default meta;

const InputFieldTemplate: Story = {
  render: function Render({ label, info, value, placeholder, variant, size }) {
    const [currentValue, setCurrentValue] = useState<string>(value);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, updateArgs] = useArgs<InputFieldArgs>();

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
      setCurrentValue(event?.target.value);
      updateArgs({ value: event?.target.value });
    }

    return (
      <InputField>
        <Label>
          <LabelText>{label}</LabelText>
          {info && <LabelInfo>{info}</LabelInfo>}
        </Label>
        <Input value={currentValue} placeholder={placeholder} onChange={onChange} variant={variant} size={size} />
      </InputField>
    );
  },
};

export const FillMedium: Story = {
  args: {
    ...defaultArgs,
    variant: "fill",
    size: "md",
  },
  ...InputFieldTemplate,
};

export const FillSmall: Story = {
  args: {
    ...defaultArgs,
    variant: "fill",
    size: "sm",
  },
  ...InputFieldTemplate,
};

export const OutlineMedium: Story = {
  args: {
    ...defaultArgs,
    variant: "outline",
    size: "md",
  },
  ...InputFieldTemplate,
};

export const OutlineSmall: Story = {
  args: {
    ...defaultArgs,
    variant: "outline",
    size: "sm",
  },
  ...InputFieldTemplate,
};
