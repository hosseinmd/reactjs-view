import { Meta, Story } from "@storybook/react";
import { useState } from "react";
import { useThrottle } from "reactjs-view-core";
import { RenderingControls } from "../../container/renderingControls";

type DemoProps = {
  delay: Parameters<typeof useThrottle>[1];
};

const Demo = ({ delay }: DemoProps) => {
  const [inputValue, setInputValue] = useState("");

  const throttledValue = useThrottle(inputValue, delay);

  return (
    <>
      <pre>
        <code>{JSON.stringify({ delay }, null, 4)}</code>
      </pre>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{
          border: "1px solid #ccc",
          padding: "5px",
          fontSize: 16,
          outline: "none",
        }}
      />
      <p>{throttledValue || "Initial value"}</p>
    </>
  );
};

const DemoWithControls = (props: DemoProps) => (
  <RenderingControls>
    <Demo {...props} />
  </RenderingControls>
);

const meta: Meta<DemoProps> = {
  title: "Hooks/useThrottle",
  component: DemoWithControls,
  argTypes: {
    delay: {
      defaultValue: 5000,
      description: "Delay to wait to throttle",
      type: "number",
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
