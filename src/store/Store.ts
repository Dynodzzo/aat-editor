import { configureStore } from "@reduxjs/toolkit";
import audioSlice from "./features/audio.slice";
import cueTranslationSlice from "./features/cue-translation.slice";
import cueSlice from "./features/cue.slice";
import languageSlice from "./features/language.slice";
import metadataSlice from "./features/metadata.slice";
import voiceTranslationSlice from "./features/voice-translation.slice";
import voiceSlice from "./features/voice.slice";

export const store = configureStore({
  reducer: {
    voices: voiceSlice.reducer,
    voiceTranslations: voiceTranslationSlice.reducer,
    cues: cueSlice.reducer,
    cueTranslations: cueTranslationSlice.reducer,
    languages: languageSlice.reducer,
    metadata: metadataSlice.reducer,
    audio: audioSlice.reducer,
  },
  devTools: true,
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
