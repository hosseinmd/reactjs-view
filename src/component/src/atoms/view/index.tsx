import classNames from "classnames";
import React, { createElement, CSSProperties, forwardRef, useRef } from "react";
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

type Variant =
  | "div"
  | "a"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "article"
  | "p"
  | "main"
  | "section";

interface ViewProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "className" | "style"> {
  onLayout?: (e: LayoutEvent) => void;
  className?: Parameters<typeof classNames>[0];
  style?: Style;
  testID?: string;
  href?: string;
  variant?: Variant;
  onPress?: (e: any) => void;
}

const View = forwardRef<HTMLElement, ViewProps>(
  (
    {
      className,
      onPress,
      onClick,
      onLayout,
      style,
      testID,
      href,
      variant,
      ...rest
    },
    ref,
  ) => {
    variant ||= href ? "a" : "div";
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

    const Element = createElement(variant, {
      ref: composeRef(contentLayoutRef, ref),
      className: classNames(
        classes.container,
        onPress && classes.pressable,
        className,
      ),
      style: flattenStyle(style),
      onClick: onClick || onPress ? handleClick : undefined,
      "data-testid": testID,
      ...rest,
    });

    return Element;
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
