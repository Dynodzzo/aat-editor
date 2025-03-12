import { VisuallyHidden } from "radix-ui";
import { memo, useCallback, useId, useMemo } from "react";
import { makeSelectVoiceColorById, selectVoicesIdsAndNames } from "../../../../store/features/voice.slice";
import { useAppSelector } from "../../../../store/hooks";
import { ChipTrigger } from "../../../ui/Select/ChipTrigger";
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

  const handleVoiceChange = useCallback(
    (newVoiceId: string) => {
      onChangeVoice(newVoiceId);
    },
    [onChangeVoice]
  );

  return (
    <div className="flex flex-row items-center gap-2">
      <VisuallyHidden.Root>
        <label htmlFor={voiceId}>Voice</label>
      </VisuallyHidden.Root>
      <Select
        value={value}
        trigger={<ChipTrigger id={voiceId} placeholder="Select voice" color={voiceColor} />}
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
