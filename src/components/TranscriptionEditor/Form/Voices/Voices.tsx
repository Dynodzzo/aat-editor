import { PlusCircleSolid } from "iconoir-react";
import { memo, useCallback } from "react";
import { LanguageKey, Voice as VoiceModel, StringByLanguage } from "../../../../model/TranscriptionModel";
import { Button } from "../../../ui/Button/Button";
import { Typography } from "../../../ui/Typography/Typography";
import { useTranscriptionEditorContext, useTranscriptionEditorDispatch } from "../../Context/useContext";
import { AVAILABLE_LANGUAGES, DEFAULT_VOICE_COLOR } from "../FormConstants";
import { Voice } from "./Voice";

export const VoicesForm = memo(function VoicesForm() {
  const {
    transcriptionForm: { languages, voices, cues },
  } = useTranscriptionEditorContext();
  const dispatch = useTranscriptionEditorDispatch();

  const handleVoiceIdChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, voiceKey: string, voiceId: string) => {
      const newVoices = voices.map((voice) => {
        if (voice.key === voiceKey) {
          return {
            ...voice,
            id: event.target.value,
          };
        }

        return voice;
      });

      const updatedCues = cues.map((cue) => {
        if (cue.voice === voiceId) {
          return {
            ...cue,
            voice: event.target.value,
          };
        }

        return cue;
      });

      dispatch({ type: "UPDATE_TRANSCRIPTION_VOICES", payload: newVoices });
      dispatch({ type: "UPDATE_TRANSCRIPTION_CUES", payload: updatedCues });
    },
    [voices, cues, dispatch]
  );

  const handleVoiceColorChange = useCallback(
    (color: string, voiceKey: string) => {
      const newVoices = voices.map((voice) => {
        if (voice.key === voiceKey) {
          return {
            ...voice,
            color,
          };
        }

        return voice;
      });

      dispatch({ type: "UPDATE_TRANSCRIPTION_VOICES", payload: newVoices });
    },
    [voices, dispatch]
  );

  const handleVoiceNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, voiceKey: string, language: LanguageKey) => {
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

      dispatch({ type: "UPDATE_TRANSCRIPTION_VOICES", payload: newVoices });
    },
    [voices, dispatch]
  );

  const handleAddVoice = useCallback(() => {
    const newVoice: VoiceModel = {
      id: `voice-${voices.length + 1}`,
      key: crypto.randomUUID(),
      color: DEFAULT_VOICE_COLOR,
      name: AVAILABLE_LANGUAGES.reduce((languages, { key }) => {
        languages[key] = `Voice ${voices.length + 1}`;
        return languages;
      }, {} as StringByLanguage),
    };
    dispatch({ type: "UPDATE_TRANSCRIPTION_VOICES", payload: [...voices, newVoice] });
  }, [voices, dispatch]);

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center relative">
        <Typography variant="h2">Voices</Typography>
        <div className="absolute right-0">
          <Button onClick={handleAddVoice} prefix={<PlusCircleSolid width={20} height={20} />}>
            Add voice
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {voices.map((voice) => {
          return (
            <Voice
              key={voice.key}
              voice={voice}
              languages={languages}
              onChangeId={handleVoiceIdChange}
              onChangeColor={handleVoiceColorChange}
              onChangeName={handleVoiceNameChange}
            />
          );
        })}
      </div>
    </div>
  );
});
