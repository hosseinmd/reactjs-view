import * as React from "react";
import { BaseText, BaseTextProps } from "./base";
import { fontSizes, fontWeights, useThemes } from "./styles";

interface TextProps extends BaseTextProps {
  theme?:
    | "medium"
    | "regular"
    | "light"
    | "bold"
    | "medium-fa"
    | "regular-fa"
    | "bold-fa"
    | "light-fa"
    | "regular-en"
    | "medium-en"
    | "light-en"
    | "bold-en";
  weight?: keyof typeof fontWeights | number;
  color?: string;
  /**
   * Sizes
   *
   * - Xxsmall: 10,
   * - Xsmall: 12,
   * - Small: 14,
   * - Medium: 16,
   * - Large: 18,
   * - Xlarge: 20,
   * - Xxlarge: 22,
   */
  size?: keyof typeof fontSizes | number;
}

const Text = React.memo(
  React.forwardRef<any, TextProps>(
    (
      {
        theme = "regular-fa",
        className,
        color,
        style,
        size = "medium",
        weight = "medium",
        ...rest
      },
      ref,
    ) => {
      const themes = useThemes();
      const fontSize = typeof size === "number" ? size : fontSizes[size];
      const fontWeight =
        typeof weight === "number" ? weight : fontWeights[weight];

      return (
        <BaseText
          ref={ref}
          className={[themes[theme], className]}
          style={[{ color, fontSize, fontWeight }, style]}
          {...rest}
        />
      );
    },
  ),
);

export { Text };
export type { TextProps };
