import { Cue, LanguageKey, StringByLanguage } from "../../../model/TranscriptionModel";
import { formatTime } from "../../../utils/time.utils";
import { AVAILABLE_LANGUAGES } from "../TranscriptionFormConstants";
import {
  useTranscriptionForm,
  useTranscriptionFormDispatch,
} from "../TranscriptionFormContext/TranscriptionFormContext";

type CuesFormProps = {};

export const CuesForm = ({}: CuesFormProps) => {
  const { duration, languages, voices, cues } = useTranscriptionForm();
  const dispatch = useTranscriptionFormDispatch();

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

    dispatch({ type: "UPDATE_CUES", payload: newCues });
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

    dispatch({ type: "UPDATE_CUES", payload: newCues });
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

    dispatch({ type: "UPDATE_CUES", payload: newCues });
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

    dispatch({ type: "UPDATE_CUES", payload: newCues });
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

    dispatch({ type: "UPDATE_CUES", payload: newCues });
  };

  const handleAddCue = () => {
    const newCue: Cue = {
      key: crypto.randomUUID(),
      start: "00:00:00",
      end: "00:00:00",
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
      type: "UPDATE_CUES",
      payload: [...cues, newCue],
    });
  };

  return (
    <fieldset>
      <legend>Cues</legend>

      {cues.map(({ key: cueKey, start, end, voice, text, note }, index) => (
        <fieldset key={cueKey}>
          <legend>{index}</legend>
          <div className="inputWrapper">
            <label htmlFor={`cue-start-${cueKey}`}>
              Start
              <input
                id={`cue-start-${cueKey}`}
                type="time"
                min={"00:00:00"}
                max={duration ? formatTime(duration) : "00:00:00"}
                step="1"
                value={start}
                onChange={(event) => handleCueStartChange(event, cueKey)}
              />
            </label>
          </div>
          <div className="inputWrapper">
            <label htmlFor={`cue-end-${cueKey}`}>
              Start
              <input
                id={`cue-end-${cueKey}`}
                type="time"
                min={"00:00:00"}
                max={duration ? formatTime(duration) : "00:00:00"}
                step="1"
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
          </div>
          {AVAILABLE_LANGUAGES.map(({ key: langKey, name }) => {
            if (!languages.includes(langKey)) return null;
            return (
              <fieldset key={langKey}>
                <legend>{name}</legend>
                <div className="inputWrapper">
                  <label htmlFor={`cue-text-${cueKey}`}>
                    Text
                    <input
                      id={`cue-text-${cueKey}`}
                      value={text[langKey]}
                      onChange={(event) => handleCueTextChange(event, cueKey, langKey)}
                    />
                  </label>
                </div>
                <div className="inputWrapper">
                  <label htmlFor={`cue-note-${cueKey}`}>
                    Note
                    <input
                      id={`cue-note-${cueKey}`}
                      value={note?.[langKey]}
                      onChange={(event) => handleCueNoteChange(event, cueKey, langKey)}
                    />
                  </label>
                </div>
              </fieldset>
            );
          })}
        </fieldset>
      ))}

      <button type="button" disabled={languages.length === 0} onClick={handleAddCue}>
        Add cue
      </button>
    </fieldset>
  );
};
