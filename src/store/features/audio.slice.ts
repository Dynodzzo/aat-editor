import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AudioState } from "../../model/audio.model";

const initialState: AudioState = {
  duration: 0,
  source: "",
};

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    updateDuration: (state: AudioState, action: PayloadAction<number>) => {
      state.duration = action.payload;
    },
    updateSource: (state: AudioState, action: PayloadAction<string>) => {
      state.source = action.payload;
    },
  },
  selectors: {
    selectDuration: (state: AudioState) => state.duration,
    selectSource: (state: AudioState) => state.source,
  },
});

export default audioSlice;

export const { selectDuration: selectAudioDuration, selectSource: selectAudioSource } = audioSlice.selectors;

export const { updateDuration: updateAudioDuration, updateSource: updateAudioSource } = audioSlice.actions;
