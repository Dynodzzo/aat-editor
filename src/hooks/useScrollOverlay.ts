import { useState } from "react";

type ScrollOverlayOptions = {
  threshold: number;
};

const DEFAULT_OPTIONS: ScrollOverlayOptions = {
  threshold: 0,
};

export const useScrollOverlay = ({ threshold }: ScrollOverlayOptions = DEFAULT_OPTIONS) => {
  const [showScrollOverlay, setShowScrollOverlay] = useState(false);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const maxScrollTop = event.currentTarget.scrollHeight - event.currentTarget.clientHeight;
    const isNearBottom = event.currentTarget.scrollTop >= maxScrollTop - threshold;
    setShowScrollOverlay(!isNearBottom);
  };

  return { showScrollOverlay, handleScroll };
};
