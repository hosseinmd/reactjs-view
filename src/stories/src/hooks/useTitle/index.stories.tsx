import { Meta, Story } from "@storybook/react";
import { useTitle } from "reactjs-view-core";
import { RenderingControls } from "../../container/renderingControls";

type DemoProps = { title: Parameters<typeof useTitle>[0] };

const Demo = (props: { title: Parameters<typeof useTitle>[0] }) => {
  useTitle(props.title);

  return (
    <>
      <pre>
        <code>{JSON.stringify(props, null, 4)}</code>
      </pre>
    </>
  );
};

const DemoWithControls = ({ title }: DemoProps) => (
  <RenderingControls>
    <Demo title={title} />
  </RenderingControls>
);

const meta: Meta<DemoProps> = {
  title: "Hooks/useTitle",
  component: DemoWithControls,
  argTypes: {
    title: {
      type: "string",
      defaultValue: "document",
      description: "Its change the browser top bar title",
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
