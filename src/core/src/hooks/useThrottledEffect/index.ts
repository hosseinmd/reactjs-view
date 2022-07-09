import { useEffect, useLayoutEffect, useRef } from "react";
import { useEvent } from "../useEvent";

const useThrottledEffect = (
  callBack: () => void,
  {
    deps,
    delay = 200,
    ignoreInFirstCall = true,
    callingAfterUnmount = false,
  }: {
    deps: any[];
    /** Millisecond default is `200` */
    delay?: number;
    /** Default is `true` */
    ignoreInFirstCall?: boolean;
    /** Default is `false` */
    callingAfterUnmount?: boolean;
  },
) => {
  const event = useEvent(callBack);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const hasNextValue = useRef(false);
  const isMounted = useRef(false);

  useLayoutEffect(() => {
    if (!isMounted.current && ignoreInFirstCall) {
      isMounted.current = true;
      return;
    }
    if (!timeout.current) {
      event();

      const timeoutCallback = () => {
        if (hasNextValue.current) {
          hasNextValue.current = false;
          event();
          timeout.current = setTimeout(timeoutCallback, delay);
        } else {
          timeout.current = undefined;
        }
      };
      timeout.current = setTimeout(timeoutCallback, delay);
    } else {
      hasNextValue.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay, ...deps]);

  const clear = useEvent(() => {
    if (!callingAfterUnmount && timeout.current) {
      clearTimeout(timeout.current);
    }
  });

  useEffect(() => {
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export { useThrottledEffect };
