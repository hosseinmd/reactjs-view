import { CSSProperties } from "react";

const CommonStyles = {
  fit: {
    flex: 1,
  } as CSSProperties,
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as CSSProperties,
  absoluteFill: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  } as CSSProperties,
  displayFlex: {
    WebkitBoxAlign: "stretch",
    WebkitBoxDirection: "normal",
    WebkitBoxOrient: "vertical",
    alignItems: "stretch",
    border: "0px solid black",
    boxSizing: "border-box",
    display: "flex",
    flexBasis: "auto",
    flexDirection: "column",
    flexShrink: 0,
    margin: 0,
    minHeight: 0,
    minWidth: 0,
    padding: 0,
    position: "relative",
    zIndex: 0,
    marginBlockEnd: 0,
    marginBlockStart: 0,
    marginInlineEnd: 0,
    marginInlineStart: 0,
  } as CSSProperties,
  horizontalScroll: {
    flexDirection: "row",
    overflowX: "auto",
    overflowY: "hidden",
    flexGrow: 1,
    flexShrink: 1,
  } as CSSProperties,
  verticalScroll: {
    overflowY: "auto",
    overflowX: "hidden",
    flexGrow: 1,
    flexShrink: 1,
  } as CSSProperties,
  drawerStyle: {
    margin: 24,
    padding: 24,
    backgroundColor: "white",
    borderRadius: 10,
    minHeight: "fit-content",
  } as CSSProperties,
  scrollbarCSS: (
    isHorizontal?: boolean,
    trackColor: string = "transparent",
    thumbColor: string = "#91a8c3",
  ) => ({
    scrollbarWidth: "thin",
    scrollbarColor: `${thumbColor} ${trackColor}`,
    "&::-webkit-scrollbar": isHorizontal
      ? {
          height: 8,
        }
      : {
          width: 8,
        },
    "&::-webkit-scrollbar-track": {
      background: trackColor,
    },
    "&::-webkit-scrollbar-thumb": {
      background: thumbColor,
      visibility: "hidden",
      borderRadius: 20,
    },
    "&:hover": {
      "&::-webkit-scrollbar-thumb": {
        visibility: "visible",
      },
    },
  }),
};

export { CommonStyles };
