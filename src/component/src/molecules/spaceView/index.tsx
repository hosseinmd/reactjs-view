import { Children, CSSProperties, forwardRef } from "react";
import { View, ViewProps } from "reactjs-view";

export interface SpaceViewProps extends ViewProps {
  children?: React.ReactNode;
  spaceStyle?: CSSProperties;
  spaceClassName?: string;
  spaceAround?: boolean;
}

export const SpaceView = forwardRef(
  (
    {
      children,
      spaceStyle,
      spaceClassName,
      spaceAround,
      ...rest
    }: SpaceViewProps,
    ref: any,
  ) => {
    const getSpace = (key?: string | number) => (
      <View key={key} style={spaceStyle} className={spaceClassName} />
    );

    return (
      <View ref={ref} {...rest}>
        {spaceAround && getSpace("start")}
        {Children.map(children, (child) => child)?.flatMap((child, index) => [
          child,
          index !== Children.count(children) - 1 && getSpace(index),
        ])}
        {spaceAround && getSpace("end")}
      </View>
    );
  },
);
