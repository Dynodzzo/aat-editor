import { useCallback, useId } from "react";
import { LanguageId } from "../../../../model/transcription/language.model";
import {
  selectVoiceTranslationIdByVoiceIdAndLanguageId,
  selectVoiceTranslationValueByVoiceIdAndLanguageId,
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
  const translationId = useId();
  const dispatch = useAppDispatch();

  const voiceTranslationValue = useAppSelector((state) =>
    selectVoiceTranslationValueByVoiceIdAndLanguageId(state, { voiceId, languageId })
  );
  const voiceTranslationId = useAppSelector((state) =>
    selectVoiceTranslationIdByVoiceIdAndLanguageId(state, { voiceId, languageId })
  );

  const handleChangeValue = useCallback(
    (value: string) => {
      dispatch(updateVoiceTranslation({ id: voiceTranslationId!, value }));
    },
    [dispatch, voiceTranslationId]
  );

  if (!voiceTranslationId) return null;

  return (
    <InputFieldInline key={languageId} className="">
      <Label>
        <LabelText htmlFor={translationId}>{languageName}</LabelText>
      </Label>
      <Input
        id={translationId}
        className="flex-1"
        value={voiceTranslationValue ?? ""}
        size="sm"
        variant="fill"
        onChange={handleChangeValue}
      />
    </InputFieldInline>
  );
};
