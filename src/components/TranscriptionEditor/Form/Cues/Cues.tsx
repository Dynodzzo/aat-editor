import { useRef, useState } from "react";
import { useRequestAnimationFrame } from "../../../../hooks/useRequestAnimationFrame";
import { Cue, LanguageKey, StringByLanguage } from "../../../../model/TranscriptionModel";
import { formatDurationToISOTime, formatISOTimeToDuration } from "../../../../utils/time.utils";
import { useTranscriptionEditorContext, useTranscriptionEditorDispatch } from "../../Context/useContext";
import { AVAILABLE_LANGUAGES } from "../FormConstants";

type CuesFormProps = {
  onPlaySprite?: (id?: string) => void;
};

export const CuesForm = ({ onPlaySprite }: CuesFormProps) => {
  const {
    transcriptionForm: { languages, voices, cues },
    audioPlayer: { duration, currentTimeRef },
  } = useTranscriptionEditorContext();
  const dispatch = useTranscriptionEditorDispatch();
  const cuesContainersRefs = useRef<Record<string, HTMLFieldSetElement>>({});
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

  const handleCueStartChange = (event: React.ChangeEvent<HTMLInputElement>, cueKey: string) => {
    const newCues = cues.map((cue) => {
      if (cue.key === cueKey) {
        return {
          ...cue,
          start: event.target.value,
        };
      }

      return cue;
    });

    dispatch({ type: "UPDATE_TRANSCRIPTION_CUES", payload: newCues });
  };

  const handleCueEndChange = (event: React.ChangeEvent<HTMLInputElement>, cueKey: string) => {
    const newCues = cues.map((cue) => {
      if (cue.key === cueKey) {
        return {
          ...cue,
          end: event.target.value,
        };
      }

      return cue;
    });

    dispatch({ type: "UPDATE_TRANSCRIPTION_CUES", payload: newCues });
  };

  const handleCueVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>, cueKey: string) => {
    const newCues = cues.map((cue) => {
      if (cue.key === cueKey) {
        return {
          ...cue,
          voice: event.target.value,
        };
      }

      return cue;
    });

    dispatch({ type: "UPDATE_TRANSCRIPTION_CUES", payload: newCues });
  };

  const handleCueTextChange = (event: React.ChangeEvent<HTMLInputElement>, cueKey: string, language: LanguageKey) => {
    const newCues = cues.map((cue) => {
      if (cue.key === cueKey) {
        return {
          ...cue,
          text: {
            ...cue.text,
            [language]: event.target.value,
          },
        };
      }

      return cue;
    });

    dispatch({ type: "UPDATE_TRANSCRIPTION_CUES", payload: newCues });
  };

  const handleCueNoteChange = (event: React.ChangeEvent<HTMLInputElement>, cueKey: string, language: LanguageKey) => {
    const newCues = cues.map((cue) => {
      if (cue.key === cueKey) {
        return {
          ...cue,
          note: {
            ...cue.note,
            [language]: event.target.value,
          },
        };
      }

      return cue;
    });

    dispatch({ type: "UPDATE_TRANSCRIPTION_CUES", payload: newCues });
  };

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

  const handleDeleteCue = (cueKey: string) => {
    dispatch({
      type: "UPDATE_TRANSCRIPTION_CUES",
      payload: cues.filter((cue) => cue.key !== cueKey),
    });
  };

  return (
    <fieldset>
      <legend>Cues</legend>

      {cues.map(({ key: cueKey, start, end, voice, text, note }, index) => {
        const isCueBeingPlayed = playingCuesKeys.includes(cueKey);

        return (
          <fieldset
            ref={(element) => {
              if (element) {
                cuesContainersRefs.current[cueKey] = element;
              }
            }}
            key={cueKey}
            style={{ border: isCueBeingPlayed ? "4px solid darkblue" : "inherit" }}
          >
            <legend>{index}</legend>
            <div className="inputWrapper">
              <label htmlFor={`cue-start-${cueKey}`}>
                Start
                <input
                  id={`cue-start-${cueKey}`}
                  type="time"
                  min={"00:00:00.000"}
                  max={duration ? formatDurationToISOTime(duration) : "00:00:00.000"}
                  step="0.001"
                  value={start}
                  onChange={(event) => handleCueStartChange(event, cueKey)}
                />
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor={`cue-end-${cueKey}`}>
                End
                <input
                  id={`cue-end-${cueKey}`}
                  type="time"
                  min={"00:00:00.000"}
                  max={duration ? formatDurationToISOTime(duration) : "00:00:00.000"}
                  step="0.001"
                  value={end}
                  onChange={(event) => handleCueEndChange(event, cueKey)}
                />
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor={`cue-voice-${cueKey}`}>
                Voice
                <select
                  id={`cue-voice-${cueKey}`}
                  value={voice}
                  onChange={(event) => handleCueVoiceChange(event, cueKey)}
                >
                  <option value="">Select a voice...</option>
                  {voices.map((currentVoice) => (
                    <option key={currentVoice.key} value={currentVoice.id}>
                      {currentVoice.id}
                    </option>
                  ))}
                </select>
              </label>
              <div
                className="voice-color"
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "10px",
                  backgroundColor: voices.find((voiceItem) => voiceItem.id === voice)?.color,
                }}
              ></div>
            </div>
            {AVAILABLE_LANGUAGES.map(({ key: langKey, name }) => {
              if (!languages.includes(langKey)) return null;
              return (
                <fieldset key={langKey}>
                  <legend>{name}</legend>
                  <div className="inputWrapper">
                    <label htmlFor={`cue-text-${cueKey}-${langKey}`}>
                      Text
                      <input
                        id={`cue-text-${cueKey}-${langKey}`}
                        value={text[langKey]}
                        onChange={(event) => handleCueTextChange(event, cueKey, langKey)}
                      />
                    </label>
                  </div>
                  <div className="inputWrapper">
                    <label htmlFor={`cue-note-${cueKey}-${langKey}`}>
                      Note
                      <input
                        id={`cue-note-${cueKey}-${langKey}`}
                        value={note?.[langKey]}
                        onChange={(event) => handleCueNoteChange(event, cueKey, langKey)}
                      />
                    </label>
                  </div>
                </fieldset>
              );
            })}
            <button type="button" onClick={() => onPlaySprite && onPlaySprite(cueKey)}>
              Listen
            </button>
            <button type="button" onClick={() => handleDeleteCue(cueKey)}>
              Delete
            </button>
          </fieldset>
        );
      })}

      <button type="button" disabled={languages.length === 0} onClick={handleAddCue}>
        Add cue
      </button>
    </fieldset>
  );
};
