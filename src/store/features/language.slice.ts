import { createEntityAdapter, createSelector, createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { AVAILABLE_LANGUAGES } from "../../constants/language.constants";
import { Language, LanguageId } from "../../model/transcription/language.model";
import { RootState } from "../store";

type LanguageState = EntityState<Language, LanguageId>;

const languageAdapter = createEntityAdapter<Language>();
const initialState: LanguageState = languageAdapter.getInitialState({
  entities: AVAILABLE_LANGUAGES.reduce((acc: Record<LanguageId, Language>, { id, name }) => {
    acc[id] = { id, name, isActive: false };
    return acc;
  }, {} as Record<LanguageId, Language>),
  ids: AVAILABLE_LANGUAGES.map(({ id }) => id),
});

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    toggleLanguage: (state: LanguageState, action: PayloadAction<LanguageId>) => {
      const previousValue = state.entities[action.payload].isActive;
      languageAdapter.updateOne(state, { id: action.payload, changes: { isActive: !previousValue } });
    },
  },
});

export default languageSlice;

export const { selectById: selectLanguageById, selectAll: selectAllLanguages } = languageAdapter.getSelectors(
  (state: RootState) => state.languages
);

export const selectActiveLanguages = createSelector(selectAllLanguages, (languages) =>
  languages.filter((language) => language.isActive)
);

export const { toggleLanguage } = languageSlice.actions;
