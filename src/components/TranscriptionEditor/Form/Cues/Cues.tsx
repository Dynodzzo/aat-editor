import { memo, useRef, useState } from "react";
import { useRequestAnimationFrame } from "../../../../hooks/useRequestAnimationFrame";
import { LanguageKey } from "../../../../model/TranscriptionModel";
import { formatISOTimeToDuration } from "../../../../utils/time.utils";
import { useTranscriptionEditorContext, useTranscriptionEditorDispatch } from "../../Context/useContext";
import { Cue } from "./Cue";

type CuesFormProps = {
  onPlaySprite?: (id?: string) => void;
};

export const CuesForm = memo(function CuesForm({ onPlaySprite }: CuesFormProps) {
  const {
    transcriptionForm: { languages, voices, cues },
    audioPlayer: { duration, currentTimeRef },
  } = useTranscriptionEditorContext();
  const dispatch = useTranscriptionEditorDispatch();
  const cuesContainersRefs = useRef<Record<string, HTMLDivElement>>({});
  const [playingCuesKeys, setPlayingCuesKeys] = useState<string[]>([]);

  useRequestAnimationFrame(() => {
    const currentTime = currentTimeRef?.current;

    if (currentTime && cues.length > 0) {
      const cuesBeingPlayed = cues.filter(({ start, end }) => {
        const isCueStartGreaterThanCurrentTime = formatISOTimeToDuration(start) <= currentTime;
        const isCueEndLessThanCurrentTime = formatISOTimeToDuration(end) >= currentTime;
        return isCueStartGreaterThanCurrentTime && isCueEndLessThanCurrentTime;
      });

      if (!cuesBeingPlayed.length) return setPlayingCuesKeys([]);

      const cuesKeysBeingPlayed = cuesBeingPlayed.map(({ key }) => key);

      if (playingCuesKeys.join() !== cuesKeysBeingPlayed.join()) {
        setPlayingCuesKeys(cuesKeysBeingPlayed);
        const lastCueBeingPlayed = cuesBeingPlayed.at(-1);

        if (lastCueBeingPlayed) {
          cuesContainersRefs.current[lastCueBeingPlayed.key].scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  });

  const handleCueStartChange = (start: string, cueKey: string) => {
    const newCues = cues.map((cue) => {
      if (cue.key === cueKey) {
        return {
          ...cue,
          start,
        };
      }

      return cue;
    });

    dispatch({ type: "UPDATE_TRANSCRIPTION_CUES", payload: newCues });
  };

  const handleCueEndChange = (end: string, cueKey: string) => {
    const newCues = cues.map((cue) => {
      if (cue.key === cueKey) {
        return {
          ...cue,
          end,
        };
      }

      return cue;
    });

    dispatch({ type: "UPDATE_TRANSCRIPTION_CUES", payload: newCues });
  };

  const handleCueVoiceChange = (voice: string, cueKey: string) => {
    const newCues = cues.map((cue) => {
      if (cue.key === cueKey) {
        return {
          ...cue,
          voice,
        };
      }

      return cue;
    });

    dispatch({ type: "UPDATE_TRANSCRIPTION_CUES", payload: newCues });
  };

  const handleCueTextChange = (text: string, cueKey: string, language: LanguageKey) => {
    const newCues = cues.map((cue) => {
      if (cue.key === cueKey) {
        return {
          ...cue,
          text: {
            ...cue.text,
            [language]: text,
          },
        };
      }

      return cue;
    });

    dispatch({ type: "UPDATE_TRANSCRIPTION_CUES", payload: newCues });
  };

  const handleCueNoteChange = (note: string, cueKey: string, language: LanguageKey) => {
    const newCues = cues.map((cue) => {
      if (cue.key === cueKey) {
        return {
          ...cue,
          note: {
            ...cue.note,
            [language]: note,
          },
        };
      }

      return cue;
    });

    dispatch({ type: "UPDATE_TRANSCRIPTION_CUES", payload: newCues });
  };

  const handleDeleteCue = (cueKey: string) => {
    dispatch({
      type: "UPDATE_TRANSCRIPTION_CUES",
      payload: cues.filter((cue) => cue.key !== cueKey),
    });
  };

  return (
    <div className="p-4 flex flex-col gap-4 overflow-auto">
      {cues.map((cue, index) => {
        const isCueBeingPlayed = playingCuesKeys.includes(cue.key);

        return (
          <div
            ref={(element) => {
              if (element) {
                cuesContainersRefs.current[cue.key] = element;
              }
            }}
            key={cue.key}
          >
            <Cue
              index={index.toString()}
              cue={cue}
              languages={languages}
              voices={voices}
              duration={duration}
              isPlaying={isCueBeingPlayed}
              onChangeVoice={handleCueVoiceChange}
              onChangeStart={handleCueStartChange}
              onChangeEnd={handleCueEndChange}
              onChangeText={handleCueTextChange}
              onChangeNote={handleCueNoteChange}
              onPlaySprite={(cueKey?: string) => {
                if (onPlaySprite) onPlaySprite(cueKey);
              }}
              onDelete={handleDeleteCue}
            />
          </div>
        );
      })}
    </div>
  );
});
