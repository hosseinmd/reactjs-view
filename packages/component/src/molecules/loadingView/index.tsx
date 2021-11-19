import { CSSProperties } from "react";
import { View, ViewProps } from "../../atoms/view";
import { Loader } from "./loader";
import useStyles from "./styles";

let defaultLoader = <Loader />;

function setDefaultIndicator(indicator: JSX.Element) {
  defaultLoader = indicator;
}
export interface LoadingViewProps extends ViewProps {
  // size?: "small" | "large" | "default";
  // color?: string;
  children?: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  /**
   * Don't render children until isLoading is true
   *
   * @default true
   */
  isLazy?: boolean;
  style?: CSSProperties;
  prefixCls?: string | undefined;
  tip?: string | undefined;
  delay?: number | undefined;
  wrapperClassName?: string | undefined;
}

const LoadingView = ({
  // size = "large",
  // color = "blue",
  children,
  isLoading,
  isLazy = true,
  prefixCls,
  tip,
  delay,
  wrapperClassName,
  ...rest
}: LoadingViewProps) => {
  const classes = useStyles();

  return (
    <View {...rest}>
      {(!isLoading || !isLazy) && children}
      {isLoading && <View className={classes.wrapper}>{defaultLoader}</View>}
    </View>
  );
};

LoadingView.setDefaultIndicator = setDefaultIndicator;

export { LoadingView };
