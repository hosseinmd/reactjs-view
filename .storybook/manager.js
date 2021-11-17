import { addons, useStoryContext } from "@storybook/addons";
import { DecoratorFn } from "@storybook/react";
import { create } from "@storybook/theming";
import React from "react";
import { ThemeProvider } from "react-jss";
import "./title";

export const theme = create({
  base: "light",
  fontBase: "YekanBakhFaRegular, sans-serif",
  fontCode: "monospace",
  brandTitle: "Reactjs-View",
  brandUrl: "http://design.Reactjs-View.com",
  brandImage: undefined,
});

addons.setConfig({
  theme: theme,
  enableShortcuts: true,
  initialActive: "sidebar",
  isFullscreen: false,
});

/** @type {DecoratorFn} */
const ThemeDecorator = (story, context) => {
  const { id: storyId } = useStoryContext();

  return (
    <ThemeProvider theme={theme}>
      <div
        style={{
          width: "100%",
          display: "flex",
          flex: 1,
        }}
      >
        {storyId ? story(context) : <div>کامپوننتی یافت نشد</div>}
      </div>
    </ThemeProvider>
  );
};

export default ThemeDecorator;
