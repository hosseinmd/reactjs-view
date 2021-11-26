import * as React from "react";
import { jss } from "react-jss";
import { generateIndex } from "reactjs-view-core";
import { View, ViewProps } from "../../atoms/view";

export interface BaseTextProps extends ViewProps {
  dir?: "auto" | "ltr" | "rtl";
  numberOfLines?: number;
  selectable?: boolean;
}

/** Inspired of React-native Text */
const BaseText = React.forwardRef<any, BaseTextProps>(
  (
    {
      dir,
      numberOfLines,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      selectable,
      className,
      style,
      ...rest
    },
    forwardedRef,
  ) => {
    return (
      <View
        ref={forwardedRef}
        dir={dir != null ? dir : "auto"}
        className={[
          classes.text,
          selectable === true && classes.selectable,
          selectable === false && classes.notSelectable,
          numberOfLines != null && classes.textMultiLine,
          className,
        ]}
        style={[style, numberOfLines && { WebkitLineClamp: numberOfLines }]}
        {...rest}
      />
    );
  },
);

const classes = jss
  .createStyleSheet(
    {
      text: {
        border: "0 solid black",
        boxSizing: "border-box",
        color: "black",
        display: "inline",
        fontSize: 14,
        margin: 0,
        padding: 0,
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
      },
      // See #13
      textMultiLine: {
        display: "-webkit-box",
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        // whiteSpace: "pre",
        WebkitBoxOrient: "vertical",
      },
      notSelectable: {
        userSelect: "none",
      },
      selectable: {
        userSelect: "text",
      },
    },
    {
      index: generateIndex("molecules", "coreModule"),
    },
  )
  .attach().classes;

BaseText.displayName = "BaseText";

export { BaseText };
