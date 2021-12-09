import { View, ViewProps } from "../../atoms";

type AnchorViewProps = ViewProps;
/**
 * This is an a tag with View Standard implementation
 *
 * @example
 *   const Comp = () => (
 *     <View href="example.com" style={{ flex: 1 }}>
 *       <ComplexView />
 *     </View>
 *   );
 *
 * @deprecated: use View instead
 */
const AnchorView = (props: AnchorViewProps) => {
  return <View variant="a" {...props} />;
};

export { AnchorView };
export type { AnchorViewProps };
