import { createEntityAdapter, createSelector, createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { AVAILABLE_LANGUAGES_IDS } from "../../constants/language.constants";
import { VoiceTranslation } from "../../model/transcription/voice.model";
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
    builder.addCase(addVoice, (state, action) => {
      const { id: voiceId } = action.payload;
      const translations: VoiceTranslation[] = AVAILABLE_LANGUAGES_IDS.map((languageId) => ({
        id: crypto.randomUUID(),
        voiceId,
        languageId,
        value: "",
      }));

      voiceTranslationAdapter.upsertMany(state, translations);
    });
  },
});

export default voiceTranslationSlice;

export const {
  selectAll: selectAllVoiceTranslations,
  selectById: selectVoiceTranslationById,
  selectIds: selectVoiceTranslationsIds,
} = voiceTranslationAdapter.getSelectors((state: RootState) => state.voiceTranslations);

export const selectVoiceTranslationsByVoiceId = createSelector(
  selectAllVoiceTranslations,
  (_state: RootState, voiceId: string) => voiceId,
  (voiceTranslations, voiceId) => voiceTranslations.filter((voiceTranslation) => voiceTranslation.voiceId === voiceId)
);

export const selectVoiceTranslationsByVoiceIdAndLanguageId = createSelector(
  selectVoiceTranslationsByVoiceId,
  (_state: RootState, _voiceId: string, languageId: string) => languageId,
  (voiceTranslations, languageId) =>
    voiceTranslations.find((voiceTranslation) => voiceTranslation.languageId === languageId)
);

export const { initializeVoicesTranslations, updateVoiceTranslation } = voiceTranslationSlice.actions;
