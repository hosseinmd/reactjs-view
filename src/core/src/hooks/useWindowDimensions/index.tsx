import { useEffect, useState } from "react";
import { useEvent } from "../useEvent";

export type Size = { width: number; height: number };

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } =
    typeof window === "undefined"
      ? {
          innerWidth: 1024,
          innerHeight: 768,
        }
      : window;

  return {
    width,
    height,
  };
}
/**
 * This was implemented with proxy because of perf, so destructor response
 *
 * @example
 *   const { width, height } = useWindowDimensions();
 */
function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState<Size>(
    getWindowDimensions(),
  );

  const targetProps: (keyof Size)[] = [];

  const handleResize = useEvent(() => {
    const { width, height } = getWindowDimensions();
    if (
      (width !== windowDimensions.width && targetProps.includes("width")) ||
      (height !== windowDimensions.height && targetProps.includes("height"))
    ) {
      setWindowDimensions({ width, height });
    }
  });

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return new Proxy(windowDimensions, {
    get(target, prop) {
      targetProps.push(prop as any);
      return target[prop as keyof Size];
    },
  });
}

export { getWindowDimensions, useWindowDimensions };
