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

  const observeMaxQuery = useCallback(
    (query: number) => {
      if (ref?.current) {
        return size <= query;
      }
      if (typeof window === "undefined") return;

      return width <= query;
    },
    [ref, size, width],
  );

  const observeMinQuery = useCallback(
    (query: number) => {
      if (ref?.current) {
        return size > query;
      }
      if (typeof window === "undefined") return;

      return width > query;
    },
    [ref, size, width],
  );

  const observeBetweenQueries = useCallback(
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

  const isLaptop = observeBetweenQueries([768, 1024]);

  const isLargeScreen = observeMaxQuery(1024);

  const isSmallScreen = observeMaxQuery(480);

  const isMediumScreen = observeMaxQuery(768);

  const isExtraLargeScreen = observeMinQuery(1200);

  const isMobile = observeBetweenQueries([320, 480]);

  const isTablet = observeBetweenQueries([480, 768]);

  return {
    observeMaxQuery,
    observeMinQuery,
    observeBetweenQueries,
    isLaptop,
    isTablet,
    isMobile,
    isExtraLargeScreen,
    isLargeScreen,
    isMediumScreen,
    isSmallScreen,
  };
}
