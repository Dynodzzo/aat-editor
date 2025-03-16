import { defaultRangeExtractor, Range, useVirtualizer } from "@tanstack/react-virtual";
import { Separator } from "radix-ui";
import { memo, useCallback, useContext, useRef, useState } from "react";
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

  const [playingCues, setPlayingCues] = useState<number[]>([]);

  const parentRef = useRef<HTMLDivElement>(null);
  const count = cues.length + 1; // add one to account for the fixed header
  const virtualizer = useVirtualizer({
    count,
    overscan: 3,
    scrollPaddingStart: 48,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
    rangeExtractor: useCallback((range: Range) => {
      const next = new Set([0, ...defaultRangeExtractor(range)]);
      return [...next];
    }, []),
  });
  const items = virtualizer.getVirtualItems();

  useRequestAnimationFrame(() => {
    const currentTime = currentTimeRef?.current;

    if (currentTime && cues.length > 0) {
      const cuesBeingPlayed = cues
        .filter(({ start, end }) => {
          const isCueStartGreaterThanCurrentTime = formatISOTimeToDuration(start) <= currentTime;
          const isCueEndLessThanCurrentTime = formatISOTimeToDuration(end) >= currentTime;
          return isCueStartGreaterThanCurrentTime && isCueEndLessThanCurrentTime;
        })
        .map((cue) => cues.findIndex((c) => c.id === cue.id) + 1); // add one to the index to account for the fixed header

      if (!cuesBeingPlayed.length && playingCues.length) return setPlayingCues([]);

      if (playingCues.join() !== cuesBeingPlayed.join()) {
        setPlayingCues(cuesBeingPlayed);
        const lastCueBeingPlayed = cuesBeingPlayed.at(-1);

        if (lastCueBeingPlayed !== undefined) {
          const isTargetCueVirtualized = items.some((item) => item.index === lastCueBeingPlayed);

          virtualizer?.scrollToIndex(lastCueBeingPlayed, {
            align: "start",
            behavior: isTargetCueVirtualized ? "smooth" : "auto",
          });
        }
      }
    }
  });

  const isSticky = (index: number) => index === 0;

  return (
    <div className="flex flex-col flex-1 items-stretch relative">
      {
        <div ref={parentRef} className="h-full overflow-auto contain-strict" onScroll={handleScroll}>
          <div style={{ height: virtualizer.getTotalSize() }} className="w-full relative">
            {items.map(({ key, index, start }) => (
              <div
                key={key}
                data-index={index}
                ref={virtualizer.measureElement}
                style={{
                  ...(isSticky(index)
                    ? {
                        zIndex: 10,
                        position: "sticky",
                      }
                    : {
                        position: "absolute",
                        transform: `translateY(${start}px)`,
                      }),
                }}
                className="w-full top-0 left-0"
              >
                {index === 0 && <Header />}
                {index > 1 && <CuesSeparator />}
                {index > 0 && (
                  <CueContainer
                    key={cues[index - 1].id}
                    index={index - 1}
                    id={cues[index - 1].id}
                    duration={duration}
                    isBeingPlayed={playingCues.includes(index)}
                  />
                )}
              </div>
            ))}
          </div>
          <div
            className="w-full flex flex-row justify-center"
            style={{ height: parentRef.current ? parentRef.current?.clientHeight - virtualizer.getTotalSize() : 0 }}
          >
            <Separator.Root orientation="vertical" className="w-px h-auto bg-neutral-200" />
          </div>
        </div>
      }
      <ScrollOverlay isVisible={showScrollOverlay} colorClass="to-white" />
    </div>
  );
});
