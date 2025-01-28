import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cue, LanguageKey, TranscriptionState, Voice } from "../../model/TranscriptionModel";
import { RootState } from "../../store/store";

const initialState: TranscriptionState = {
  title: "",
  author: "",
  languages: [],
  voices: [],
  cues: [],
};

export const transcriptionEditorSlice = createSlice({
  name: "transcriptionEditor",
  initialState,
  reducers: {
    updateTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateAuthor: (state, action: PayloadAction<string>) => {
      state.author = action.payload;
    },
    addLanguage: (state, action: PayloadAction<LanguageKey>) => {
      state.languages.push(action.payload);
    },
    removeLanguage: (state, action: PayloadAction<LanguageKey>) => {
      state.languages = state.languages.filter((lang) => lang !== action.payload);
    },
    addVoice: (state, action: PayloadAction<Voice>) => {
      state.voices.push({ ...action.payload });
    },
    updateVoiceColor: (state, action: PayloadAction<{ voiceKey: string; color: string }>) => {
      const { voiceKey, color } = action.payload;
      const voice = state.voices.find((currentVoice) => currentVoice.key === voiceKey);
      if (voice) voice.color = color;
    },
    updateVoiceId: (state, action: PayloadAction<{ voiceKey: string; voiceId: string }>) => {
      const { voiceKey, voiceId } = action.payload;
      const voice = state.voices.find((currentVoice) => currentVoice.key === voiceKey);

      if (voice) {
        state.cues = state.cues.map((cue) => {
          if (cue.voice === voice.id) {
            cue.voice = voiceId;
          }

          return cue;
        });

        voice.id = voiceId;
      }
    },
    updateVoiceName: (state, action: PayloadAction<{ voiceKey: string; languageKey: LanguageKey; name: string }>) => {
      const { voiceKey, languageKey, name } = action.payload;
      const voice = state.voices.find((currentVoice) => currentVoice.key === voiceKey);
      if (voice) voice.name[languageKey] = name;
    },
    addCue: (state, action: PayloadAction<Cue>) => {
      state.cues.push({ ...action.payload });
    },
    deleteCue: (state, action: PayloadAction<string>) => {
      state.cues = state.cues.filter((cue) => cue.key !== action.payload);
    },
    updateCueStart: (state, action: PayloadAction<{ cueKey: string; start: string }>) => {
      const { cueKey, start } = action.payload;
      const cue = state.cues.find((currentCue) => currentCue.key === cueKey);
      if (cue) cue.start = start;
    },
    updateCueEnd: (state, action: PayloadAction<{ cueKey: string; end: string }>) => {
      const { cueKey, end } = action.payload;
      const cue = state.cues.find((currentCue) => currentCue.key === cueKey);
      if (cue) cue.end = end;
    },
    updateCueVoice: (state, action: PayloadAction<{ cueKey: string; voiceId: string }>) => {
      const { cueKey, voiceId } = action.payload;
      const cue = state.cues.find((currentCue) => currentCue.key === cueKey);
      if (cue) cue.voice = voiceId;
    },
    updateCueText: (state, action: PayloadAction<{ cueKey: string; languageKey: LanguageKey; text: string }>) => {
      const { cueKey, languageKey, text } = action.payload;
      const cue = state.cues.find((currentCue) => currentCue.key === cueKey);
      if (cue) cue.text[languageKey] = text;
    },
    updateCueNote: (state, action: PayloadAction<{ cueKey: string; languageKey: LanguageKey; note: string }>) => {
      const { cueKey, languageKey, note } = action.payload;
      const cue = state.cues.find((currentCue) => currentCue.key === cueKey);
      if (cue) cue.note![languageKey] = note;
    },
  },
});

export const {
  updateTitle,
  updateAuthor,
  addLanguage,
  removeLanguage,
  addVoice,
  updateVoiceId,
  updateVoiceColor,
  updateVoiceName,
  updateCueStart,
  updateCueEnd,
  updateCueVoice,
  updateCueText,
  updateCueNote,
} = transcriptionEditorSlice.actions;

export const selectTitle = (state: RootState) => state.transcriptionEditor.title;
export const selectAuthor = (state: RootState) => state.transcriptionEditor.author;
export const selectLanguages = (state: RootState) => state.transcriptionEditor.languages;
export const selectVoices = (state: RootState) => state.transcriptionEditor.voices;
export const selectCues = (state: RootState) => state.transcriptionEditor.cues;

export default transcriptionEditorSlice.reducer;
