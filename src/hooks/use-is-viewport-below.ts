import { useEffect, useState } from "react";

export function useIsViewportBelow(minWidth: number) {
  const [isBelow, setIsBelow] = useState(() => window.innerWidth < minWidth);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      setIsBelow(window.innerWidth < minWidth);
    });
    observer.observe(document.documentElement);
    return () => observer.disconnect();
  }, [minWidth]);

  return isBelow;
}
