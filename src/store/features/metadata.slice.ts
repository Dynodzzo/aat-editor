import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Metadata } from "../../model/transcription/metadata.model";

const initialState: Metadata = {
  title: "",
  author: "",
  fileAuthor: "",
  contentLanguage: "",
};

const metadataSlice = createSlice({
  name: "metadata",
  initialState,
  reducers: {
    initializeMetadata: (state: Metadata, action: PayloadAction<Metadata>) => {
      state.title = action.payload.title;
      state.author = action.payload.author;
      state.fileAuthor = action.payload.fileAuthor;
      state.contentLanguage = action.payload.contentLanguage;
    },
    updateTitle: (state: Metadata, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    updateAuthor: (state: Metadata, action: PayloadAction<string>) => {
      state.author = action.payload;
    },
    updateFileAuthor: (state: Metadata, action: PayloadAction<string>) => {
      state.fileAuthor = action.payload;
    },
    updateContentLanguage: (state: Metadata, action: PayloadAction<string>) => {
      state.contentLanguage = action.payload;
    },
  },
  selectors: {
    selectTitle: (state: Metadata) => state.title,
    selectAuthor: (state: Metadata) => state.author,
    selectFileAuthor: (state: Metadata) => state.fileAuthor,
    selectContentLanguage: (state: Metadata) => state.contentLanguage,
    selectMetadata: (state: Metadata) => state,
  },
});

export default metadataSlice;

export const { selectTitle, selectAuthor, selectFileAuthor, selectContentLanguage, selectMetadata } =
  metadataSlice.selectors;

export const { initializeMetadata, updateTitle, updateAuthor, updateFileAuthor, updateContentLanguage } =
  metadataSlice.actions;
