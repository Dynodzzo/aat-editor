import clsx from "clsx";
import { PlaySolid, Trash } from "iconoir-react";
import { memo, useCallback, useId } from "react";
import { Cue as CueModel, LanguageKey, Voice } from "../../../../model/TranscriptionModel";
import { formatDurationToISOTime } from "../../../../utils/time.utils";
import { Button } from "../../../ui/Button/Button";
import { ColorIndicator } from "../../../ui/ColorIndicator/ColorIndicator";
import { Input } from "../../../ui/Input/Input";
import { InputField } from "../../../ui/InputField/InputField";
import { InputFieldInline } from "../../../ui/InputField/InputFieldInline";
import { Label } from "../../../ui/InputField/Label";
import { LabelInfo } from "../../../ui/InputField/LabelInfo";
import { LabelText } from "../../../ui/InputField/LabelText";
import { Select, SelectItem } from "../../../ui/Select/Select";
import { Typography } from "../../../ui/Typography/Typography";
import { AVAILABLE_LANGUAGES } from "../FormConstants";

type CueProps = {
  index: string;
  cue: CueModel;
  languages: LanguageKey[];
  voices: Voice[];
  duration?: number;
  isPlaying?: boolean;
  onChangeStart: (start: string, cueKey: string) => void;
  onChangeEnd: (end: string, cueKey: string) => void;
  onChangeVoice: (voiceId: string, cueKey: string) => void;
  onChangeText: (text: string, cueKey: string, language: LanguageKey) => void;
  onChangeNote: (note: string, cueKey: string, language: LanguageKey) => void;
  onPlaySprite: (cueKey?: string) => void;
  onDelete: (cueKey: string) => void;
};

export const Cue = memo(function Cue({
  index,
  cue,
  languages,
  voices,
  duration,
  isPlaying,
  onChangeStart,
  onChangeEnd,
  onChangeVoice,
  onChangeText,
  onChangeNote,
  onPlaySprite,
  onDelete,
}: CueProps) {
  const startId = useId();
  const endId = useId();
  const voiceId = useId();

  const handleChangeVoice = useCallback(
    (newVoiceId: string) => {
      onChangeVoice(newVoiceId, cue.key);
    },
    [onChangeVoice, cue]
  );

  const handleChangeStart = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeStart(event.target.value, cue.key);
    },
    [onChangeStart, cue]
  );

  const handleChangeEnd = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onChangeEnd(event.target.value, cue.key);
    },
    [onChangeEnd, cue]
  );

  const handleChangeText = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, language: LanguageKey) => {
      onChangeText(event.target.value, cue.key, language);
    },
    [onChangeText, cue]
  );

  const handleChangeNote = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, language: LanguageKey) => {
      onChangeNote(event.target.value, cue.key, language);
    },
    [onChangeNote, cue]
  );

  const voiceColor = voices.find((voiceItem) => voiceItem.id === cue.voice)?.color;

  return (
    <div
      className={clsx("px-6 py-4 flex flex-col gap-3 bg-zinc-50 rounded-sm", {
        "inset-ring-1 inset-ring-slate-500": isPlaying,
      })}
    >
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-4">
          <Typography variant="h3">#{index}</Typography>
          <div className="flex flex-row items-center gap-2">
            <Label>
              <LabelText htmlFor={voiceId}>Voice</LabelText>
            </Label>
            <Select
              id={voiceId}
              value={cue.voice}
              placeholder="Select a voice..."
              decorator={voiceColor ? <ColorIndicator color={voiceColor} /> : <></>}
              onChange={handleChangeVoice}
            >
              {voices.map((voice) => (
                <SelectItem key={voice.id} value={voice.id}>
                  {voice.id}
                </SelectItem>
              ))}
            </Select>
          </div>
          <InputFieldInline>
            <Label>
              <LabelText htmlFor={startId}>From</LabelText>
            </Label>
            <Input
              id={startId}
              type="time"
              value={cue.start}
              size="sm"
              min={"00:00:00.000"}
              max={duration ? formatDurationToISOTime(duration) : "00:00:00.000"}
              step="0.001"
              className="w-36"
              onChange={handleChangeStart}
            />
          </InputFieldInline>
          <InputFieldInline>
            <Label>
              <LabelText htmlFor={endId}>To</LabelText>
            </Label>
            <Input
              id={endId}
              type="time"
              value={cue.end}
              size="sm"
              min={"00:00:00.000"}
              max={duration ? formatDurationToISOTime(duration) : "00:00:00.000"}
              step="0.001"
              className="w-36"
              onChange={handleChangeEnd}
            />
          </InputFieldInline>
        </div>
        <div className="actions flex flex-row items-center">
          <Button
            variant="inline"
            style="secondary"
            onClick={() => onDelete(cue.key)}
            prefix={<Trash width={20} height={20} />}
          >
            Delete
          </Button>
          <Button
            variant="inline"
            style="primary"
            onClick={() => onPlaySprite(cue.key)}
            prefix={<PlaySolid width={20} height={20} />}
          >
            Listen
          </Button>
        </div>
      </div>
      <div className="transcripts flex flex-col gap-3">
        {AVAILABLE_LANGUAGES.map(({ key: langKey, name }) => {
          if (!languages.includes(langKey)) return null;
          return (
            <div key={langKey} className="transcript-lang grid grid-cols-2 gap-4 items-end">
              <InputField>
                <Label>
                  <LabelText htmlFor={`cue-text-${cue.key}-${langKey}`}>{name}</LabelText>
                  <LabelInfo>Transcript</LabelInfo>
                </Label>
                <Input
                  id={`cue-text-${cue.key}-${langKey}`}
                  value={cue.text[langKey]!}
                  onChange={(event) => handleChangeText(event, langKey)}
                />
              </InputField>
              <InputField>
                <Label>
                  <LabelText></LabelText>
                  <LabelInfo>Notes</LabelInfo>
                </Label>
                <Input
                  id={`cue-note-${cue.key}-${langKey}`}
                  value={cue.note?.[langKey] ?? ""}
                  onChange={(event) => handleChangeNote(event, langKey)}
                />
              </InputField>
            </div>
          );
        })}
      </div>
    </div>
  );
});
