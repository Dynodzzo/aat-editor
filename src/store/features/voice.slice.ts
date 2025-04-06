import { createEntityAdapter, createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { createIdSelector, createSelector } from "redux-views";
import { Voice } from "../../model/transcription/voice.model";
import { clearState } from "../actions";
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
  extraReducers: (builder) => {
    builder.addCase(clearState, () => initialState);
  },
});

export default voiceSlice;

export const {
  selectAll: selectAllVoices,
  selectById: selectOneVoiceById,
  selectIds: selectVoicesIds,
} = voiceAdapter.getSelectors((state: RootState) => state.voices);

export const selectVoicesIdsAndNames = createSelector([selectAllVoices], (voices) =>
  voices.map((voice) => ({ id: voice.id, name: voice.name }))
);

const selectVoiceById = createIdSelector<string>((voiceId) => voiceId);

export const selectVoiceColorById = createSelector(
  [selectAllVoices, selectVoiceById],
  (voices, voice) => voices.find((currentVoice) => currentVoice.id === voice)?.color
);

export const { initializeVoices, addVoice, updateVoiceColor, updateVoiceName } = voiceSlice.actions;
