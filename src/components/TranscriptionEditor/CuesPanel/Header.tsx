import { PlusCircleSolid } from "iconoir-react";
import { memo, useContext } from "react";
import { AudioContext } from "../../../context/audio.context";
import { Cue } from "../../../model/transcription/cue.model";
import { addCue } from "../../../store/features/cue.slice";
import { useAppDispatch } from "../../../store/hooks";
import { formatDurationToISOTime } from "../../../utils/time.utils";
import { Button } from "../../ui/Button/Button";
import { Typography } from "../../ui/Typography/Typography";

export const Header = memo(function Header() {
  const dispatch = useAppDispatch();
  const { currentTimeRef } = useContext(AudioContext);

  const handleAddCue = () => {
    const newCue: Cue = {
      id: crypto.randomUUID(),
      voiceId: "",
      start: formatDurationToISOTime(currentTimeRef.current),
      end: formatDurationToISOTime(currentTimeRef.current + 1),
    };

    dispatch(addCue(newCue));
  };

  return (
    <div className="bg-zinc-50 px-6 py-5">
      <div className="flex flex-row items-center relative w-full">
        <Typography variant="h2">Editor</Typography>
        <div className="absolute right-0">
          <Button onClick={handleAddCue} prefix={<PlusCircleSolid width={20} height={20} />}>
            Add cue
          </Button>
        </div>
      </div>
    </div>
  );
});
