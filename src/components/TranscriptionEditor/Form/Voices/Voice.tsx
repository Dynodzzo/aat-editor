import { memo, useCallback, useId } from "react";
import { LanguageKey, Voice as VoiceModel } from "../../../../model/TranscriptionModel";
import { ColorInput } from "../../../ui/ColorInput/ColorInput";
import { Input } from "../../../ui/Input/Input";
import { InputFieldInline } from "../../../ui/InputField/InputFieldInline";
import { Label } from "../../../ui/InputField/Label";
import { LabelText } from "../../../ui/InputField/LabelText";
import { AVAILABLE_LANGUAGES } from "../FormConstants";

type VoiceProps = {
  voice: VoiceModel;
  languages: LanguageKey[];
  onChangeId: (event: React.ChangeEvent<HTMLInputElement>, voiceKey: string, voiceId: string) => void;
  onChangeColor: (color: string, voiceKey: string) => void;
  onChangeName: (event: React.ChangeEvent<HTMLInputElement>, voiceKey: string, language: LanguageKey) => void;
};

export const Voice = memo(function Voice({ voice, languages, onChangeId, onChangeColor, onChangeName }: VoiceProps) {
  const colorId = useId();
  const voiceId = useId();

  const handleChangeColor = useCallback(
    (color: string) => {
      onChangeColor(color, voice.key);
    },
    [onChangeColor, voice]
  );

  const handleChangeId = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeId(event, voice.key, voice.id);
    },
    [onChangeId, voice]
  );

  const handleChangeName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, language: LanguageKey) => {
      onChangeName(event, voice.key, language);
    },
    [onChangeName, voice]
  );

  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row gap-4 items-center">
        <ColorInput id={colorId} value={voice.color} onChange={handleChangeColor} />
        <InputFieldInline className="justify-between">
          <Label>
            <LabelText htmlFor={voiceId}>ID</LabelText>
          </Label>
          <Input
            id={voiceId}
            className="text-right max-w-30"
            value={voice.id}
            size="sm"
            variant="fill"
            onChange={handleChangeId}
          />
        </InputFieldInline>
      </div>
      {languages.length > 0 && (
        <>
          {AVAILABLE_LANGUAGES.map(({ key: langKey, name }) => {
            if (!languages.includes(langKey)) return null;

            const voiceNameId = `voice-name-${voice.id}-${langKey}`;

            return (
              <InputFieldInline key={langKey} className="justify-between">
                <Label>
                  <LabelText htmlFor={voiceNameId}>{name}</LabelText>
                </Label>
                <Input
                  id={voiceNameId}
                  className="text-right max-w-30"
                  value={voice.name[langKey]!}
                  size="sm"
                  variant="fill"
                  onChange={(event) => handleChangeName(event, langKey)}
                />
              </InputFieldInline>
            );
          })}
        </>
      )}
    </div>
  );
});
