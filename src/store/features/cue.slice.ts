import { createEntityAdapter, createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "redux-views";
import { Cue } from "../../model/transcription/cue.model";
import { clearState } from "../actions";
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
  extraReducers: (builder) => {
    builder.addCase(clearState, () => initialState);
  },
});

export default cueSlice;

export const {
  selectAll,
  selectById: selectCueById,
  selectIds: selectCuesIds,
} = cueAdapter.getSelectors((state: RootState) => state.cues);

export const { initializeCues, addCue, updateCueStart, updateCueEnd, updateCueVoiceId, deleteCue } = cueSlice.actions;

export const selectAllCues = createSelector([selectAll], (cues) => cues);
export const selectCueStartById = createSelector([selectCueById], (cue) => cue.start);
export const selectCueEndById = createSelector([selectCueById], (cue) => cue.end);
export const selectCueVoiceIdById = createSelector([selectCueById], (cue) => cue.voiceId);
