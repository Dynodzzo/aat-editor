import { createEntityAdapter, createSelector, createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { Cue } from "../../model/transcription/cue.model";
import { RootState } from "../store";

type CueState = EntityState<Cue, string>;
type CueUpdate = Pick<Cue, "id"> & Partial<Pick<Cue, "start" | "end" | "voiceId">>;

const cueAdapter = createEntityAdapter<Cue>();
const initialState: CueState = cueAdapter.getInitialState();

const cueSlice = createSlice({
  name: "cue",
  initialState,
  reducers: {
    initializeCues: (state, action: PayloadAction<Cue[]>) => cueAdapter.setAll(state, action.payload),
    addCue: (state, action: PayloadAction<Cue>) => {
      cueAdapter.addOne(state, action.payload);
    },
    updateCueStart: (state, action: PayloadAction<CueUpdate>) => {
      const { id, start } = action.payload;
      cueAdapter.updateOne(state, { id, changes: { start } });
    },
    updateCueEnd: (state, action: PayloadAction<CueUpdate>) => {
      const { id, end } = action.payload;
      cueAdapter.updateOne(state, { id, changes: { end } });
    },
    updateCueVoiceId: (state, action: PayloadAction<CueUpdate>) => {
      const { id, voiceId } = action.payload;
      cueAdapter.updateOne(state, { id, changes: { voiceId } });
    },
    deleteCue: (state, action: PayloadAction<string>) => {
      cueAdapter.removeOne(state, action.payload);
    },
  },
});

export default cueSlice;

export const {
  selectAll: selectAllCues,
  selectById: selectCueById,
  selectIds: selectCuesIds,
} = cueAdapter.getSelectors((state: RootState) => state.cues);

export const selectCuesdsAndTimes = createSelector(selectAllCues, (cues) =>
  cues.map(({ id, start, end }) => ({ id, start, end }))
);

export const { initializeCues, addCue, updateCueStart, updateCueEnd, updateCueVoiceId, deleteCue } = cueSlice.actions;
