import { Meta, Story } from "@storybook/react";
import React from "react";
import { useCounter } from "reactjs-view-core";
import { RenderingControls } from "../../container/renderingControls";

type DemoProps = Parameters<typeof useCounter>[0];

const Demo = ({ ...options }: Parameters<typeof useCounter>[0]) => {
  const data = useCounter(options);

  return (
    <>
      <pre>
        <code>{JSON.stringify(data, null, 4)}</code>
      </pre>
      <button onClick={() => data.startCounting()}>startCounting</button>
      <button onClick={() => data.reset()}>reset</button>
    </>
  );
};

const DemoWithControls = (props: DemoProps) => (
  <RenderingControls>
    <Demo {...props} />
  </RenderingControls>
);

const meta: Meta<DemoProps> = {
  title: "Hooks/useCounter",
  component: DemoWithControls,
  argTypes: {
    start: {
      control: {
        type: "number",
      },
      defaultValue: 0,
    },
    end: {
      control: {
        type: "number",
      },
      defaultValue: 60,
    },
    step: {
      control: {
        type: "number",
      },
      defaultValue: 1,
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
