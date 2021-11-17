import { createUseStyles } from "react-jss";
import { CommonStyles, generateIndex } from "reactjs-view-core";

export default createUseStyles(
  {
    loader: {
      justifyContent: "center",
      alignItems: "center",
    },
    scroll: {
      "&.infinite-scroll-component": {
        ...CommonStyles.verticalScroll,
        ...CommonStyles.scrollbarCSS(false, "white"),
      },
    },
  },
  {
    index: generateIndex("atoms"),
  },
);
