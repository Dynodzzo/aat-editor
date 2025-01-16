import { PropsWithChildren, useReducer } from "react";
import { TranscriptionState } from "../../model/TranscriptionModel";
import { AppContext, AppDispatchContext, appReducer, INITIAL_STATE } from "./Context";

type AppProviderProps = PropsWithChildren & {
  initialTranscriptionFormState?: TranscriptionState;
};

export const AppProvider = ({ initialTranscriptionFormState, children }: AppProviderProps) => {
  const [appState, dispatch] = useReducer(appReducer, {
    ...INITIAL_STATE,
    transcriptionForm: {
      ...INITIAL_STATE.transcriptionForm,
      ...initialTranscriptionFormState,
    },
  });

  return (
    <AppContext.Provider value={appState}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppContext.Provider>
  );
};
