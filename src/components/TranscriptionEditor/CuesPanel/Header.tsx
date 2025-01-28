import { PlusCircleSolid } from "iconoir-react";
import { memo } from "react";
import { Cue, StringByLanguage } from "../../../model/TranscriptionModel";
import { formatDurationToISOTime } from "../../../utils/time.utils";
import { Button } from "../../ui/Button/Button";
import { Typography } from "../../ui/Typography/Typography";
import { useTranscriptionEditorContext, useTranscriptionEditorDispatch } from "../Context/useContext";
import { AVAILABLE_LANGUAGES } from "../Form/FormConstants";

export const Header = memo(function Header() {
  const {
    transcriptionForm: { cues },
    audioPlayer: { currentTimeRef },
  } = useTranscriptionEditorContext();
  const dispatch = useTranscriptionEditorDispatch();

  const handleAddCue = () => {
    const newCue: Cue = {
      key: crypto.randomUUID(),
      start: formatDurationToISOTime(currentTimeRef?.current ?? 0),
      end: formatDurationToISOTime((currentTimeRef?.current ?? 0) + 1),
      voice: "",
      text: AVAILABLE_LANGUAGES.reduce((acc, { key }) => {
        return {
          ...acc,
          [key]: "",
        };
      }, {} as StringByLanguage),
      note: AVAILABLE_LANGUAGES.reduce((acc, { key }) => {
        return {
          ...acc,
          [key]: "",
        };
      }, {} as StringByLanguage),
    };

    dispatch({
      type: "UPDATE_TRANSCRIPTION_CUES",
      payload: [...cues, newCue],
    });
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
