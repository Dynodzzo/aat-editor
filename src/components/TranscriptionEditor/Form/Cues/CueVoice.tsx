import { memo, useCallback, useId, useMemo } from "react";
import { makeSelectVoiceColorById, selectVoicesIdsAndNames } from "../../../../store/features/voice.slice";
import { useAppSelector } from "../../../../store/hooks";
import { ColorIndicator } from "../../../ui/ColorIndicator/ColorIndicator";
import { Label } from "../../../ui/InputField/Label";
import { LabelText } from "../../../ui/InputField/LabelText";
import { Select, SelectItem } from "../../../ui/Select/Select";

type CueVoiceProps = {
  value: string;
  onChangeVoice: (voiceId: string) => void;
};

export const CueVoice = memo(function CueVoice({ value, onChangeVoice }: CueVoiceProps) {
  const voiceId = useId();

  const selectVoiceColorById = useMemo(makeSelectVoiceColorById, []);

  const voicesIdsAndNames = useAppSelector(selectVoicesIdsAndNames);
  const voiceColor = useAppSelector((state) => selectVoiceColorById(state, value));

  const displayColorIndicator = !!voiceColor;

  const handleVoiceChange = useCallback(
    (newVoiceId: string) => {
      onChangeVoice(newVoiceId);
    },
    [onChangeVoice]
  );

  return (
    <div className="flex flex-row items-center gap-2">
      <Label>
        <LabelText htmlFor={voiceId}>Voice</LabelText>
      </Label>
      <Select
        id={voiceId}
        value={value}
        placeholder="Select voice"
        decorator={displayColorIndicator ? <ColorIndicator color={voiceColor} /> : <></>}
        className="min-w-32"
        onChange={handleVoiceChange}
      >
        {voicesIdsAndNames.map(({ id, name }) => (
          <SelectItem key={id} value={id}>
            {name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
});
