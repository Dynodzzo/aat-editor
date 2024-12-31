import { AVAILABLE_LANGUAGES, DEFAULT_VOICE_COLOR } from "../TranscriptionFormConstants";
import {
  useTranscriptionForm,
  useTranscriptionFormDispatch,
} from "../TranscriptionFormContext/TranscriptionFormContext";
import { CuesByLanguage, LanguageKey, Voice, VoiceNameByLanguage } from "../TranscriptionFormModel";

export const VoicesForm = () => {
  const { languages, voices, cues } = useTranscriptionForm();
  const dispatch = useTranscriptionFormDispatch();

  const handleVoiceIdChange = (event: React.ChangeEvent<HTMLInputElement>, voiceKey: string) => {
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
      updatedCues[langKey as LanguageKey] = cues[langKey as LanguageKey]?.map((cue) => {
        const voice = voices.find((currentVoice) => currentVoice.key === voiceKey);
        if (cue.voice === voice?.id) {
          return {
            ...cue,
            voice: event.target.value,
          };
        }
        return cue;
      });
      return updatedCues;
    }, {} as CuesByLanguage);

    dispatch({ type: "UPDATE_VOICES", payload: newVoices });
    dispatch({ type: "UPDATE_CUES", payload: updatedCues });
  };

  const handleVoiceColorChange = (event: React.ChangeEvent<HTMLInputElement>, voiceKey: string) => {
    const newVoices = voices.map((voice) => {
      if (voice.key === voiceKey) {
        return {
          ...voice,
          color: event.target.value,
        };
      }

      return voice;
    });

    dispatch({ type: "UPDATE_VOICES", payload: newVoices });
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

    dispatch({ type: "UPDATE_VOICES", payload: newVoices });
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
    dispatch({ type: "UPDATE_VOICES", payload: [...voices, newVoice] });
  };

  return (
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
                    onChange={(event) => handleVoiceIdChange(event, voice.key)}
                  />
                </label>
                <div className="inputWrapper">
                  <label htmlFor={voiceColorId}>
                    Color
                    <input
                      id={voiceColorId}
                      type="color"
                      value={voice.color}
                      onChange={(event) => handleVoiceColorChange(event, voice.key)}
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
                              onChange={(event) => handleVoiceNameChange(event, voice.key, langKey)}
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
  );
};
