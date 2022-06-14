import { useEffect, useLayoutEffect, useRef, useState } from "react";

const useThrottle = <T>(value: T, ms = 200) => {
  const [state, setState] = useState<T>(value);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const nextValue = useRef(null) as any;
  const hasNextValue = useRef(0) as any;

  useLayoutEffect(() => {
    if (!timeout.current) {
      setState(value);

      const timeoutCallback = () => {
        if (hasNextValue.current) {
          hasNextValue.current = false;
          setState(nextValue.current);
          timeout.current = setTimeout(timeoutCallback, ms);
        } else {
          timeout.current = undefined;
        }
      };
      timeout.current = setTimeout(timeoutCallback, ms);
    } else {
      nextValue.current = value;
      hasNextValue.current = true;
    }
  }, [ms, value]);

  useEffect(() => {
    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, []);
  return state;
};

export { useThrottle };
