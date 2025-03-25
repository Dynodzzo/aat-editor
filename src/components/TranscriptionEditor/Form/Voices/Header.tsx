import { Plus } from "iconoir-react";
import { useCallback } from "react";
import { Voice } from "../../../../model/transcription/voice.model";
import { addVoice } from "../../../../store/features/voice.slice";
import { useAppDispatch } from "../../../../store/hooks";
import { Button } from "../../../ui/Button/Button";

const DEFAULT_VOICE_COLOR = "#FFFFFF";

type HeaderProps = {
  voicesCount: number;
};

export const Header = ({ voicesCount }: HeaderProps) => {
  const dispatch = useAppDispatch();

  const handleAddVoice = useCallback(() => {
    const newVoice: Voice = {
      name: `voice-${voicesCount + 1}`,
      id: crypto.randomUUID(),
      color: DEFAULT_VOICE_COLOR,
    };
    dispatch(addVoice(newVoice));
  }, [voicesCount, dispatch]);

  return (
    <div className="header flex flex-row items-center justify-between mt-[-8px]">
      <h2 className="text-xs font-semibold">
        {voicesCount} voice{voicesCount !== 1 && "s"}
      </h2>
      <Button onClick={handleAddVoice} prefix={<Plus width={16} height={16} />}>
        Add voice
      </Button>
    </div>
  );
};
