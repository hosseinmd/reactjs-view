import { createUseStyles } from "react-jss";
import RobotoBold from "reactjs-view-asset/fonts/roboto/Roboto-Bold.woff";
import RobotoLight from "reactjs-view-asset/fonts/roboto/Roboto-Light.woff";
import RobotoMedium from "reactjs-view-asset/fonts/roboto/Roboto-Medium.woff";
import RobotoRegular from "reactjs-view-asset/fonts/roboto/Roboto-Regular.woff";
import YekanBakhEnBold from "reactjs-view-asset/fonts/YekanBakh-En-Bold.woff";
import YekanBakhEnLight from "reactjs-view-asset/fonts/YekanBakh-En-Light.woff";
import YekanBakhEnMedium from "reactjs-view-asset/fonts/YekanBakh-En-Medium.woff";
import YekanBakhEnRegular from "reactjs-view-asset/fonts/YekanBakh-En-Regular.woff";
import YekanBakhFaBold from "reactjs-view-asset/fonts/YekanBakh-Fa-Bold.woff";
import YekanBakhFaLight from "reactjs-view-asset/fonts/YekanBakh-Fa-Light.woff";
import YekanBakhFaMedium from "reactjs-view-asset/fonts/YekanBakh-Fa-Medium.woff";
import YekanBakhFaRegular from "reactjs-view-asset/fonts/YekanBakh-Fa-Regular.woff";
import { generateIndex } from "reactjs-view-core";

export const fontWeights = {
  light: 100,
  regular: 400,
  medium: 500,
  bold: 700,
};

export const fontSizes = {
  xxsmall: 10,
  xsmall: 12,
  small: 14,
  medium: 16,
  large: 18,
  xlarge: 20,
  xxlarge: 22,
  h1: 32,
  h2: 24,
  h3: 18.7,
  h4: 16,
  h5: 13.2,
  h6: 10.7,
};

export const fonts = {
  medium: {
    name: "YekanBakhEnMedium",
    url: YekanBakhEnMedium,
    format: "woff",
  },
  "medium-fa": {
    name: "YekanBakhFaMedium",
    url: YekanBakhFaMedium,
    format: "woff",
  },
  "medium-en": {
    name: "RobotoMedium",
    url: RobotoMedium,
    format: "woff",
  },
  regular: {
    name: "YekanBakhEnRegular",
    url: YekanBakhEnRegular,
    format: "woff",
  },
  "regular-fa": {
    name: "YekanBakhFaRegular",
    url: YekanBakhFaRegular,
    format: "woff",
  },
  "regular-en": {
    name: "RobotoRegular",
    url: RobotoRegular,
    format: "woff",
  },
  light: {
    name: "YekanBakhEnLight",
    url: YekanBakhEnLight,
    format: "woff",
  },
  "light-en": {
    name: "RobotoLight",
    url: RobotoLight,
    format: "woff",
  },
  "light-fa": {
    name: "YekanBakhFaLight",
    url: YekanBakhFaLight,
    format: "woff",
  },
  bold: {
    name: "YekanBakhEnBold",
    url: YekanBakhEnBold,
    format: "woff",
  },
  "bold-en": {
    name: "RobotoBold",
    url: RobotoBold,
    format: "woff",
  },
  "bold-fa": {
    name: "YekanBakhFaBold",
    url: YekanBakhFaBold,
    format: "woff",
  },
};

const useThemes = createUseStyles<keyof typeof fonts>(
  {
    ...(Object.fromEntries(
      Object.entries(fonts).map(([key, { name }]) => [
        key,
        {
          fontFamily: name,
        },
      ]),
    ) as any),
    ["@font-face" as any]: Object.values(fonts).map(
      ({ format, name, url }) => ({
        fontFamily: name,
        src: `url(${url}) format('${format}')`,
      }),
    ),
  },
  { index: generateIndex("molecules", "coreModule") },
);

export { useThemes };
