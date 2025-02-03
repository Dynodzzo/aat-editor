import { createContext, MutableRefObject } from "react";

export const INITIAL_STATE: MutableRefObject<number> = {
  current: 0,
};

export const AudioCurrentTimeContext = createContext<MutableRefObject<number>>(INITIAL_STATE);
