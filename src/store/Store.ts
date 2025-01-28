import { configureStore } from "@reduxjs/toolkit";
import transcriptionEditorSliceReducer from "../components/TranscriptionEditor/TranscriptionEditorSlice";

export const store = configureStore({
  reducer: {
    transcriptionEditor: transcriptionEditorSliceReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
