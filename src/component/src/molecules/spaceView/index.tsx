import React, {
  Children,
  CSSProperties,
  forwardRef,
  Fragment,
  isValidElement,
} from "react";
import { View, ViewProps } from "../../atoms";

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

    const recursivelyMapping = (children: React.ReactNode) => {
      return Children.map(children, (child) => child)
        ?.filter(Boolean)
        ?.flatMap((child, index): any => {
          if (!isValidElement(child)) return child;
          if (child.type === Fragment) {
            return recursivelyMapping(child.props.children);
          }
          return [
            child,
            index !== Children.count(children) - 1 && getSpace(index),
          ];
        });
    };

    return (
      <View ref={ref} {...rest}>
        {spaceAround && getSpace("start")}
        {recursivelyMapping(children)}
        {spaceAround && getSpace("end")}
      </View>
    );
  },
);
