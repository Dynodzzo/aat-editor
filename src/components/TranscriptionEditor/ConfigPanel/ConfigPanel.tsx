import { memo } from "react";
import { LanguagesForm } from "../Form/Languages/Languages";
import { MetadataForm } from "../Form/Metadata/Metadata";
import { VoicesForm } from "../Form/Voices/Voices";
import { ConfigPanelLayout } from "./ConfigPanelLayout";

export const ConfigPanel = memo(function ConfigPanel() {
  return (
    <div className="p-6 bg-zinc-100">
      <ConfigPanelLayout>
        <MetadataForm />
        <LanguagesForm />
        <VoicesForm />
      </ConfigPanelLayout>
    </div>
  );
});
