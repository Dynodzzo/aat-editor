import { memo, MutableRefObject } from "react";

type WaveformProps = {
  containerRef: MutableRefObject<HTMLDivElement | null>;
};

export const Waveform = memo(function AudioPlayer({ containerRef }: WaveformProps) {
  return (
    <div className="waveform" style={{ backgroundColor: "white" }}>
      <div ref={containerRef} className="wavesurfer-container"></div>
    </div>
  );
});
