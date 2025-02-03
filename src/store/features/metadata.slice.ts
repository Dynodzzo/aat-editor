import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Metadata } from "../../model/transcription/metadata.model";

const initialState: Metadata = {
  title: "",
  author: "",
  fileAuthor: "",
};

const metadataSlice = createSlice({
  name: "metadata",
  initialState,
  reducers: {
    initializeMetadata: (state: Metadata, action: PayloadAction<Metadata>) => {
      state.title = action.payload.title;
      state.author = action.payload.author;
      state.fileAuthor = action.payload.fileAuthor;
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
  },
  selectors: {
    selectTitle: (state: Metadata) => state.title,
    selectAuthor: (state: Metadata) => state.author,
    selectFileAuthor: (state: Metadata) => state.fileAuthor,
    selectMetadata: (state: Metadata) => state,
  },
});

export default metadataSlice;

export const { selectTitle, selectAuthor, selectFileAuthor, selectMetadata } = metadataSlice.selectors;

export const { initializeMetadata, updateTitle, updateAuthor, updateFileAuthor } = metadataSlice.actions;
