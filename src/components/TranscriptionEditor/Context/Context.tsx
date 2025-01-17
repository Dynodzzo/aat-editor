import React, { createContext, RefObject } from "react";
import { AudioState } from "../../../model/AudioModel";
import { Cue, LanguageKey, TranscriptionState, Voice } from "../../../model/TranscriptionModel";

type TranscriptionEditorContextState = {
  transcriptionForm: TranscriptionState;
  audioPlayer: AudioState;
};

export const INITIAL_STATE: TranscriptionEditorContextState = {
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

export const TranscriptionEditorContext = createContext<TranscriptionEditorContextState>(INITIAL_STATE);
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const TranscriptionEditorDispatchContext = createContext<React.Dispatch<TranscriptionEditorAction>>(() => {});

export type TranscriptionEditorAction =
  | { type: "UPDATE_TRANSCRIPTION_TITLE"; payload: string }
  | { type: "UPDATE_TRANSCRIPTION_AUTHOR"; payload: string }
  | { type: "UPDATE_TRANSCRIPTION_LANGUAGES"; payload: LanguageKey[] }
  | { type: "UPDATE_TRANSCRIPTION_VOICES"; payload: Voice[] }
  | { type: "UPDATE_TRANSCRIPTION_CUES"; payload: Cue[] }
  | { type: "UPDATE_AUDIO_SOURCE"; payload: string }
  | { type: "UPDATE_AUDIO_DURATION"; payload: number }
  | { type: "UPDATE_AUDIO_CURRENT_TIME"; payload: RefObject<number> };

export const appReducer = (state: TranscriptionEditorContextState, action: TranscriptionEditorAction) => {
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
