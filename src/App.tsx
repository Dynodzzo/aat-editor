import { useRef, useState } from "react";
import { formatTime } from "./utils/time.utils";

type LanguageKey = "fr" | "en";

type Language = {
  key: LanguageKey;
  name: string;
};

type VoiceNameByLanguage = {
  [key in LanguageKey]?: string;
};

type Voice = {
  key: string;
  id: string;
  color: string;
  name: VoiceNameByLanguage;
};

type Cue = {
  key: string;
  start: string;
  end: string;
  voice: string;
  text: string;
  note?: string;
};

type CuesByLanguage = {
  [key in LanguageKey]: Cue[];
};

const AVAILABLE_LANGUAGES: Language[] = [
  {
    key: "fr",
    name: "Français",
  },
  {
    key: "en",
    name: "English",
  },
];

const DEFAULT_VOICE_COLOR = "#FFFFFF";

const INITIAL_CUES: CuesByLanguage = AVAILABLE_LANGUAGES.reduce(
  (languages, { key }) => {
    languages[key] = [];
    return languages;
  },
  {} as CuesByLanguage
);

function App() {
  const [audioObjectURL, setAudioObjectURL] = useState<string>("");
  const audioRef = useRef<HTMLAudioElement>(null);

  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [languages, setLanguages] = useState<LanguageKey[]>([]);
  const [voices, setVoices] = useState<Voice[]>([]);
  const [cues, setCues] = useState<CuesByLanguage>(INITIAL_CUES);

  const handleAudioFileChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const audioFile = event.target.files?.[0];
    if (!audioFile) return;

    if (audioObjectURL) URL.revokeObjectURL(audioObjectURL);
    const currentAudioObjectURL = URL.createObjectURL(audioFile);
    setAudioObjectURL(currentAudioObjectURL);

    if (audioRef?.current) {
      audioRef.current.src = currentAudioObjectURL;
    }
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };

  const handleChangeLanguages = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const language = event.target.id as LanguageKey;

    if (languages.includes(language)) {
      setLanguages(languages.filter((lang) => lang !== language));
    } else {
      setLanguages([...languages, language]);
    }
  };

  const handleVoiceIdChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    voiceKey: string
  ) => {
    const newVoices = voices.map((voice) => {
      if (voice.key === voiceKey) {
        return {
          ...voice,
          id: event.target.value,
        };
      }

      return voice;
    });

    const updatedCues = Object.keys(cues).reduce((updatedCues, langKey) => {
      updatedCues[langKey as LanguageKey] = cues[langKey as LanguageKey]?.map(
        (cue) => {
          const voice = voices.find(
            (currentVoice) => currentVoice.key === voiceKey
          );
          if (cue.voice === voice?.id) {
            return {
              ...cue,
              voice: event.target.value,
            };
          }
          return cue;
        }
      );
      return updatedCues;
    }, {} as CuesByLanguage);

    setVoices(newVoices);
    setCues(updatedCues);
  };

  const handleVoiceColorChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    voiceKey: string
  ) => {
    const newVoices = voices.map((voice) => {
      if (voice.key === voiceKey) {
        return {
          ...voice,
          color: event.target.value,
        };
      }

      return voice;
    });

    setVoices(newVoices);
  };

  const handleVoiceNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    voiceKey: string,
    language: LanguageKey
  ) => {
    const newVoices = voices.map((voice) => {
      if (voice.key === voiceKey) {
        return {
          ...voice,
          name: {
            ...voice.name,
            [language]: event.target.value,
          },
        };
      }

      return voice;
    });

    setVoices(newVoices);
  };

  const handleCueStartChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    cueKey: string,
    language: LanguageKey
  ) => {
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

    setCues(newCues);
  };

  const handleCueEndChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    cueKey: string,
    language: LanguageKey
  ) => {
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

    setCues(newCues);
  };

  const handleCueVoiceChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    cueKey: string,
    language: LanguageKey
  ) => {
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

    setCues(newCues);
  };

  const handleCueTextChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    cueKey: string,
    language: LanguageKey
  ) => {
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

    setCues(newCues);
  };

  const handleCueNoteChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    cueKey: string,
    language: LanguageKey
  ) => {
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

    setCues(newCues);
  };

  const handleAddVoice = () => {
    const newVoice: Voice = {
      id: `voice-${voices.length + 1}`,
      key: crypto.randomUUID(),
      color: DEFAULT_VOICE_COLOR,
      name: AVAILABLE_LANGUAGES.reduce((languages, { key }) => {
        languages[key] = `Voice ${voices.length + 1}`;
        return languages;
      }, {} as VoiceNameByLanguage),
    };
    setVoices([...voices, newVoice]);
  };

  const handleAddCue = () => {
    const newCue: Cue = {
      key: crypto.randomUUID(),
      start: "00:00:00",
      end: "00:00:00",
      voice: "",
      text: "",
    };

    setCues(
      AVAILABLE_LANGUAGES.reduce((languages, { key }) => {
        languages[key] = [...cues[key], newCue];
        return languages;
      }, {} as CuesByLanguage)
    );
  };

  return (
    <>
      <input type="file" accept="audio/*" onChange={handleAudioFileChanged} />
      <audio controls ref={audioRef}></audio>
      <form onSubmit={handleFormSubmit}>
        <fieldset>
          <legend>Metadata</legend>
          <div className="inputWrapper">
            <label htmlFor="title">
              Title
              <input
                id="title"
                type="text"
                value={title}
                onChange={handleTitleChange}
              />
            </label>
          </div>
          <div className="inputWrapper">
            <label htmlFor="author">
              Author
              <input
                id="author"
                type="text"
                value={author}
                onChange={handleAuthorChange}
              />
            </label>
          </div>
        </fieldset>
        <fieldset>
          <legend>Languages</legend>
          <div className="inputWrapper">
            {AVAILABLE_LANGUAGES.map(({ key, name }) => (
              <label key={key} htmlFor={key}>
                {name}
                <input
                  id={key}
                  type="checkbox"
                  checked={languages.includes(key)}
                  onChange={handleChangeLanguages}
                />
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Voices</legend>
          {voices.map((voice, index) => {
            const voiceId = `voice-id-${voice.id}`;
            const voiceColorId = `voice-color-id-${voice.id}`;

            return (
              <fieldset key={voice.key}>
                <legend>Voice {index + 1}</legend>

                <div key={index} className="voiceWrapper">
                  <div className="inputWrapper">
                    <label htmlFor={voiceId}>
                      ID
                      <input
                        id={voiceId}
                        type="text"
                        value={voice.id}
                        onChange={(event) =>
                          handleVoiceIdChange(event, voice.key)
                        }
                      />
                    </label>
                    <div className="inputWrapper">
                      <label htmlFor={voiceColorId}>
                        Color
                        <input
                          id={voiceColorId}
                          type="color"
                          value={voice.color}
                          onChange={(event) =>
                            handleVoiceColorChange(event, voice.key)
                          }
                        />
                      </label>
                    </div>
                    {languages.length > 0 && (
                      <fieldset>
                        <legend>Voice name</legend>
                        {AVAILABLE_LANGUAGES.map(({ key: langKey, name }) => {
                          if (!languages.includes(langKey)) return null;

                          const voiceNameId = `voice-name-${voice.id}-${langKey}`;

                          return (
                            <div key={langKey} className="inputWrapper">
                              <label htmlFor={voiceNameId}>
                                {name}
                                <input
                                  id={voiceNameId}
                                  type="text"
                                  value={voice.name[langKey]}
                                  onChange={(event) =>
                                    handleVoiceNameChange(
                                      event,
                                      voice.key,
                                      langKey
                                    )
                                  }
                                />
                              </label>
                            </div>
                          );
                        })}
                      </fieldset>
                    )}
                  </div>
                </div>
              </fieldset>
            );
          })}
          <button type="button" onClick={handleAddVoice}>
            Add voice
          </button>
        </fieldset>
        <fieldset>
          <legend>Cues</legend>
          {languages.length > 0 &&
            AVAILABLE_LANGUAGES.map(({ key: langKey, name }) => {
              if (!languages.includes(langKey)) return null;
              if (!cues[langKey]?.length) return null;

              return (
                <fieldset key={langKey}>
                  <legend>{name}</legend>
                  {cues[langKey]?.map(
                    ({ key: cueKey, start, end, voice, text, note }) => (
                      <div key={cueKey} className="inputWrapper">
                        <label htmlFor={`cue-start-${cueKey}`}>
                          Start
                          <input
                            id={`cue-start-${cueKey}`}
                            type="time"
                            min={"00:00:00"}
                            max={
                              audioRef.current
                                ? formatTime(audioRef.current.duration)
                                : "00:00:00"
                            }
                            step="1"
                            value={start}
                            onChange={(event) =>
                              handleCueStartChange(event, cueKey, langKey)
                            }
                          />
                        </label>
                        <label htmlFor={`cue-end-${cueKey}`}>
                          End
                          <input
                            id={`cue-end-${cueKey}`}
                            type="time"
                            min={"00:00:00"}
                            max={
                              audioRef.current
                                ? formatTime(audioRef.current.duration)
                                : "00:00:00"
                            }
                            step="1"
                            value={end}
                            onChange={(event) =>
                              handleCueEndChange(event, cueKey, langKey)
                            }
                          />
                        </label>
                        <label htmlFor={`cue-voice-${cueKey}`}>
                          Voice
                          <select
                            id={`cue-voice-${cueKey}`}
                            value={voice}
                            onChange={(event) =>
                              handleCueVoiceChange(event, cueKey, langKey)
                            }
                          >
                            <option value="">Select a voice...</option>
                            {voices.map((currentVoice) => (
                              <option
                                key={currentVoice.key}
                                value={currentVoice.id}
                              >
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
                            onChange={(event) =>
                              handleCueTextChange(event, cueKey, langKey)
                            }
                          />
                        </label>
                        <label htmlFor={`cue-note-${cueKey}`}>
                          Note
                          <input
                            id={`cue-note-${cueKey}`}
                            value={note}
                            onChange={(event) =>
                              handleCueNoteChange(event, cueKey, langKey)
                            }
                          />
                        </label>
                      </div>
                    )
                  )}
                </fieldset>
              );
            })}

          <button
            type="button"
            disabled={languages.length === 0}
            onClick={handleAddCue}
          >
            Add cue
          </button>
        </fieldset>
      </form>
      <pre>{JSON.stringify(cues, null, 2)}</pre>
    </>
  );
}

export default App;
