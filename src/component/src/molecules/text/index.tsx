import * as React from "react";
import { Variant } from "../../atoms/view";
import { BaseText, BaseTextProps } from "./base";
import { fonts, fontSizes, fontWeights, useThemes } from "./styles";

interface TextProps extends BaseTextProps {
  theme?: "medium" | "regular" | "light" | "bold" | "semiBold";
  lang?: "fa" | "en";
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
        theme = "regular",
        lang,
        className,
        color,
        style,
        size,
        weight,
        variant,
        ...rest
      },
      ref,
    ) => {
      const themes = useThemes();

      const fontSize = typeof size === "string" ? fontSizes[size] : size;

      const fontWeight =
        typeof weight === "string" ? fontWeights[weight] : weight;

      const setVariant = (): Variant => {
        if (typeof size !== "number" && size?.match(/h(1|2|3|4|5|6)/g)) {
          return size as Variant;
        }
        return "p";
      };

      return (
        <BaseText
          ref={ref}
          variant={variant || setVariant()}
          className={[
            themes[`${theme}${lang ? `-${lang}` : ""}` as keyof typeof themes],
            className,
          ]}
          style={[{ color, fontSize, fontWeight }, style]}
          {...rest}
        />
      );
    },
  ),
);

export { Text, fonts };
export type { TextProps };
