import { PlusCircleSolid } from "iconoir-react";
import { memo, useCallback } from "react";
import { Voice as VoiceModel } from "../../../../model/transcription/voice.model";
import { selectActiveLanguages } from "../../../../store/features/language.slice";
import { addVoice, selectVoicesIds } from "../../../../store/features/voice.slice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { Button } from "../../../ui/Button/Button";
import { Typography } from "../../../ui/Typography/Typography";

import { Voice } from "./Voice";

const DEFAULT_VOICE_COLOR = "FFFFFF";

export const Voices = memo(function VoicesForm() {
  const dispatch = useAppDispatch();
  const languages = useAppSelector(selectActiveLanguages);
  const voicesIds = useAppSelector(selectVoicesIds);

  const handleAddVoice = useCallback(() => {
    const newVoice: VoiceModel = {
      name: `voice-${voicesIds.length + 1}`,
      id: crypto.randomUUID(),
      color: DEFAULT_VOICE_COLOR,
    };
    dispatch(addVoice(newVoice));
  }, [voicesIds, dispatch]);

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="flex items-center relative">
        <Typography variant="h2">Voices</Typography>
        <div className="absolute right-0">
          <Button onClick={handleAddVoice} prefix={<PlusCircleSolid width={20} height={20} />}>
            Add voice
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6 overflow-auto">
        {voicesIds.map((voiceId) => {
          return <Voice key={voiceId} voiceId={voiceId} languages={languages} />;
        })}
      </div>
    </div>
  );
});
