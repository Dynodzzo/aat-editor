import { Separator } from "radix-ui";
import { memo } from "react";
import { selectActiveLanguages } from "../../../../store/features/language.slice";
import { selectVoicesIds } from "../../../../store/features/voice.slice";
import { useAppSelector } from "../../../../store/hooks";
import { Collapsible, CollapsibleContent, CollapsibleHeader } from "../../../ui/Collapsible/Collapsible";
import { Header } from "./Header";
import { Voice } from "./Voice";
import { VoiceTranslations } from "./VoiceTranslations";

export const Voices = memo(function VoicesForm() {
  const languages = useAppSelector(selectActiveLanguages);
  const voicesIds = useAppSelector(selectVoicesIds);

  return (
    <div className="flex flex-col gap-2 w-full h-full bg-white">
      <Header voicesCount={voicesIds.length} />
      <Separator.Root orientation="horizontal" className="w-full h-px bg-neutral-200" />
      <div className="flex flex-col gap-2 items-stretch overflow-auto w-full">
        {voicesIds.map((voiceId, index) => {
          return (
            <>
              {index > 0 && <Separator.Root orientation="horizontal" className="w-full h-px bg-neutral-200" />}
              <Collapsible key={voiceId} className="w-full ">
                <CollapsibleHeader>
                  <Voice voiceId={voiceId} languages={languages} />
                </CollapsibleHeader>
                <CollapsibleContent className="pt-2">
                  <VoiceTranslations voiceId={voiceId} />
                </CollapsibleContent>
              </Collapsible>
            </>
          );
        })}
      </div>
    </div>
  );
});
