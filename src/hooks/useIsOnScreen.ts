import React, { MutableRefObject } from "react";

function useIsOnscreen(wrapperRef: MutableRefObject<Element | undefined>) {
  const [isOnScreen, setIsOnScreen] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      console.log("update");

      setIsOnScreen(entry.isIntersecting);
    });

    observer.observe(wrapperRef.current!);

    return () => observer.disconnect();
  }, [wrapperRef]);

  return isOnScreen;
}

export default useIsOnscreen;
