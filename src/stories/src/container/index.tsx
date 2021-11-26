import { View } from "reactjs-view";
import "./index.css";
import useStyles from "./style";

export const StoryContainer = ({ children }: any) => {
  const classes = useStyles();
  return <View className={classes.layoutContainer}>{children}</View>;
};
