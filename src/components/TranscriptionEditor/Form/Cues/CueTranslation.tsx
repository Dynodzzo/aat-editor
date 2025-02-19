import { useId } from "react";
import { LanguageId } from "../../../../model/transcription/language.model";
import {
  selectCueTranslationsByCueIdAndLanguageId,
  updateCueTranslation,
} from "../../../../store/features/cue-translation.slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { Input } from "../../../ui/Input2/Input";
import { InputField } from "../../../ui/InputField/InputField";
import { Label } from "../../../ui/InputField/Label";
import { LabelInfo } from "../../../ui/InputField/LabelInfo";
import { LabelText } from "../../../ui/InputField/LabelText";

type CueTranslationProps = {
  cueId: string;
  languageId: LanguageId;
  languageName: string;
};

export const CueTranslation = ({ cueId, languageId, languageName }: CueTranslationProps) => {
  const cueTranslationTextId = useId();
  const cueTranslationNoteId = useId();
  const dispatch = useAppDispatch();
  const cueTranslation = useAppSelector((state) => selectCueTranslationsByCueIdAndLanguageId(state, cueId, languageId));

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!cueTranslation) return;
    dispatch(updateCueTranslation({ id: cueTranslation.id, text: event.target.value, note: cueTranslation.note }));
  };

  const handleChangeNote = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!cueTranslation) return;
    dispatch(updateCueTranslation({ id: cueTranslation.id, text: cueTranslation.text, note: event.target.value }));
  };

  if (!cueTranslation) return null;

  return (
    <div className="transcript-lang grid grid-cols-2 gap-4 items-end">
      <InputField>
        <Label>
          <LabelText htmlFor={cueTranslationTextId}>{languageName}</LabelText>
          <LabelInfo>Transcript</LabelInfo>
        </Label>
        <Input id={cueTranslationTextId} value={cueTranslation.text} onChange={handleChangeText} />
      </InputField>
      <InputField>
        <Label>
          <LabelText htmlFor={cueTranslationNoteId}></LabelText>
          <LabelInfo>Notes</LabelInfo>
        </Label>
        <Input id={cueTranslationNoteId} value={cueTranslation.note ?? ""} onChange={handleChangeNote} />
      </InputField>
    </div>
  );
};
