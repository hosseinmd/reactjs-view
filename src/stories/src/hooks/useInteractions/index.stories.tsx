import { Meta, Story } from "@storybook/react";
import { useInteractions } from "reactjs-view-core";
import { RenderingControls } from "../../container/renderingControls";

const commonStyle = {
  width: 200,
  height: 200,
  display: "grid",
  placeItems: "center",
  color: "#fff",
  fontSize: 16,
  marginBlock: 16,
};

const Demo = () => {
  const { eventHandlers, isHovered, isActive, isTabFocused } =
    useInteractions();

  return (
    <>
      <pre>
        <code>
          {JSON.stringify({ isHovered, isActive, isTabFocused }, null, 4)}
        </code>
        <div
          tabIndex={1}
          {...eventHandlers()}
          style={{
            ...commonStyle,
            background: isActive
              ? "#d44ed1"
              : isHovered
              ? "#d44677"
              : isTabFocused
              ? "#ed711f"
              : "#48a9c2",
          }}
        ></div>
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
  title: "Hooks/useInteractions",
  component: DemoWithControls,
  argTypes: {
    hover: {
      description: "Hover the box to change the background-color",
    },
    active: {
      description: "Grab/Focus the box to change the background-color",
    },
    tabFocus: {
      description: "Press Tab key  to change the box background-color",
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
