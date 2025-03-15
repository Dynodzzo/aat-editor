import { memo, useContext, useRef, useState } from "react";
import { GroupedVirtuoso, VirtuosoHandle } from "react-virtuoso";
import { AudioContext } from "../../../../context/audio.context";
import { useRequestAnimationFrame } from "../../../../hooks/useRequestAnimationFrame";
import { useScrollOverlay } from "../../../../hooks/useScrollOverlay";
import { selectAudioDuration } from "../../../../store/features/audio.slice";
import { selectCuesdsAndTimes } from "../../../../store/features/cue.slice";
import { useAppSelector } from "../../../../store/hooks";
import { formatISOTimeToDuration } from "../../../../utils/time.utils";
import { ScrollOverlay } from "../../../ui/ScrollOverlay/ScrollOverlay";
import { CueContainer } from "./CueContainer";
import { CuesSeparator } from "./CuesSeparator";
import { Header } from "./Header";

export const Cues = memo(function CuesForm() {
  const { showScrollOverlay, handleScroll } = useScrollOverlay({ threshold: 40 });
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
      <GroupedVirtuoso
        ref={virtuosoRef}
        groupCounts={[cues.length]}
        data={cues}
        onScroll={handleScroll}
        groupContent={() => <Header />}
        itemContent={(index) => (
          <>
            {index > 0 && <CuesSeparator />}
            <CueContainer
              key={cues[index].id}
              index={index}
              id={cues[index].id}
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
