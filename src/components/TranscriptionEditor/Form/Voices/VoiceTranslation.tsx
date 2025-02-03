import { useCallback, useId } from "react";
import { LanguageId } from "../../../../model/transcription/language.model";
import {
  selectVoiceTranslationsByVoiceIdAndLanguageId,
  updateVoiceTranslation,
} from "../../../../store/features/voice-translation.slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { Input } from "../../../ui/Input/Input";
import { InputFieldInline } from "../../../ui/InputField/InputFieldInline";
import { Label } from "../../../ui/InputField/Label";
import { LabelText } from "../../../ui/InputField/LabelText";

type VoiceTranslationProps = {
  voiceId: string;
  languageId: LanguageId;
  languageName: string;
};

export const VoiceTranslation = ({ voiceId, languageId, languageName }: VoiceTranslationProps) => {
  const voiceTranslationId = useId();
  const dispatch = useAppDispatch();
  const voiceTranslation = useAppSelector((state) =>
    selectVoiceTranslationsByVoiceIdAndLanguageId(state, voiceId, languageId)
  );

  const handleChangeValue = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!voiceTranslation) return;
      dispatch(updateVoiceTranslation({ id: voiceTranslation.id, value: event.target.value }));
    },
    [dispatch, voiceTranslation]
  );

  if (!voiceTranslation) return null;

  return (
    <InputFieldInline key={languageId} className="justify-between">
      <Label>
        <LabelText htmlFor={voiceTranslationId}>{languageName}</LabelText>
      </Label>
      <Input
        id={voiceTranslationId}
        className="text-right max-w-30"
        value={voiceTranslation.value}
        size="sm"
        variant="fill"
        onChange={handleChangeValue}
      />
    </InputFieldInline>
  );
};
