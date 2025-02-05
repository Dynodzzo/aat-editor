import { memo } from "react";
import { Cues } from "../Form/Cues/Cues";
import { CuesPanelLayout } from "./CuesPanelLayout";
import { Header } from "./Header";

export const CuesPanel = memo(function CuesPanel() {
  return (
    <CuesPanelLayout>
      <Header />
      <Cues />
    </CuesPanelLayout>
  );
});
