import { ForwardedRef, forwardRef, memo, PropsWithChildren, useContext, useRef, useState } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { useRequestAnimationFrame } from "../../../../hooks/useRequestAnimationFrame";
import { selectAudioDuration } from "../../../../store/features/audio.slice";
import { selectCuesdsAndTimes } from "../../../../store/features/cue.slice";
import { selectActiveLanguages } from "../../../../store/features/language.slice";
import { useAppSelector } from "../../../../store/hooks";
import { formatISOTimeToDuration } from "../../../../utils/time.utils";
import { AudioCurrentTimeContext } from "../../Context/AudioCurrentTimeContext";
import { Cue } from "./Cue";

type CuesFormProps = {
  onPlaySprite?: (id?: string) => void;
};

const ItemWrapper = forwardRef<HTMLDivElement, PropsWithChildren>(function ItemWrapper(
  props,
  ref: ForwardedRef<HTMLDivElement>
) {
  return <div className="px-4 pt-4 last:pb-4" ref={ref} {...props} />;
});

export const CuesForm = memo(function CuesForm({ onPlaySprite }: CuesFormProps) {
  const languages = useAppSelector(selectActiveLanguages);
  const cues = useAppSelector(selectCuesdsAndTimes);
  const duration = useAppSelector(selectAudioDuration);
  const currentTimeRef = useContext(AudioCurrentTimeContext);

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
    <div className="flex flex-col overflow-auto h-full">
      <Virtuoso
        ref={virtuosoRef}
        totalCount={cues.length}
        data={cues}
        components={{ Item: ItemWrapper }}
        itemContent={(index, cue) => (
          <div key={cue.id}>
            <Cue
              index={index.toString()}
              cueId={cue.id}
              languages={languages}
              duration={duration}
              isPlaying={playingCues.includes(index)}
              onPlaySprite={(cueKey?: string) => {
                if (onPlaySprite) onPlaySprite(cueKey);
              }}
            />
          </div>
        )}
      />
    </div>
  );
});
