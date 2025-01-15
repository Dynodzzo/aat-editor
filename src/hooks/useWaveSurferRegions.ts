import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin, { Region, RegionParams } from "wavesurfer.js/dist/plugins/regions.js";

type UseWaveSurferRegionsHandlers = {
  onRegionUpdate?: (region: Region, side?: "start" | "end") => void;
  onRegionUpdated?: (region: Region) => void;
  onRegionIn?: (region: Region) => void;
  onRegionOut?: (region: Region) => void;
};

export const useWaveSurferRegions = (
  waveSurfer: WaveSurfer | null,
  regions: RegionParams[],
  isReady: boolean,
  regionsHandlers: UseWaveSurferRegionsHandlers
) => {
  const regionsPlugin = useRef<RegionsPlugin | null>(null);

  useEffect(() => {
    if (!waveSurfer || !isReady) return;

    regionsPlugin.current = RegionsPlugin.create();
    waveSurfer.registerPlugin(regionsPlugin.current);

    return () => {
      if (regionsPlugin.current) {
        regionsPlugin.current.destroy();
        regionsPlugin.current = null;
      }
    };
  }, [waveSurfer, isReady]);

  useEffect(() => {
    if (!isReady) return;
    if (!regionsPlugin.current) return;
    const existingRegions = regionsPlugin.current.getRegions();

    regions.forEach((newRegion) => {
      if (!regionsPlugin.current) return;
      const existingRegion = existingRegions.find((region) => region.id === newRegion.id);

      if (!existingRegion) {
        return regionsPlugin.current.addRegion({ ...newRegion });
      }

      existingRegion.setOptions({ ...newRegion });
    });

    const removedRegions = existingRegions.filter((region) => !regions.some((newRegion) => newRegion.id === region.id));
    removedRegions.forEach((region) => region.remove());
  }, [isReady, regions]);

  useEffect(() => {
    if (!regionsPlugin.current) return;

    const { onRegionUpdate, onRegionUpdated, onRegionIn, onRegionOut } = regionsHandlers;

    const handleRegionUpdate = (region: Region, side?: "start" | "end") => {
      if (onRegionUpdate) {
        onRegionUpdate(region, side);
      }
    };

    const handleRegionUpdated = (region: Region) => {
      if (onRegionUpdated) {
        onRegionUpdated(region);
      }
    };

    const handleRegionIn = (region: Region) => {
      if (onRegionIn) {
        onRegionIn(region);
      }
    };

    const handleRegionOut = (region: Region) => {
      if (onRegionOut) {
        onRegionOut(region);
      }
    };

    regionsPlugin.current.on("region-update", handleRegionUpdate);
    regionsPlugin.current.on("region-updated", handleRegionUpdated);
    regionsPlugin.current.on("region-in", handleRegionIn);
    regionsPlugin.current.on("region-out", handleRegionOut);

    return () => {
      if (regionsPlugin.current) {
        regionsPlugin.current.unAll();
      }
    };
  }, [isReady, regionsHandlers]);
};
