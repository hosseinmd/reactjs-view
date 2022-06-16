import { Meta, Story } from "@storybook/react";
import { useRef } from "react";
import { useObserveElement } from "reactjs-view-core";
import { RenderingControls } from "../../container/renderingControls";

type DemoProps = {
  reference: boolean;
};

const Demo = ({ reference }: DemoProps) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const { isSmallScreen, isMediumScreen, isLargeScreen, isExtraLargeScreen } =
    useObserveElement(reference ? parentRef : undefined);

  return (
    <div
      ref={parentRef}
      style={{ border: reference ? "1px dashed #ccc" : "none" }}
    >
      <pre>
        <code>
          {JSON.stringify(
            {
              isSmallScreen,
              isMediumScreen,
              isLargeScreen,
              isExtraLargeScreen,
              reference: reference ? "Parent is referenced" : undefined,
            },
            null,
            4,
          )}
        </code>
      </pre>
    </div>
  );
};

const DemoWithControls = (props: DemoProps) => (
  <RenderingControls>
    <Demo {...props} />
  </RenderingControls>
);

const meta: Meta = {
  title: "Hooks/useObserveElement",
  component: DemoWithControls,
  argTypes: {
    reference: {
      defaultValue: false,
      type: "boolean",
      description:
        "Switch to true  to the hook reference the parent element to changes size",
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<DemoProps> = (args) => <DemoWithControls {...args} />;
export const Default = Template.bind({});
Default.args = {};
