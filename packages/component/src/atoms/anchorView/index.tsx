import classNames from "classnames";
import React, { CSSProperties, ForwardedRef, forwardRef, useRef } from "react";
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
  },
  {
    index: generateIndex("atoms", "module"),
  },
);

interface AnchorViewProps
  extends Omit<
    React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    "className" | "style"
  > {
  onLayout?: (e: LayoutEvent) => void;
  className?: Parameters<typeof classNames>[0];
  style?: CSSProperties | CSSProperties[];
}
/**
 * This is an a tag with View Standard implementation
 *
 * @example
 *   const Comp = () => (
 *     <AnchorView href="example.com" style={{ flex: 1 }}>
 *       <ComplexView />
 *     </AnchorView>
 *   );
 */
const AnchorView = forwardRef<HTMLAnchorElement, AnchorViewProps>(
  (
    { className, onLayout, style, ...rest },
    ref: ForwardedRef<HTMLAnchorElement>,
  ) => {
    const classes = useStyles();
    const contentLayoutRef = useRef<any>();

    useElementLayout(contentLayoutRef, onLayout);

    return (
      <a
        ref={composeRef(contentLayoutRef, ref)}
        className={classNames(classes.container, className)}
        style={flattenStyle(style)}
        {...rest}
      />
    );
  },
);

function flattenStyle(
  style?: CSSProperties | CSSProperties[],
): CSSProperties | undefined {
  if (!style) {
    return undefined;
  }

  if (!Array.isArray(style)) {
    return style;
  }

  return style.reduce((prev, curr) => ({
    ...prev,
    ...flattenStyle(curr),
  }));
}

export { AnchorView };
export type { AnchorViewProps };
