import { DocsContainer, DocsPage } from "@storybook/addon-docs";
import { addDecorator, addParameters } from "@storybook/react";
import { withDirection } from "storybook-rtl-addon";
import ThemeDecorator, { theme } from "./manager";

addParameters({
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: { theme },
  layout: "padded",
  fileName: "Reactjs-View",
  locales: {
    en: { dir: "ltr", name: "انگلیسی", text: "English" },
    fa: { dir: "rtl", name: "فارسی", text: "فارسی" },
  },
  defaultLocale: "fa",
  enableLocaleLockButton: true,
  backgrounds: { disable: true },
  themes: {
    default: "Reactjs-View",
    list: [
      {
        ...theme,
        name: "Reactjs-View",
      },
    ],
  },
  docs: {
    container: DocsContainer,
    page: DocsPage,
  },
});

addDecorator(ThemeDecorator);
addDecorator(withDirection);
