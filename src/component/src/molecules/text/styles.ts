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
};

const useThemes = createUseStyles<
  | "medium"
  | "medium-fa"
  | "medium-en"
  | "regular"
  | "regular-fa"
  | "regular-en"
  | "light"
  | "light-en"
  | "light-fa"
  | "bold"
  | "bold-en"
  | "bold-fa"
>(
  {
    medium: {
      fontFamily: "yekanBakhMedium",
    },
    "medium-fa": {
      fontFamily: "yekanBakhFaMedium",
    },
    "medium-en": {
      fontFamily: "RobotoMedium",
    },
    regular: {
      fontFamily: "yekanBakhRegular",
    },
    "regular-fa": {
      fontFamily: "yekanBakhFaRegular",
    },
    "regular-en": {
      fontFamily: "RobotoRegular",
    },
    light: {
      fontFamily: "yekanBakhLight",
    },
    "light-en": {
      fontFamily: "RobotoLight",
    },
    "light-fa": {
      fontFamily: "yekanBakhFaLight",
    },
    bold: {
      fontFamily: "yekanBakhBold",
    },
    "bold-en": {
      fontFamily: "RobotoBold",
    },
    "bold-fa": {
      fontFamily: "yekanBakhFaBold",
    },
    ["@font-face" as any]: [
      {
        fontFamily: "yekanBakhLight",
        src: `url(${YekanBakhEnLight}) format('woff')`,
      },
      {
        fontFamily: "yekanBakhRegular",
        src: `url(${YekanBakhEnRegular}) format('woff')`,
      },
      {
        fontFamily: "yekanBakhMedium",
        src: `url(${YekanBakhEnMedium}) format('woff')`,
      },
      {
        fontFamily: "yekanBakhBold",
        src: `url(${YekanBakhEnBold}) format('woff')`,
      },
      {
        fontFamily: "yekanBakhFaLight",
        src: `url(${YekanBakhFaLight}) format('woff')`,
      },
      {
        fontFamily: "yekanBakhFaRegular",
        src: `url(${YekanBakhFaRegular}) format('woff')`,
      },

      {
        fontFamily: "yekanBakhFaMedium",
        src: `url(${YekanBakhFaMedium}) format('woff')`,
      },
      {
        fontFamily: "yekanBakhFaBold",
        src: `url(${YekanBakhFaBold}) format('woff')`,
      },
      {
        fontFamily: "RobotoRegular",
        src: `url(${RobotoRegular}) format('woff')`,
      },
      {
        fontFamily: "RobotoLight",
        src: `url(${RobotoLight}) format('woff')`,
      },
      {
        fontFamily: "RobotoMedium",
        src: `url(${RobotoMedium}) format('woff')`,
      },
      {
        fontFamily: "RobotoBold",
        src: `url(${RobotoBold}) format('woff')`,
      },
    ],
  },
  { index: generateIndex("molecules", "coreModule") },
);

export { useThemes };
