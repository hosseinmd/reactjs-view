import { createUseStyles } from "react-jss";
import { CommonStyles, generateIndex } from "reactjs-view-core";

const useStyles = createUseStyles(
  {
    wrapper: {
      ...CommonStyles.absoluteFill,
      justifyContent: "center",
      alignItems: "center",
    },
    container: {},
  },
  { index: generateIndex("molecules", "coreModule") },
);

export default useStyles;
