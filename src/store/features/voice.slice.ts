import { createEntityAdapter, createSelector, createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { Voice } from "../../model/transcription/voice.model";
import { RootState } from "../store";

type VoiceState = EntityState<Voice, string>;
type VoiceUpdate = Pick<Voice, "id"> & Partial<Pick<Voice, "name" | "color">>;

const voiceAdapter = createEntityAdapter<Voice>();
const initialState: VoiceState = voiceAdapter.getInitialState();

const voiceSlice = createSlice({
  name: "voice",
  initialState,
  reducers: {
    initializeVoices: (state, action: PayloadAction<Voice[]>) => voiceAdapter.setAll(state, action.payload),
    addVoice: (state, action: PayloadAction<Voice>) => {
      voiceAdapter.addOne(state, action.payload);
    },
    updateVoiceColor: (state, action: PayloadAction<VoiceUpdate>) => {
      const { id, color } = action.payload;
      voiceAdapter.updateOne(state, { id, changes: { color } });
    },
    updateVoiceName: (state, action: PayloadAction<VoiceUpdate>) => {
      const { id, name } = action.payload;
      voiceAdapter.updateOne(state, { id, changes: { name } });
    },
  },
});

export default voiceSlice;

export const {
  selectAll: selectAllVoices,
  selectById: selectVoiceById,
  selectIds: selectVoicesIds,
} = voiceAdapter.getSelectors((state: RootState) => state.voices);

export const selectVoicesIdsAndNames = createSelector(selectAllVoices, (voices) =>
  voices.map((voice) => ({ id: voice.id, name: voice.name }))
);
export const selectVoiceColorById = createSelector(selectVoiceById, (voice) => voice?.color);

export const makeSelectVoiceColorById = () => createSelector(selectVoiceById, (voice) => voice?.color);

export const { initializeVoices, addVoice, updateVoiceColor, updateVoiceName } = voiceSlice.actions;
