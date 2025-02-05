import { memo } from "react";
import { LanguagesForm } from "../Form/Languages/Languages";
import { MetadataForm } from "../Form/Metadata/Metadata";
import { Voices } from "../Form/Voices/Voices";
import { ConfigPanelLayout } from "./ConfigPanelLayout";

export const ConfigPanel = memo(function ConfigPanel() {
  return (
    <div className="px-6 pt-6 pb-2 bg-zinc-100 h-full overflow-auto">
      <ConfigPanelLayout>
        <MetadataForm />
        <LanguagesForm />
        <Voices />
      </ConfigPanelLayout>
    </div>
  );
});
