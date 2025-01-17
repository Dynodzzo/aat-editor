import { PropsWithChildren, useReducer } from "react";
import { TranscriptionState } from "../../../model/TranscriptionModel";
import { TranscriptionEditorContext, TranscriptionEditorDispatchContext, appReducer, INITIAL_STATE } from "./Context";

type TranscriptionEditorProviderProps = PropsWithChildren & {
  initialFormState?: TranscriptionState;
};

export const TranscriptionEditorProvider = ({ initialFormState, children }: TranscriptionEditorProviderProps) => {
  const [appState, dispatch] = useReducer(appReducer, {
    ...INITIAL_STATE,
    transcriptionForm: {
      ...INITIAL_STATE.transcriptionForm,
      ...initialFormState,
    },
  });

  return (
    <TranscriptionEditorContext.Provider value={appState}>
      <TranscriptionEditorDispatchContext.Provider value={dispatch}>
        {children}
      </TranscriptionEditorDispatchContext.Provider>
    </TranscriptionEditorContext.Provider>
  );
};
