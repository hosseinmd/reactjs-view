import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { useWindowDimensions } from "../useWindowDimensions";

export function useObserveElement<S extends HTMLElement>(ref?: RefObject<S>) {
  const [size, setSize] = useState<number>(0);
  const isInitialRef = useRef<boolean>(false);
  const { width } = useWindowDimensions();

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

  const isWidthSmallerThan = useCallback(
    (query: number) => {
      if (ref?.current) {
        return size <= query;
      }
      if (typeof window === "undefined") return;

      return width <= query;
    },
    [ref, size, width],
  );

  const isWidthLargerThan = useCallback(
    (query: number) => {
      if (ref?.current) {
        return size > query;
      }
      if (typeof window === "undefined") return;

      return width > query;
    },
    [ref, size, width],
  );

  const isWidthBetween = useCallback(
    (queries: [number, number]) => {
      if (queries[0] >= queries[1]) {
        throw new Error(
          `The second query: ${queries[1]}px must be greater than the first query: ${queries[0]}px`,
        );
      }

      if (ref?.current) {
        return size > queries[0] && size <= queries[1];
      }
      if (typeof window === "undefined") return;

      return width > queries[0] && width <= queries[1];
    },
    [ref, size, width],
  );

  const isLaptop = isWidthBetween([768, 1024]);

  const isLargeScreen = isWidthSmallerThan(1024);

  const isSmallScreen = isWidthSmallerThan(480);

  const isMediumScreen = isWidthSmallerThan(768);

  const isExtraLargeScreen = isWidthLargerThan(1200);

  const isMobile = isWidthBetween([320, 480]);

  const isTablet = isWidthBetween([480, 768]);

  return {
    /** @deprecated Use isWidthSmallerThan instead */
    observeMaxQuery: isWidthSmallerThan,
    isWidthSmallerThan,
    /** @deprecated Use isWidthLargerThan instead */
    observeMinQuery: isWidthLargerThan,
    isWidthLargerThan,
    /** @deprecated Use isWidthBetween instead */
    observeBetweenQueries: isWidthBetween,
    isWidthBetween,
    /** @deprecated */
    isLaptop,
    /** @deprecated */
    isTablet,
    /** @deprecated */
    isMobile,
    isExtraLargeScreen,
    isLargeScreen,
    isMediumScreen,
    isSmallScreen,
  };
}
