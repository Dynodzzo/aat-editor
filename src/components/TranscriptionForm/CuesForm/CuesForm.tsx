import { Cue, CuesByLanguage, LanguageKey } from "../../../model/TranscriptionModel";
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

  const handleCueStartChange = (event: React.ChangeEvent<HTMLInputElement>, cueKey: string, language: LanguageKey) => {
    const newCues = {
      ...cues,
      [language]: cues[language]?.map((cue) => {
        if (cue.key === cueKey) {
          return {
            ...cue,
            start: event.target.value,
          };
        }

        return cue;
      }),
    };

    dispatch({ type: "UPDATE_CUES", payload: newCues });
  };

  const handleCueEndChange = (event: React.ChangeEvent<HTMLInputElement>, cueKey: string, language: LanguageKey) => {
    const newCues = {
      ...cues,
      [language]: cues[language]?.map((cue) => {
        if (cue.key === cueKey) {
          return {
            ...cue,
            end: event.target.value,
          };
        }

        return cue;
      }),
    };

    dispatch({ type: "UPDATE_CUES", payload: newCues });
  };

  const handleCueVoiceChange = (event: React.ChangeEvent<HTMLSelectElement>, cueKey: string, language: LanguageKey) => {
    const newCues = {
      ...cues,
      [language]: cues[language]?.map((cue) => {
        if (cue.key === cueKey) {
          return {
            ...cue,
            voice: event.target.value,
          };
        }

        return cue;
      }),
    };

    dispatch({ type: "UPDATE_CUES", payload: newCues });
  };

  const handleCueTextChange = (event: React.ChangeEvent<HTMLInputElement>, cueKey: string, language: LanguageKey) => {
    const newCues = {
      ...cues,
      [language]: cues[language]?.map((cue) => {
        if (cue.key === cueKey) {
          return {
            ...cue,
            text: event.target.value,
          };
        }

        return cue;
      }),
    };

    dispatch({ type: "UPDATE_CUES", payload: newCues });
  };

  const handleCueNoteChange = (event: React.ChangeEvent<HTMLInputElement>, cueKey: string, language: LanguageKey) => {
    const newCues = {
      ...cues,
      [language]: cues[language]?.map((cue) => {
        if (cue.key === cueKey) {
          return {
            ...cue,
            note: event.target.value,
          };
        }

        return cue;
      }),
    };

    dispatch({ type: "UPDATE_CUES", payload: newCues });
  };

  const handleAddCue = () => {
    const newCue: Cue = {
      key: crypto.randomUUID(),
      start: "00:00:00",
      end: "00:00:00",
      voice: "",
      text: "",
    };

    dispatch({
      type: "UPDATE_CUES",
      payload: AVAILABLE_LANGUAGES.reduce((languages, { key }) => {
        languages[key] = [...cues[key], newCue];
        return languages;
      }, {} as CuesByLanguage),
    });
  };

  return (
    <fieldset>
      <legend>Cues</legend>
      {languages.length > 0 &&
        AVAILABLE_LANGUAGES.map(({ key: langKey, name }) => {
          if (!languages.includes(langKey)) return null;
          if (!cues[langKey]?.length) return null;

          return (
            <fieldset key={langKey}>
              <legend>{name}</legend>
              {cues[langKey]?.map(({ key: cueKey, start, end, voice, text, note }) => (
                <div key={cueKey} className="inputWrapper">
                  <label htmlFor={`cue-start-${cueKey}`}>
                    Start
                    <input
                      id={`cue-start-${cueKey}`}
                      type="time"
                      min={"00:00:00"}
                      max={duration ? formatTime(duration) : "00:00:00"}
                      step="1"
                      value={start}
                      onChange={(event) => handleCueStartChange(event, cueKey, langKey)}
                    />
                  </label>
                  <label htmlFor={`cue-end-${cueKey}`}>
                    End
                    <input
                      id={`cue-end-${cueKey}`}
                      type="time"
                      min={"00:00:00"}
                      max={duration ? formatTime(duration) : "00:00:00"}
                      step="1"
                      value={end}
                      onChange={(event) => handleCueEndChange(event, cueKey, langKey)}
                    />
                  </label>
                  <label htmlFor={`cue-voice-${cueKey}`}>
                    Voice
                    <select
                      id={`cue-voice-${cueKey}`}
                      value={voice}
                      onChange={(event) => handleCueVoiceChange(event, cueKey, langKey)}
                    >
                      <option value="">Select a voice...</option>
                      {voices.map((currentVoice) => (
                        <option key={currentVoice.key} value={currentVoice.id}>
                          {currentVoice.name[langKey]}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label htmlFor={`cue-text-${cueKey}`}>
                    Text
                    <input
                      id={`cue-text-${cueKey}`}
                      value={text}
                      onChange={(event) => handleCueTextChange(event, cueKey, langKey)}
                    />
                  </label>
                  <label htmlFor={`cue-note-${cueKey}`}>
                    Note
                    <input
                      id={`cue-note-${cueKey}`}
                      value={note}
                      onChange={(event) => handleCueNoteChange(event, cueKey, langKey)}
                    />
                  </label>
                </div>
              ))}
            </fieldset>
          );
        })}

      <button type="button" disabled={languages.length === 0} onClick={handleAddCue}>
        Add cue
      </button>
    </fieldset>
  );
};
