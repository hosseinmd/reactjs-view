declare module "*.png" {
  const value: any;
  export default value;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare namespace globalThis {
  export const __DEV__: boolean;
  export const __MOCK__: boolean;
  export interface CSSRule {
    style: any;
    styleMap: any;
    selectorText: string;
  }
}
