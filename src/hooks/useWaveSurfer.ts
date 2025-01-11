import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import ZoomPlugin from "wavesurfer.js/dist/plugins/zoom.esm.js";
import RegionsPlugin, { Region, RegionParams } from "wavesurfer.js/dist/plugins/regions.esm.js";
import {
  useTranscriptionForm,
  useTranscriptionFormDispatch,
} from "../components/TranscriptionEditor/Form/FormContext/TranscriptionFormContext";
import { formatDurationToISOTime, formatISOTimeToDuration } from "../utils/time.utils";

export const useWaveSurfer = (containerRef: RefObject<HTMLDivElement>, audioObjectURL: string) => {
  const { cues, voices } = useTranscriptionForm();
  const dispatch = useTranscriptionFormDispatch();
  const waveSurfer = useRef<WaveSurfer | null>(null);
  const regionsPlugin = useRef<RegionsPlugin | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const activeRegion = useRef<Region | null>(null);

  const regions: RegionParams[] = useMemo(() => {
    return cues.map((cue) => ({
      id: cue.key,
      start: formatISOTimeToDuration(cue.start),
      end: formatISOTimeToDuration(cue.end),
      drag: false,
      resize: true,
      color: voices.find((voice) => voice.id === cue.voice)?.color + "66",
    }));
  }, [cues, voices]);

  useEffect(() => {
    if (!containerRef.current) return;

    regionsPlugin.current = RegionsPlugin.create();

    waveSurfer.current = WaveSurfer.create({
      container: containerRef.current,
      waveColor: "gainsboro",
      progressColor: "darkgrey",
      cursorColor: "navy",
      cursorWidth: 3,
      // barWidth: 1,
      // barRadius: 3,
      // height: 100,
      mediaControls: true,
      url: audioObjectURL,
      plugins: [regionsPlugin.current],
    });

    waveSurfer.current.on("decode", (duration: number) => {
      setDuration(duration);
      waveSurfer.current?.zoom(20);
      waveSurfer.current?.seekTo(currentTime);
    });

    waveSurfer.current.on("ready", () => {
      setIsReady(true);
    });

    waveSurfer.current.on("audioprocess", (currentAudioTime: number) => {
      setCurrentTime(currentAudioTime);
    });

    waveSurfer.current.registerPlugin(
      ZoomPlugin.create({
        // the amount of zoom per wheel step, e.g. 0.5 means a 50% magnification per scroll
        scale: 0.5,
        // Optionally, specify the maximum pixels-per-second factor while zooming
        maxZoom: 100,
      })
    );

    return () => {
      waveSurfer.current?.destroy();
    };
  }, [containerRef, audioObjectURL]);

  useEffect(() => {
    if (waveSurfer.current && regionsPlugin.current && isReady) {
      regionsPlugin.current.unAll();
      regionsPlugin.current?.clearRegions();
      regions.forEach((region) => regionsPlugin.current?.addRegion({ ...region }));

      regionsPlugin.current.on("region-out", (region: Region) => {
        if (activeRegion.current && activeRegion.current.id === region.id) {
          waveSurfer.current?.pause();
          activeRegion.current = null;
        }
      });

      regionsPlugin.current.on("region-updated", (region: Region) => {
        const { id } = region;
        const cue = cues.find((cue) => cue.key === id);
        if (cue) {
          dispatch({
            type: "UPDATE_CUES",
            payload: cues.map((cue) => {
              if (cue.key === id) {
                return {
                  ...cue,
                  start: formatDurationToISOTime(region.start),
                  end: formatDurationToISOTime(region.end),
                };
              }

              return cue;
            }),
          });
        }
      });

      return () => {
        regionsPlugin.current?.unAll();
        regionsPlugin.current?.clearRegions();
      };
    }
  }, [regions, isReady]);

  const play = useCallback(() => {
    waveSurfer.current?.play();
  }, []);

  const pause = useCallback(() => {
    waveSurfer.current?.pause();
  }, []);

  const stop = useCallback(() => {
    waveSurfer.current?.stop();
  }, []);

  const seek = useCallback((time: number) => {
    waveSurfer.current?.seekTo(time);
  }, []);

  const playRegion = useCallback((id: string) => {
    if (activeRegion) {
      pause();
    }
    const region = regionsPlugin.current?.getRegions().find((region) => region.id === id);
    if (region) {
      activeRegion.current = region;
      seek(region.start);
      region.play();
    }
  }, []);

  return {
    currentTime,
    duration,
    play,
    pause,
    stop,
    seek,
    playRegion,
  };
};
