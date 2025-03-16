import clsx from "clsx";
import { useId } from "react";
import { LanguageId } from "../../../../model/transcription/language.model";
import { selectLanguageById } from "../../../../store/features/language.slice";
import { useAppSelector } from "../../../../store/hooks";
import { Label } from "../../../ui/InputField/Label";
import { LabelText } from "../../../ui/InputField/LabelText";
import { Switch } from "../../../ui/Switch/Switch";

type LanguageProps = {
  languageId: LanguageId;
  disabled?: boolean;
  onToggle: (id: LanguageId) => void;
};

export const Language = ({ languageId, disabled = false, onToggle }: LanguageProps) => {
  const id = useId();
  const { name, isActive } = useAppSelector((state) => selectLanguageById(state, languageId));

  return (
    <div
      className={clsx("flex flex-row h-6 items-center cursor-pointer [&_*]:cursor-pointer", {
        "opacity-50": disabled,
      })}
    >
      <Label className="flex-1 h-full [&_*]:w-full [&_*]:leading-6">
        <LabelText htmlFor={id}>{name}</LabelText>
      </Label>
      <Switch id={id} checked={isActive} onChange={() => onToggle(languageId)} />
    </div>
  );
};
