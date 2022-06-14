import { useEffect, useState } from "react";

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
function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState<Size>(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

export { getWindowDimensions, useWindowDimensions };
