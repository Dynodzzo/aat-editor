import React, { createContext, PropsWithChildren, useContext, useReducer } from "react";
import { CuesByLanguage, LanguageKey, Voice } from "../TranscriptionFormModel";
import { AVAILABLE_LANGUAGES } from "../TranscriptionFormConstants";

const INITIAL_FORM_STATE: TranscriptionFormState = {
  title: "",
  author: "",
  languages: [],
  voices: [],
  cues: AVAILABLE_LANGUAGES.reduce((languages, { key }) => {
    languages[key] = [];
    return languages;
  }, {} as CuesByLanguage),
};
const TranscriptionContext = createContext<TranscriptionFormState>(INITIAL_FORM_STATE);
const TranscriptionDispatchContext = createContext<React.Dispatch<TranscriptionFormAction>>(() => {});

export type TranscriptionFormState = {
  title: string;
  author: string;
  languages: LanguageKey[];
  voices: Voice[];
  cues: CuesByLanguage;
};

export type TranscriptionFormAction =
  | { type: "UPDATE_TITLE"; payload: string }
  | { type: "UPDATE_AUTHOR"; payload: string }
  | { type: "UPDATE_LANGUAGES"; payload: LanguageKey[] }
  | { type: "UPDATE_VOICES"; payload: Voice[] }
  | { type: "UPDATE_CUES"; payload: CuesByLanguage };

const transcriptionReducer = (state: TranscriptionFormState, action: TranscriptionFormAction) => {
  switch (action.type) {
    case "UPDATE_TITLE":
      return {
        ...state,
        title: action.payload,
      };
    case "UPDATE_AUTHOR":
      return {
        ...state,
        author: action.payload,
      };
    case "UPDATE_LANGUAGES":
      return {
        ...state,
        languages: [...action.payload],
      };
    case "UPDATE_VOICES":
      return {
        ...state,
        voices: [...action.payload],
      };
    case "UPDATE_CUES":
      return {
        ...state,
        cues: { ...action.payload },
      };
    default:
      return state;
  }
};

export const TranscriptionFormProvider = ({ children }: PropsWithChildren) => {
  const [transcription, dispatch] = useReducer(transcriptionReducer, INITIAL_FORM_STATE);

  return (
    <TranscriptionContext.Provider value={transcription}>
      <TranscriptionDispatchContext.Provider value={dispatch}>{children}</TranscriptionDispatchContext.Provider>
    </TranscriptionContext.Provider>
  );
};

export const useTranscriptionForm = () => {
  return useContext(TranscriptionContext);
};

export const useTranscriptionFormDispatch = () => {
  return useContext(TranscriptionDispatchContext);
};
