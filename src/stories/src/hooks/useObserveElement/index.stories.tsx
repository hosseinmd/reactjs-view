import { Meta, Story } from "@storybook/react";
import { useRef } from "react";
import { useObserveElement } from "reactjs-view-core";
import { RenderingControls } from "../../container/renderingControls";

const Demo = () => {
  const parentRef = useRef<HTMLDivElement>(null);
  const {
    isSmallerThanExtraLarge,
    isSmallerThanMedium,
    isSmallerThanSmall,
    isSmallerThenLarge,
  } = useObserveElement(parentRef);

  return (
    <div ref={parentRef} style={{ border: "1px dashed #ccc" }}>
      <pre>
        <code>
          {JSON.stringify(
            {
              isSmallerThanExtraLarge,
              isSmallerThanMedium,
              isSmallerThanSmall,
              isSmallerThenLarge,
            },
            null,
            4,
          )}
        </code>
      </pre>
      <p>Parent is referenced</p>
    </div>
  );
};

const DemoWithControls = () => (
  <RenderingControls>
    <Demo />
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

const Template: Story = (args) => <DemoWithControls {...args} />;
export const Default = Template.bind({});
Default.args = {};
