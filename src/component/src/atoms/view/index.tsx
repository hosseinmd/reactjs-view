import classNames from "classnames";
import React, {
  createElement,
  CSSProperties,
  forwardRef,
  ReactNode,
  useRef,
} from "react";
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
      userSelect: "none",
    },
  },
  {
    index: generateIndex("atoms", "coreModule"),
  },
);

type Style = 0 | false | undefined | CSSProperties | Style[];

export type Variant =
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
  extends Omit<
    React.HTMLAttributes<HTMLElement>,
    "className" | "style" | "children"
  > {
  onLayout?: (e: LayoutEvent) => void;
  className?: Parameters<typeof classNames>[0];
  style?: Style;
  testID?: string;
  href?: string;
  variant?: Variant;
  children?: ReactNode | ReactNode[] | null;
  onPress?: (e: any) => void;
}

/**
 * Inspired from react-native View
 *
 * ```js
 * import { View } from "reactjs-view";
 *
 * function MyComponent() {
 *   return (
 *     <View style={{ alignItems: "center" }}>
 *       <View
 *         variant="a"
 *         href="/"
 *         onPress={() => {
 *           history.push("/");
 *         }}
 *         style={{ width: 300, height: 50 }}
 *       >
 *         <Text>Hello World</Text>
 *       </View>
 *     </View>
 *   );
 * }
 * ```
 */
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
    variant = variant || (href ? "a" : "div");
    const classes = useStyles();
    const contentLayoutRef = useRef<any>();

    useElementLayout(contentLayoutRef, onLayout);

    const handleClick = React.useCallback(
      (e: any) => {
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
      href,
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
