import { Meta, Story } from "@storybook/react";
import { useState } from "react";
import { useThrottledEffect } from "reactjs-view-core/src/hooks/useThrottledEffect";
import { RenderingControls } from "../../container/renderingControls";

type DemoProps = Omit<Parameters<typeof useThrottledEffect>[1], "deps">;

const Demo = ({ delay, ...rest }: DemoProps) => {
  const [inputValue, setInputValue] = useState("");
  const [throttledValue, setThrottledValue] = useState("");

  const deps = [inputValue];
  useThrottledEffect(
    () => {
      setThrottledValue(inputValue);
    },
    { delay, deps, ...rest },
  );

  return (
    <>
      <pre>
        <code>
          {JSON.stringify({ throttledValue, deps, delay, ...rest }, null, 4)}
        </code>
      </pre>
      <p>Input is dependency of useThrottledEffect</p>
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
    </>
  );
};

const DemoWithControls = (props: DemoProps) => (
  <RenderingControls>
    <Demo {...props} />
  </RenderingControls>
);

const meta: Meta<DemoProps> = {
  title: "Hooks/useThrottledEffect",
  component: DemoWithControls,
  argTypes: {
    delay: {
      description: "Delay to wait to throttle",
      type: "number",
    },
    callingAfterUnmount: {
      type: "boolean",
    },
    ignoreInFirstCall: {
      type: "boolean",
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<DemoProps> = (args) => <DemoWithControls {...args} />;
export const Default = Template.bind({});
Default.args = {
  delay: 5000,
};
