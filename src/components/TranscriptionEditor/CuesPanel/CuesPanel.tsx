import { memo } from "react";
import { Cues } from "../Form/Cues/Cues";
import { CuesPanelLayout } from "./CuesPanelLayout";

export const CuesPanel = memo(function CuesPanel() {
  return (
    <CuesPanelLayout>
      <Cues />
    </CuesPanelLayout>
  );
});
