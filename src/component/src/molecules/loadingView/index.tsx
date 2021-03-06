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
  indicatorWrapperClassName?: string | undefined;
  /** @deprecated Use indicatorWrapperClassName instead */
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
  indicatorWrapperClassName = wrapperClassName,
  indicator = defaultLoader,
  ...rest
}: LoadingViewProps) => {
  const classes = useStyles();

  return (
    <View {...rest}>
      {(!isLoading || !isLazy) && children}
      {isLoading && (
        <View
          testID={LoadingView.testIDs.loadingContainer}
          className={classNames(classes.wrapper, indicatorWrapperClassName)}
        >
          {indicator}
        </View>
      )}
    </View>
  );
};

LoadingView.displayName = "LoadingView";
LoadingView.testIDs = {
  loadingContainer: "loadingContainer",
};

export { LoadingView };
