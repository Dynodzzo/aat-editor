import { memo, useCallback, useDeferredValue, useId } from "react";
import { Language } from "../../../../model/transcription/language.model";
import { selectOneVoiceById, updateVoiceColor, updateVoiceName } from "../../../../store/features/voice.slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { ColorInput } from "../../../ui/ColorInput/ColorInput";
import { Input } from "../../../ui/Input/Input";
import { InputFieldInline } from "../../../ui/InputField/InputFieldInline";
import { Label } from "../../../ui/InputField/Label";
import { LabelText } from "../../../ui/InputField/LabelText";

type VoiceProps = {
  voiceId: string;
  languages: Language[];
};

export const Voice = memo(function Voice({ voiceId }: VoiceProps) {
  const colorId = useId();
  const dispatch = useAppDispatch();
  const { id, color, name } = useAppSelector((state) => selectOneVoiceById(state, voiceId));
  const deferredColor = useDeferredValue(color);

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
    <div className="flex flex-col gap-1 p-1 flex-1">
      <div className="flex flex-row items-center gap-4">
        <InputFieldInline className="flex-1">
          <Label>
            <LabelText htmlFor={voiceId}>ID</LabelText>
          </Label>
          <Input
            id={voiceId}
            className="flex-1 text-left"
            value={name}
            size="sm"
            variant="fill"
            onChange={handleChangeName}
          />
        </InputFieldInline>
        <InputFieldInline>
          <Label>
            <LabelText htmlFor={colorId}>Color</LabelText>
          </Label>
          <ColorInput id={colorId} value={deferredColor} onChange={handleChangeColor} />
        </InputFieldInline>
      </div>
    </div>
  );
});
