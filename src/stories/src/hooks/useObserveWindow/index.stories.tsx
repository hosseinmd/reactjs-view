import { Meta, Story } from "@storybook/react";
import { useObserveWindow } from "reactjs-view-core";
import { RenderingControls } from "../../container/renderingControls";

const Demo = () => {
  const {
    isSmallerThanExtraLarge,
    isSmallerThanMedium,
    isSmallerThanSmall,
    isSmallerThenLarge,
  } = useObserveWindow();

  return (
    <div>
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
    </div>
  );
};

const DemoWithControls = () => (
  <RenderingControls>
    <Demo />
  </RenderingControls>
);

const meta: Meta = {
  title: "Hooks/useObserveWindow",
  component: DemoWithControls,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = (args) => <DemoWithControls {...args} />;
export const Default = Template.bind({});
Default.args = {};
