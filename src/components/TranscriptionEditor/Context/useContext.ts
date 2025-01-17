import { useContext } from "react";
import { TranscriptionEditorContext, TranscriptionEditorDispatchContext } from "./Context";

export const useTranscriptionEditorContext = () => {
  return useContext(TranscriptionEditorContext);
};

export const useTranscriptionEditorDispatch = () => {
  return useContext(TranscriptionEditorDispatchContext);
};
