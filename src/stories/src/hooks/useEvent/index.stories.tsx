import { Meta, Story } from "@storybook/react";
import { useEffect, useState } from "react";
import { useEvent } from "reactjs-view-core";
import { RenderingControls } from "../../container/renderingControls";

const Demo = () => {
  const [value, setValue] = useState(0);

  const onSetValue = useEvent(() => {
    setValue(value + 1);
  });

  useEffect(() => {
    setInterval(() => {
      onSetValue();
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <pre>
        <code>{JSON.stringify({ value }, null, 4)}</code>
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
  title: "Hooks/useEvent",
  component: DemoWithControls,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story = (args) => <DemoWithControls {...args} />;
export const Default = Template.bind({});
Default.args = {};
