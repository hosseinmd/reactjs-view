import classNames from "classnames";
import { View, ViewProps } from "../../atoms/view";
import { Loader } from "./loader";
import useStyles from "./styles";

const defaultLoader = <Loader />;
export interface LoadingViewProps extends ViewProps {
  // size?: "small" | "large" | "default";
  // color?: string;
  isLoading?: boolean;
  /**
   * Don't render children until isLoading is true
   *
   * @default true
   */
  isLazy?: boolean;
  wrapperClassName?: string | undefined;
  indicator?: JSX.Element;
}

const LoadingView = ({
  // size = "large",
  // color = "blue",
  children,
  isLoading,
  isLazy = true,
  wrapperClassName,
  indicator = defaultLoader,
  ...rest
}: LoadingViewProps) => {
  const classes = useStyles();

  return (
    <View {...rest}>
      {(!isLoading || !isLazy) && children}
      {isLoading && (
        <View className={classNames(classes.wrapper, wrapperClassName)}>
          {indicator}
        </View>
      )}
    </View>
  );
};

export { LoadingView };
