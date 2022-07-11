import { useRef } from "react";
import { useEvent } from "../useEvent";

/** Callback will call by requestAnimationFrame cancel after animation frame */
const useDebounceAnimationFrameCallback = <T extends (...args: any) => void>(
  callback: T,
) => {
  const refTimeout = useRef<number>();

  return useEvent((...args: any) => {
    if (refTimeout.current) {
      cancelAnimationFrame(refTimeout.current);
    }
    refTimeout.current = requestAnimationFrame(() => callback(...args));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }) as T;
};

export { useDebounceAnimationFrameCallback };
