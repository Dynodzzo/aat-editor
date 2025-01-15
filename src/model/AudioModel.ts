import { RefObject } from "react";

export type AudioState = {
  source: string;
  duration: number;
  currentTimeRef: RefObject<number> | null;
};
