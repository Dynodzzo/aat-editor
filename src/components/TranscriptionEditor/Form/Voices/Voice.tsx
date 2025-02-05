import { memo, useCallback, useId } from "react";
import { Language } from "../../../../model/transcription/language.model";
import { selectVoiceById, updateVoiceColor, updateVoiceName } from "../../../../store/features/voice.slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { ColorInput } from "../../../ui/ColorInput/ColorInput";
import { Input } from "../../../ui/Input/Input";
import { InputFieldInline } from "../../../ui/InputField/InputFieldInline";
import { Label } from "../../../ui/InputField/Label";
import { LabelText } from "../../../ui/InputField/LabelText";
import { VoiceTranslation } from "./VoiceTranslation";

type VoiceProps = {
  voiceId: string;
  languages: Language[];
};

export const Voice = memo(function Voice({ voiceId, languages }: VoiceProps) {
  const colorId = useId();
  const dispatch = useAppDispatch();
  const { id, color, name } = useAppSelector((state) => selectVoiceById(state, voiceId));

  const handleChangeColor = useCallback(
    (newColor: string) => {
      dispatch(updateVoiceColor({ id, color: newColor }));
    },
    [dispatch, id]
  );

  const handleChangeName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(updateVoiceName({ id, name: event.target.value }));
    },
    [dispatch, id]
  );

  return (
    <div className="flex flex-col gap-1 pl-1">
      <div className="flex flex-row gap-4 items-center">
        <ColorInput id={colorId} value={color} onChange={handleChangeColor} />
        <InputFieldInline className="justify-between">
          <Label>
            <LabelText htmlFor={voiceId}>ID</LabelText>
          </Label>
          <Input
            id={voiceId}
            className="text-right max-w-30"
            value={name}
            size="sm"
            variant="fill"
            onChange={handleChangeName}
          />
        </InputFieldInline>
      </div>
      {languages.map(({ id: languageId, name }) => {
        return <VoiceTranslation key={languageId} voiceId={voiceId} languageId={languageId} languageName={name} />;
      })}
    </div>
  );
});
