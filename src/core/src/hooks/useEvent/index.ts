import { useCallback, useRef } from "react";

/**
 * You can wrap any event handler into useEvent.
 *
 * @example
 *   function Chat() {
 *     const [text, setText] = useState("");
 *
 *     const onClick = useEvent(() => {
 *       sendMessage(text);
 *     });
 *
 *     return <SendButton onClick={onClick} />;
 *   }
 *
 * @param callback
 * @link https://github.com/reactjs/rfcs/blob/useevent/text/0000-useevent.md
 */
const useEvent = <T extends (...arg: any[]) => any>(callback: T) => {
  const event = useRef<T>();

  if (event.current !== callback) {
    event.current = callback;
  }

  return useCallback((...arg: any[]) => {
    return event.current?.(...arg);
  }, []) as T;
};

export { useEvent };
