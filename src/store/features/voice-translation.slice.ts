import { createEntityAdapter, createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { createIdSelector, createSelector } from "redux-views";
import { AVAILABLE_LANGUAGES_IDS } from "../../constants/language.constants";
import { VoiceTranslation } from "../../model/transcription/voice.model";
import { clearState } from "../actions";
import { RootState } from "../store";
import { addVoice } from "./voice.slice";

type VoiceTranslationState = EntityState<VoiceTranslation, string>;
type VoiceTranslationUpdate = Pick<VoiceTranslation, "id" | "value">;

const voiceTranslationAdapter = createEntityAdapter<VoiceTranslation>();
const initialState: VoiceTranslationState = voiceTranslationAdapter.getInitialState();

const voiceTranslationSlice = createSlice({
  name: "voice-translation",
  initialState,
  reducers: {
    initializeVoicesTranslations: (state, action: PayloadAction<VoiceTranslation[]>) =>
      voiceTranslationAdapter.setAll(state, action.payload),
    updateVoiceTranslation: (state, action: PayloadAction<VoiceTranslationUpdate>) => {
      const { id, value } = action.payload;
      voiceTranslationAdapter.updateOne(state, { id, changes: { value } });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addVoice, (state, action) => {
        const { id: voiceId } = action.payload;
        const translations: VoiceTranslation[] = AVAILABLE_LANGUAGES_IDS.map((languageId) => ({
          id: crypto.randomUUID(),
          voiceId,
          languageId,
          value: "",
        }));

        voiceTranslationAdapter.upsertMany(state, translations);
      })
      .addCase(clearState, () => initialState);
  },
});

export default voiceTranslationSlice;

export const {
  selectAll: selectAllVoiceTranslations,
  selectById: selectVoiceTranslationById,
  selectIds: selectVoiceTranslationsIds,
} = voiceTranslationAdapter.getSelectors((state: RootState) => state.voiceTranslations);

type TranslationIdSelectorKeys = { voiceId: string; languageId: string };
const selectTranslationsByVoiceId = createIdSelector<TranslationIdSelectorKeys>(({ voiceId }) => voiceId);
const selectTranslationsByLanguageId = createIdSelector<TranslationIdSelectorKeys>(({ languageId }) => languageId);

const selectVoiceTranslationsByVoiceId = createSelector(
  [selectAllVoiceTranslations, selectTranslationsByVoiceId],
  (voiceTranslations, voiceId) => voiceTranslations.filter((voiceTranslation) => voiceTranslation.voiceId === voiceId)
);

const selectVoiceTranslationsByVoiceIdAndLanguageId = createSelector(
  [selectVoiceTranslationsByVoiceId, selectTranslationsByLanguageId],
  (voiceTranslations, languageId) =>
    voiceTranslations.find((voiceTranslation) => voiceTranslation.languageId === languageId)
);

export const selectVoiceTranslationIdByVoiceIdAndLanguageId = createSelector(
  [selectVoiceTranslationsByVoiceIdAndLanguageId],
  (voiceTranslation) => voiceTranslation?.id
);

export const selectVoiceTranslationValueByVoiceIdAndLanguageId = createSelector(
  [selectVoiceTranslationsByVoiceIdAndLanguageId],
  (voiceTranslation) => voiceTranslation?.value
);

export const { initializeVoicesTranslations, updateVoiceTranslation } = voiceTranslationSlice.actions;
