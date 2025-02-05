import { memo, MutableRefObject } from "react";

type WaveformProps = {
  containerRef: MutableRefObject<HTMLDivElement | null>;
};

export const Waveform = memo(function AudioPlayer({ containerRef }: WaveformProps) {
  return (
    <div className="waveform leading-none flex-1">
      <div ref={containerRef} className="wavesurfer-container h-min"></div>
    </div>
  );
});
