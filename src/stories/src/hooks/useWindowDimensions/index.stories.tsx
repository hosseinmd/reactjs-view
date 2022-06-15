import { Meta, Story } from "@storybook/react";
import { useWindowDimensions } from "reactjs-view-core";
import { RenderingControls } from "../../container/renderingControls";

const Demo = () => {
  const size = useWindowDimensions();

  return (
    <>
      <pre>
        <code>{JSON.stringify(size, null, 4)}</code>
      </pre>
    </>
  );
};

const DemoWithControls = () => (
  <RenderingControls>
    <Demo />
  </RenderingControls>
);

const meta: Meta = {
  title: "Hooks/useWindowDimensions",
  component: DemoWithControls,
  argTypes: {
    size: {
      description: "Resize the layout to change the window size",
      name: "Window dimensions",
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
