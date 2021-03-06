import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import {
  EXTRA_LARGE_SCREEN,
  LARGE_SCREEN,
  MEDIUM_SCREEN,
  SMALL_SCREEN,
} from "../../constants";

export function useObserveElement<S extends HTMLElement>(ref: RefObject<S>) {
  const [size, setSize] = useState<number>(0);
  const isInitialRef = useRef<boolean>(false);

  useEffect(() => {
    if (!ref?.current || isInitialRef.current) return;

    const node = ref.current;

    const bounds = node.getBoundingClientRect();

    if (bounds) {
      setSize(bounds.width);
      isInitialRef.current = true;
    }
  }, [ref]);

  useEffect(() => {
    if (!ref?.current) return;
    const node = ref.current;

    const observer = new ResizeObserver(([entry]) => {
      setSize(entry?.contentRect?.width);
    });

    observer.observe(node, { box: "border-box" });

    return () => observer.unobserve(node);
  }, [ref]);

  const getIsWidthSmallerThan = useCallback(
    (query: number) => {
      return size <= query;
    },
    [size],
  );

  const getIsWidthLargerThan = useCallback(
    (query: number) => {
      return size > query;
    },
    [size],
  );

  const getIsWidthBetween = useCallback(
    (queries: [number, number]) => {
      if (queries[0] >= queries[1]) {
        throw new Error(
          `The second query: ${queries[1]}px must be greater than the first query: ${queries[0]}px`,
        );
      }

      return size > queries[0] && size <= queries[1];
    },
    [size],
  );

  const isSmallerThenLarge = getIsWidthSmallerThan(LARGE_SCREEN);

  const isSmallerThanSmall = getIsWidthSmallerThan(SMALL_SCREEN);

  const isSmallerThanMedium = getIsWidthSmallerThan(MEDIUM_SCREEN);

  const isSmallerThanExtraLarge = getIsWidthLargerThan(EXTRA_LARGE_SCREEN);

  return {
    getIsWidthSmallerThan,
    getIsWidthLargerThan,
    getIsWidthBetween,
    isSmallerThanExtraLarge,
    isSmallerThenLarge,
    isSmallerThanMedium,
    isSmallerThanSmall,
  };
}
