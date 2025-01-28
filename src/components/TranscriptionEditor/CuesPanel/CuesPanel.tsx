import { memo } from "react";
import { CuesForm } from "../Form/Cues/Cues";
import { CuesPanelLayout } from "./CuesPanelLayout";
import { Header } from "./Header";

type CuesPanelProps = {
  playSprite?: (id?: string) => void;
};

export const CuesPanel = memo(function CuesPanel({ playSprite }: CuesPanelProps) {
  return (
    <CuesPanelLayout>
      <Header />
      <CuesForm onPlaySprite={playSprite} />
    </CuesPanelLayout>
  );
});
