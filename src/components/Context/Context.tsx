import React, { createContext, PropsWithChildren, RefObject, useContext, useReducer } from "react";
import { AudioState } from "../../model/AudioModel";
import { Cue, LanguageKey, TranscriptionState, Voice } from "../../model/TranscriptionModel";

type AppContextState = {
  transcriptionForm: TranscriptionState;
  audioPlayer: AudioState;
};

const INITIAL_STATE: AppContextState = {
  transcriptionForm: {
    title: "",
    author: "",
    languages: [],
    voices: [],
    cues: [],
  },
  audioPlayer: {
    source: "",
    duration: 0,
    currentTimeRef: null,
  },
};

const AppContext = createContext<AppContextState>(INITIAL_STATE);
const AppDispatchContext = createContext<React.Dispatch<AppAction>>(() => {});

export type AppAction =
  | { type: "UPDATE_TRANSCRIPTION_TITLE"; payload: string }
  | { type: "UPDATE_TRANSCRIPTION_AUTHOR"; payload: string }
  | { type: "UPDATE_TRANSCRIPTION_LANGUAGES"; payload: LanguageKey[] }
  | { type: "UPDATE_TRANSCRIPTION_VOICES"; payload: Voice[] }
  | { type: "UPDATE_TRANSCRIPTION_CUES"; payload: Cue[] }
  | { type: "UPDATE_AUDIO_SOURCE"; payload: string }
  | { type: "UPDATE_AUDIO_DURATION"; payload: number }
  | { type: "UPDATE_AUDIO_CURRENT_TIME"; payload: RefObject<number> };

const appReducer = (state: AppContextState, action: AppAction) => {
  switch (action.type) {
    case "UPDATE_TRANSCRIPTION_TITLE":
      return {
        ...state,
        transcriptionForm: {
          ...state.transcriptionForm,
          title: action.payload,
        },
      };
    case "UPDATE_TRANSCRIPTION_AUTHOR":
      return {
        ...state,
        transcriptionForm: {
          ...state.transcriptionForm,
          author: action.payload,
        },
      };
    case "UPDATE_TRANSCRIPTION_LANGUAGES":
      return {
        ...state,
        transcriptionForm: {
          ...state.transcriptionForm,
          languages: [...action.payload],
        },
      };
    case "UPDATE_TRANSCRIPTION_VOICES":
      return {
        ...state,
        transcriptionForm: {
          ...state.transcriptionForm,
          voices: [...action.payload],
        },
      };
    case "UPDATE_TRANSCRIPTION_CUES":
      return {
        ...state,
        transcriptionForm: {
          ...state.transcriptionForm,
          cues: [...action.payload],
        },
      };
    case "UPDATE_AUDIO_SOURCE":
      return {
        ...state,
        audioPlayer: {
          ...state.audioPlayer,
          source: action.payload,
        },
      };
    case "UPDATE_AUDIO_DURATION":
      return {
        ...state,
        audioPlayer: {
          ...state.audioPlayer,
          duration: action.payload,
        },
      };
    case "UPDATE_AUDIO_CURRENT_TIME":
      return {
        ...state,
        audioPlayer: {
          ...state.audioPlayer,
          currentTimeRef: action.payload,
        },
      };
    default:
      return state;
  }
};

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

export const useAppContext = () => {
  return useContext(AppContext);
};

export const useAppDispatch = () => {
  return useContext(AppDispatchContext);
};
