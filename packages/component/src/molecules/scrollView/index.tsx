import classNames from "classnames";
import { forwardRef, useEffect, useRef } from "react";
import { createUseStyles } from "react-jss";
import { CommonStyles, generateIndex } from "reactjs-view-core";
import { View, ViewProps } from "../../atoms/view";

const useStyle = createUseStyles(
  {
    horizontalView: {
      ...CommonStyles.horizontalScroll,
      ...CommonStyles.scrollbarCSS(true),
    },
    verticalView: {
      ...CommonStyles.verticalScroll,
      ...CommonStyles.scrollbarCSS(false),
    },
  },
  {
    index: generateIndex("molecules", "module"),
  },
);

export interface ScrollViewProps extends ViewProps {
  isHorizontal?: boolean;
  contentContainerClassName?: string;
}

const ScrollView = forwardRef<HTMLDivElement, ScrollViewProps>(
  ({ isHorizontal, children, contentContainerClassName, ...rest }, ref) => {
    const classes = useStyle();
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!scrollContainerRef.current || !isHorizontal) return;
      const node = scrollContainerRef.current;

      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        node.scrollLeft += e.deltaY;
      };

      node.addEventListener("wheel", onWheel);

      return () => {
        node.removeEventListener("wheel", onWheel);
      };
    }, [isHorizontal]);

    return (
      <View {...rest} ref={ref}>
        <View
          ref={scrollContainerRef}
          className={classNames(
            isHorizontal ? classes.horizontalView : classes.verticalView,
            contentContainerClassName,
          )}
        >
          {children}
        </View>
      </View>
    );
  },
);

export { ScrollView };
