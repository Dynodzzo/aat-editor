import { memo, MutableRefObject } from "react";
import { AudioPlayerLoadingState } from "../../../hooks/useWaveSurfer";

type WaveformProps = {
  containerRef: MutableRefObject<HTMLDivElement | null>;
  loadingState: AudioPlayerLoadingState;
};

export const Waveform = memo(function Waveform({ containerRef, loadingState }: WaveformProps) {
  const isLoading = loadingState === "loading";

  return (
    <div className="waveform leading-none flex-1 bg-white">
      {isLoading && (
        <div className="loading h-[115px] flex flex-row items-center justify-center">
          <span className="loader"></span>
        </div>
      )}
      <div ref={containerRef} className="wavesurfer-container h-min" hidden={isLoading}></div>
    </div>
  );
});
