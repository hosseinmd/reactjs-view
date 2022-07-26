import {
  AnyHandlerEventTypes,
  GestureHandlers,
  useGesture,
} from "@use-gesture/react";
import { useState } from "react";

/**
 * @example
 *   const { isTabFocused, eventHandlers } = useInteractions();
 *
 *   return <button {...eventHandlers()} />;
 */
function useInteractions<HandlerTypes extends AnyHandlerEventTypes>({
  onHover,
  onBlur,
  onFocus,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  onKeyUp,
  ...handlers
}: GestureHandlers<HandlerTypes> = {}) {
  const usedProperty: string[] = [];
  const [isFocused, setFocused] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const [isActive, setActive] = useState(false);
  const [isTabFocused, setTabFocused] = useState(false);

  const eventHandlers = useGesture({
    ...handlers,
    // focus
    onFocus(...args) {
      usedProperty.includes("isFocused") && setFocused(true);

      onFocus?.(...args);
    },
    onBlur(...args) {
      usedProperty.includes("isFocused") && setFocused(false);
      usedProperty.includes("isTabFocused") &&
        isTabFocused &&
        setTabFocused(false);

      onBlur?.(...args);
    },
    // Hover
    onHover(hover) {
      const { hovering: isHovering } = hover;
      usedProperty.includes("isHovered") && setHovered(Boolean(isHovering));

      onHover?.(hover);
    },
    // Active
    onMouseDown(...args) {
      usedProperty.includes("isActive") && setActive(true);

      onMouseDown?.(...args);
    },
    onMouseUp(...args) {
      usedProperty.includes("isActive") && setActive(false);

      onMouseUp?.(...args);
    },
    onMouseLeave(...args) {
      usedProperty.includes("isActive") && setActive(false);

      onMouseLeave?.(...args);
    },
    onKeyUp(state, ...args) {
      const { event } = state;
      if ((event as any).key === "Tab") {
        usedProperty.includes("isTabFocused") && setTabFocused(true);
      }

      onKeyUp?.(state, ...args);
    },
  });

  const target = {
    eventHandlers,
    isFocused,
    isHovered,
    isActive,
    isTabFocused,
  };

  const proxyHandler = {
    get: function (target: any, prop: string) {
      usedProperty.push(prop);
      return target[prop];
    },
  };

  const proxy3 = new Proxy<typeof target>(target, proxyHandler);

  return proxy3;
}

export { useInteractions };
