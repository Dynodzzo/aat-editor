import { memo } from "react";
import { useScrollOverlay } from "../../../hooks/useScrollOverlay";
import { ScrollOverlay } from "../../ui/ScrollOverlay/ScrollOverlay";
import { LanguagesForm } from "../Form/Languages/Languages";
import { MetadataForm } from "../Form/Metadata/Metadata";
import { Voices } from "../Form/Voices/Voices";
import { ConfigPanelLayout } from "./ConfigPanelLayout";

export const ConfigPanel = memo(function ConfigPanel() {
  const { showScrollOverlay, handleScroll } = useScrollOverlay({ threshold: 15 });

  return (
    <div className="relative h-full overflow-auto">
      <div className="px-6 pt-4 pb-2 bg-zinc-100 h-full overflow-auto" onScroll={handleScroll}>
        <ConfigPanelLayout>
          <MetadataForm />
          <LanguagesForm />
          <Voices />
        </ConfigPanelLayout>
      </div>
      <ScrollOverlay isVisible={showScrollOverlay} colorClass="to-zinc-100" />
    </div>
  );
});
