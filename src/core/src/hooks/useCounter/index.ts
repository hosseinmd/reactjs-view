import { useEffect, useReducer, useRef } from "react";
import {
  getInitialState,
  onDecrement,
  onReset,
  onStart,
  onStop,
  reducer,
} from "./reducer";

type Options = {
  step?: number;
  interval?: number;
  start: number;
  end: number;
  onComplete?: () => void;
};

export const useCounter = ({ start, end, onComplete, ...options }: Options) => {
  const intervalHandle = useRef<any>();
  const [{ canStart, count, isCounting }, dispatch] = useReducer(
    reducer,
    getInitialState(start),
  );

  const startCounting = () => {
    dispatch(onStart(start));
  };

  const stopCounting = () => {
    clearInterval(intervalHandle.current);
    dispatch(onStop());
  };

  const reset = () => {
    clearInterval(intervalHandle.current);
    dispatch(onReset(start));
  };

  useEffect(() => {
    if (!canStart) return;
    if (typeof start !== "number" || typeof end !== "number") return;
    if (start < 0 || end < 0) return;
    const interval = options?.interval || 1000;

    const countingIndex = () => {
      const step = options?.step ?? 1;
      const signedStep = start < end ? step : -step;
      const absStep = Math.abs(count - end);
      if (absStep < step) {
        return start < end ? absStep : -absStep;
      }
      return signedStep;
    };

    if (count === end) {
      stopCounting();
      onComplete && onComplete();
      return;
    }

    intervalHandle.current = setInterval(() => {
      dispatch(onDecrement(count + countingIndex()));
    }, interval);

    return () => clearInterval(intervalHandle.current);
  }, [canStart, count, end, onComplete, options, start]);

  return {
    startCounting,
    reset,
    count,
    isCounting,
  };
};
