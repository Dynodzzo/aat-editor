import { createEntityAdapter, createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { createIdSelector, createSelector } from "redux-views";
import { AVAILABLE_LANGUAGES_IDS } from "../../constants/language.constants";
import { CueTranslation } from "../../model/transcription/cue.model";
import { RootState } from "../store";
import { addCue } from "./cue.slice";

type CueTranslationState = EntityState<CueTranslation, string>;
type CueTranslationUpdate = Pick<CueTranslation, "id" | "text" | "note">;

const cueTranslationAdapter = createEntityAdapter<CueTranslation>();
const initialState: CueTranslationState = cueTranslationAdapter.getInitialState();

const cueTranslationSlice = createSlice({
  name: "cue-translation",
  initialState,
  reducers: {
    initializeCuesTranslations: (state, action: PayloadAction<CueTranslation[]>) =>
      cueTranslationAdapter.setAll(state, action.payload),
    updateCueTranslation: (state, action: PayloadAction<CueTranslationUpdate>) => {
      const { id, text, note } = action.payload;
      cueTranslationAdapter.updateOne(state, { id, changes: { text, note } });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCue, (state, action) => {
      const { id: cueId } = action.payload;
      const translations: CueTranslation[] = AVAILABLE_LANGUAGES_IDS.map((languageId) => ({
        id: crypto.randomUUID(),
        cueId,
        languageId,
        text: "",
        note: "",
      }));

      cueTranslationAdapter.upsertMany(state, translations);
    });
  },
});

export default cueTranslationSlice;

export const {
  selectAll: selectAllCueTranslations,
  selectById: selectCueTranslationById,
  selectIds: selectCueTranslationsIds,
} = cueTranslationAdapter.getSelectors((state: RootState) => state.cueTranslations);

type TranslationIdSelectorKeys = { cueId: string; languageId: string };
const selectTranslationsByCueId = createIdSelector<TranslationIdSelectorKeys>(({ cueId }) => cueId);
const selectTranslationsByLanguageId = createIdSelector<TranslationIdSelectorKeys>(({ languageId }) => languageId);

const selectCueTranslationsByCueId = createSelector(
  [selectAllCueTranslations, selectTranslationsByCueId],
  (cueTranslations, cueId) => cueTranslations.filter((cueTranslation) => cueTranslation.cueId === cueId)
);

export const selectCueTranslationsByCueIdAndLanguageId = createSelector(
  [selectCueTranslationsByCueId, selectTranslationsByLanguageId],
  (cueTranslations, languageId) => cueTranslations.find((cueTranslation) => cueTranslation.languageId === languageId)
);

export const selectCuesTranslationsByLanguageId = createSelector(
  [selectAllCueTranslations, selectTranslationsByLanguageId],
  (cueTranslations, languageId) => cueTranslations.filter((cueTranslation) => cueTranslation.languageId === languageId)
);

export const selectCueTextTranslationByCueIdAndLanguageId = createSelector(
  [selectCueTranslationsByCueIdAndLanguageId],
  (cueTranslation) => cueTranslation?.text
);

export const selectCueNoteTranslationByCueIdAndLanguageId = createSelector(
  [selectCueTranslationsByCueIdAndLanguageId],
  (cueTranslation) => cueTranslation?.note
);

export const selectCueTranslationIdByCueIdAndLanguageId = createSelector(
  [selectCueTranslationsByCueIdAndLanguageId],
  (cueTranslation) => cueTranslation?.id
);

export const { initializeCuesTranslations, updateCueTranslation } = cueTranslationSlice.actions;
