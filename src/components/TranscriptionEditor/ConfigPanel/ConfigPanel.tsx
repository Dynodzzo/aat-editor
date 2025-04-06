import { memo, useState } from "react";
import { useScrollOverlay } from "../../../hooks/useScrollOverlay";
import { ScrollOverlay } from "../../ui/ScrollOverlay/ScrollOverlay";
import { TabContent, Tabs, TabsList, TabTrigger } from "../../ui/Tabs/Tabs";
import { LanguagesForm } from "../Form/Languages/Languages";
import { MetadataForm } from "../Form/Metadata/Metadata";
import { Voices } from "../Form/Voices/Voices";
import { ConfigPanelLayout } from "./ConfigPanelLayout";

export const ConfigPanel = memo(function ConfigPanel() {
  const { showScrollOverlay, handleScroll } = useScrollOverlay({ threshold: 15 });
  const [activeTab, setActiveTab] = useState("metadata");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="relative h-full bg-white">
      <div className="h-full" onScroll={handleScroll}>
        <ConfigPanelLayout>
          <Tabs defaultValue={activeTab} onChange={handleTabChange}>
            <TabsList className="border-b border-neutral-200">
              <TabTrigger label="Metadata" value="metadata" />
              <TabTrigger label="Languages" value="languages" />
              <TabTrigger label="Voices" value="voices" />
            </TabsList>
            <TabContent value="metadata" className="p-4" hidden={activeTab !== "metadata"}>
              <MetadataForm />
            </TabContent>
            <TabContent value="languages" className="p-4" hidden={activeTab !== "languages"}>
              <LanguagesForm />
            </TabContent>
            <TabContent value="voices" className="pt-2 pb-4 px-4" hidden={activeTab !== "voices"}>
              <Voices />
            </TabContent>
          </Tabs>
        </ConfigPanelLayout>
      </div>
      <ScrollOverlay isVisible={showScrollOverlay} colorClass="to-white" />
    </div>
  );
});
