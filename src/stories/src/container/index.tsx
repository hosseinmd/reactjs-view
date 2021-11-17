import { View } from "reactjs-view";
import { AppProviders } from "../../../../src/web/src/appProviders";
import "./index.css";
import useStyles from "./style";

export const StoryContainer = ({ children }: any) => {
  const classes = useStyles();
  return (
    <AppProviders>
      <View className={classes.layoutContainer}>{children}</View>
    </AppProviders>
  );
};
