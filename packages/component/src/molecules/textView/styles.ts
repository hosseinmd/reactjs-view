//@ts-ignore
import RobotoBold from "plus-base-asset/fonts/roboto/Roboto-Bold.woff";
//@ts-ignore
import RobotoLight from "plus-base-asset/fonts/roboto/Roboto-Light.woff";
//@ts-ignore
import RobotoMedium from "plus-base-asset/fonts/roboto/Roboto-Medium.woff";
//@ts-ignore
import RobotoRegular from "plus-base-asset/fonts/roboto/Roboto-Regular.woff";
//@ts-ignore
import YekanBakhEnBold from "plus-base-asset/fonts/YekanBakh-En-Bold.woff";
//@ts-ignore
import YekanBakhEnLight from "plus-base-asset/fonts/YekanBakh-En-Light.woff";
//@ts-ignore
import YekanBakhEnMedium from "plus-base-asset/fonts/YekanBakh-En-Medium.woff";
//@ts-ignore
import YekanBakhEnRegular from "plus-base-asset/fonts/YekanBakh-En-Regular.woff";
//@ts-ignore
import YekanBakhFaBold from "plus-base-asset/fonts/YekanBakh-Fa-Bold.woff";
//@ts-ignore
import YekanBakhFaLight from "plus-base-asset/fonts/YekanBakh-Fa-Light.woff";
//@ts-ignore
import YekanBakhFaMedium from "plus-base-asset/fonts/YekanBakh-Fa-Medium.woff";
//@ts-ignore
import YekanBakhFaRegular from "plus-base-asset/fonts/YekanBakh-Fa-Regular.woff";
import { createUseStyles, jss } from "react-jss";
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

const useThemes = createUseStyles(
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
  },
  { index: generateIndex("atoms", "module") },
);

jss
  .createStyleSheet({
    "@font-face": [
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
  })
  .attach();

export { useThemes };
