import clsx from "clsx";
import { Separator } from "radix-ui";
import { useId } from "react";
import { selectActiveLanguages } from "../../../../store/features/language.slice";
import { useAppSelector } from "../../../../store/hooks";
import { Label } from "../../../ui/InputField/Label";
import { LabelText } from "../../../ui/InputField/LabelText";
import { Switch } from "../../../ui/Switch/Switch";
import { VoiceTranslation } from "./VoiceTranslation";

type VoiceTranslationsProps = {
  voiceId: string;
};

export const VoiceTranslations = ({ voiceId }: VoiceTranslationsProps) => {
  const translationsId = useId();
  const languages = useAppSelector(selectActiveLanguages);

  return (
    <div className="flex flex-col gap-2 py-2">
      <Separator.Root
        orientation="horizontal"
        className="w-full h-px [background:repeating-linear-gradient(90deg,#E5E5E5,#E5E5E5_4px,transparent_4px,transparent_8px)]"
      />
      <div className="voice-translations-header flex flex-row items-center justify-between py-2">
        <h2 className="text-xs">Voice translations</h2>
        <div className={clsx("flex flex-row gap-2 items-center cursor-pointer [&_*]:cursor-pointer", {})}>
          <Label className="flex-1 [&_*]:w-full [&_*]:text-neutral-500">
            <LabelText htmlFor={translationsId}>Use voice ID for all languages</LabelText>
          </Label>
          <Switch id={translationsId} checked={false} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {languages.map(({ id: languageId, name }) => {
          return <VoiceTranslation key={languageId} voiceId={voiceId} languageId={languageId} languageName={name} />;
        })}
      </div>
    </div>
  );
};
