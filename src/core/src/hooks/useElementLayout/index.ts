import { RefObject, useEffect } from "react";
import { useWindowDimensions } from "../useWindowDimensions";

const canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

const DOM_LAYOUT_HANDLER_NAME = "__reactLayoutHandler";

let didWarn = false;
//@ts-ignores
let resizeObserver = null;

function getResizeObserver(): any {
  //@ts-ignore
  if (canUseDOM && typeof window.ResizeObserver !== "undefined") {
    //@ts-ignore
    if (resizeObserver == null) {
      //@ts-ignore
      resizeObserver = new window.ResizeObserver(function (entries) {
        entries.forEach((entry: any) => {
          const node = entry.target;
          const onLayout = node[DOM_LAYOUT_HANDLER_NAME];
          if (typeof onLayout === "function") {
            // We still need to measure the view because browsers don't yet provide
            // border-box dimensions in the entry
            //@ts-ignore
            measure(
              node,
              //@ts-ignore
              (x, y, width, height, left, top) => {
                const event = {
                  // $FlowFixMe
                  nativeEvent: {
                    layout: { x, y, width, height, left, top },
                  },
                  timeStamp: Date.now(),
                };
                Object.defineProperty(event.nativeEvent, "target", {
                  enumerable: true,
                  get: () => entry.target,
                });
                onLayout(event);
              },
            );
          }
        });
      });
    }
  } else if (!didWarn) {
    if (
      process.env.NODE_ENV !== "production" &&
      process.env.NODE_ENV !== "test"
    ) {
      console.warn(
        "onLayout relies on ResizeObserver which is not supported by your browser. " +
          "Please include a polyfill, e.g., https://github.com/que-etc/resize-observer-polyfill.",
      );
      didWarn = true;
    }
  }
  //@ts-ignore
  return resizeObserver;
}

type LayoutValue = {
  x: number;
  y: number;
  left: number;
  top: number;
  width: number;
  height: number;
};

export type LayoutEvent = {
  nativeEvent: {
    layout: LayoutValue;
    target: any;
  };
  timeStamp: number;
};

function useElementLayout(
  ref: RefObject<any>,
  onLayout?: (e: LayoutEvent) => void,
) {
  const { width, height } = useWindowDimensions();
  const observer = getResizeObserver();

  useEffect(() => {
    const node = ref.current;
    if (node != null) {
      node[DOM_LAYOUT_HANDLER_NAME] = onLayout;
    }
  }, [ref, onLayout]);

  // Observing is done in a separate effect to avoid this effect running
  // when 'onLayout' changes.
  useEffect(() => {
    const node = ref.current;
    if (node != null && observer != null) {
      if (typeof node[DOM_LAYOUT_HANDLER_NAME] === "function") {
        observer.observe(node);
      } else {
        observer.unobserve(node);
      }
    }
    return () => {
      if (node != null && observer != null) {
        observer.unobserve(node);
      }
    };
  }, [ref, observer, width, height]);
}

const getBoundingClientRect = (node?: HTMLElement) => {
  if (node != null) {
    const isElement = node.nodeType === 1; /* Node.ELEMENT_NODE */
    if (isElement && typeof node.getBoundingClientRect === "function") {
      return node.getBoundingClientRect();
    }
  }
};

//@ts-ignore
const measureLayout = (node, relativeToNativeNode, callback) => {
  const relativeNode = relativeToNativeNode || (node && node.parentNode);
  if (node && relativeNode) {
    setTimeout(() => {
      const relativeRect = getBoundingClientRect(relativeNode);
      const { height, left, top, width } = getRect(node);
      //@ts-ignore

      const x = left - relativeRect.left;
      //@ts-ignore

      const y = top - relativeRect.top;
      callback(x, y, width, height, left, top);
    }, 0);
  }
};
//@ts-ignore

const getRect = (node) => {
  // Unlike the DOM's getBoundingClientRect, React Native layout measurements
  // for "height" and "width" ignore scale transforms.
  // https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
  const { x, y, top, left } = getBoundingClientRect(node) as any;
  const width = node.offsetWidth;
  const height = node.offsetHeight;
  return { x, y, width, height, top, left };
};

function measure(node: any, callback: any) {
  measureLayout(node, null, callback);
}

export { useElementLayout };
