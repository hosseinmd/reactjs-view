import classNames from "classnames";
import React, { CSSProperties, forwardRef, useRef } from "react";
import { createUseStyles } from "react-jss";
import {
  CommonStyles,
  composeRef,
  generateIndex,
  LayoutEvent,
  useElementLayout,
} from "reactjs-view-core";

const useStyles = createUseStyles(
  {
    container: {
      ...CommonStyles.displayFlex,
    },
    pressable: {
      cursor: "pointer",
    },
  },
  {
    index: generateIndex("atoms", "coreModule"),
  },
);

type Style = 0 | false | undefined | CSSProperties | Style[];

interface ViewProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "className" | "style"> {
  onLayout?: (e: LayoutEvent) => void;
  className?: Parameters<typeof classNames>[0];
  style?: Style;
  testID?: string;
  onPress?: (e: any) => void;
}

const View = forwardRef<HTMLDivElement, ViewProps>(
  ({ className, onPress, onClick, onLayout, style, testID, ...rest }, ref) => {
    const classes = useStyles();
    const contentLayoutRef = useRef<any>();

    useElementLayout(contentLayoutRef, onLayout);

    const handleClick = React.useCallback(
      (e) => {
        if (onClick) {
          onClick(e);
        }
        if (onPress) {
          e.stopPropagation();
          onPress(e);
        }
      },
      [onClick, onPress],
    );

    return (
      <div
        ref={composeRef(contentLayoutRef, ref)}
        className={classNames(
          classes.container,
          onPress && classes.pressable,
          className,
        )}
        style={flattenStyle(style)}
        onClick={onClick || onPress ? handleClick : undefined}
        data-testid={testID}
        {...rest}
      />
    );
  },
);

function flattenStyle(style?: ViewProps["style"]): CSSProperties | undefined {
  if (!style) {
    return undefined;
  }

  if (!Array.isArray(style)) {
    return style;
  }

  return style.reduce(
    (prev: CSSProperties, curr) => ({
      ...(prev || {}),
      ...(flattenStyle(curr) || {}),
    }),
    {} as CSSProperties,
  ) as CSSProperties;
}

export { View, flattenStyle };
export type { ViewProps };
