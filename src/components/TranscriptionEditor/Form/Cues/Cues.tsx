import { Separator } from "radix-ui";
import { memo, useContext, useRef, useState } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { AudioContext } from "../../../../context/audio.context";
import { useRequestAnimationFrame } from "../../../../hooks/useRequestAnimationFrame";
import { useScrollOverlay } from "../../../../hooks/useScrollOverlay";
import { selectAudioDuration } from "../../../../store/features/audio.slice";
import { selectCuesdsAndTimes } from "../../../../store/features/cue.slice";
// import { selectActiveLanguages } from "../../../../store/features/language.slice";
import { useAppSelector } from "../../../../store/hooks";
import { formatISOTimeToDuration } from "../../../../utils/time.utils";
import { ScrollOverlay } from "../../../ui/ScrollOverlay/ScrollOverlay";
import { CueContainer } from "./CueContainer";

export const Cues = memo(function CuesForm() {
  const { showScrollOverlay, handleScroll } = useScrollOverlay({ threshold: 40 });
  // const languages = useAppSelector(selectActiveLanguages);
  const cues = useAppSelector(selectCuesdsAndTimes);
  const duration = useAppSelector(selectAudioDuration);

  const { currentTimeRef } = useContext(AudioContext);

  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const [playingCues, setPlayingCues] = useState<number[]>([]);

  useRequestAnimationFrame(() => {
    const currentTime = currentTimeRef?.current;

    if (currentTime && cues.length > 0) {
      const cuesBeingPlayed = cues
        .filter(({ start, end }) => {
          const isCueStartGreaterThanCurrentTime = formatISOTimeToDuration(start) <= currentTime;
          const isCueEndLessThanCurrentTime = formatISOTimeToDuration(end) >= currentTime;
          return isCueStartGreaterThanCurrentTime && isCueEndLessThanCurrentTime;
        })
        .map((cue) => cues.findIndex((c) => c.id === cue.id));

      if (!cuesBeingPlayed.length && playingCues.length) return setPlayingCues([]);

      const cuesKeysBeingPlayed = cuesBeingPlayed.map((index) => index);

      if (playingCues.join() !== cuesKeysBeingPlayed.join()) {
        setPlayingCues(cuesKeysBeingPlayed);
        const lastCueBeingPlayed = cuesKeysBeingPlayed.at(-1);

        if (lastCueBeingPlayed !== undefined) {
          virtuosoRef.current?.scrollToIndex({ index: lastCueBeingPlayed, align: "start", behavior: "smooth" });
        }
      }
    }
  });

  return (
    <div className="flex flex-col overflow-auto h-full relative">
      <Virtuoso
        ref={virtuosoRef}
        totalCount={cues.length}
        data={cues}
        onScroll={handleScroll}
        itemContent={(index, cue) => (
          <>
            {index > 0 && (
              <div className="flex flex-row items-stretch">
                <div className="px-4 grow bg-transparent">
                  <Separator.Root
                    orientation="horizontal"
                    className="w-full h-px [background:repeating-linear-gradient(90deg,#E5E5E5,#E5E5E5_4px,transparent_4px,transparent_8px)]"
                  />
                </div>
                <Separator.Root orientation="vertical" className="w-px bg-neutral-200" />
                <div className="px-4 grow">
                  <Separator.Root
                    orientation="horizontal"
                    className="w-full h-px [background:repeating-linear-gradient(90deg,#E5E5E5,#E5E5E5_4px,transparent_4px,transparent_8px)]"
                  />
                </div>
              </div>
            )}
            <CueContainer
              key={cue.id}
              index={index}
              id={cue.id}
              duration={duration}
              isBeingPlayed={playingCues.includes(index)}
            />
          </>
        )}
      />
      <ScrollOverlay isVisible={showScrollOverlay} colorClass="to-white" />
    </div>
  );
});
