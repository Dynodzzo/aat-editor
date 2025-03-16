import { memo } from "react";
import { useScrollOverlay } from "../../../hooks/useScrollOverlay";
import { ScrollOverlay } from "../../ui/ScrollOverlay/ScrollOverlay";
import { TabContent, Tabs, TabsList, TabTrigger } from "../../ui/Tabs/Tabs";
import { LanguagesForm } from "../Form/Languages/Languages";
import { MetadataForm } from "../Form/Metadata/Metadata";
import { Voices } from "../Form/Voices/Voices";
import { ConfigPanelLayout } from "./ConfigPanelLayout";

export const ConfigPanel = memo(function ConfigPanel() {
  const { showScrollOverlay, handleScroll } = useScrollOverlay({ threshold: 15 });

  return (
    <div className="relative h-full overflow-auto">
      <div className=" h-full overflow-auto border-l-1 border-neutral-200" onScroll={handleScroll}>
        <ConfigPanelLayout>
          <Tabs defaultValue="metadata">
            <TabsList className="border-b border-neutral-200">
              <TabTrigger label="Metadata" value="metadata" />
              <TabTrigger label="Languages" value="languages" />
              <TabTrigger label="Voices" value="voices" />
            </TabsList>
            <TabContent value="metadata">
              <MetadataForm />
            </TabContent>
            <TabContent value="languages">
              <LanguagesForm />
            </TabContent>
            <TabContent value="voices">
              <Voices />
            </TabContent>
          </Tabs>
        </ConfigPanelLayout>
      </div>
      <ScrollOverlay isVisible={showScrollOverlay} colorClass="to-zinc-100" />
    </div>
  );
});
