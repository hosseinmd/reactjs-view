import { useGesture } from "@use-gesture/react";
import { useState } from "react";

/**
 * @example
 *   const { isTabFocused, eventHandlers } = useInteractions();
 *
 *   return <button {...eventHandlers()} />;
 */
function useInteractions() {
  const usedProperty: string[] = [];
  const [isFocused, setFocused] = useState(false);
  const [isHovered, setHovered] = useState(false);
  const [isActive, setActive] = useState(false);
  const [isTabFocused, setTabFocused] = useState(false);

  const eventHandlers = useGesture({
    // focus
    onFocus() {
      usedProperty.includes("isFocused") && setFocused(true);
    },
    onBlur() {
      usedProperty.includes("isFocused") && setFocused(false);
      usedProperty.includes("isTabFocused") &&
        isTabFocused &&
        setTabFocused(false);
    },
    // Hover
    onHover(onHover) {
      const { hovering: isHovering } = onHover;
      usedProperty.includes("isHovered") && setHovered(Boolean(isHovering));
    },
    // Active
    onMouseDown() {
      usedProperty.includes("isActive") && setActive(true);
    },
    onMouseUp() {
      usedProperty.includes("isActive") && setActive(false);
    },
    onMouseLeave() {
      usedProperty.includes("isActive") && setActive(false);
    },
    onKeyUp({ event }) {
      if ((event as any).key === "Tab") {
        usedProperty.includes("isTabFocused") && setTabFocused(true);
      }
    },
  });

  const target = {
    eventHandlers,
    isFocused,
    isHovered,
    isActive,
    isTabFocused,
  };

  const handler3 = {
    get: function (target: any, prop: string) {
      usedProperty.push(prop);
      return target[prop];
    },
  };

  const proxy3 = new Proxy<typeof target>(target, handler3);

  return proxy3;
}

export { useInteractions };
