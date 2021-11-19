import { Meta, Story } from "@storybook/react/types-6-0";
import { AnchorView, AnchorViewProps, Text } from "reactjs-view";
import { StoryContainer } from "../../container";

export default {
  title: "AnchorView",
  component: AnchorView,
} as Meta<AnchorViewProps>;

const Template: Story<Omit<AnchorViewProps, "ref">> = (args) => (
  <StoryContainer>
    <AnchorView {...args} />
  </StoryContainer>
);

export const Primary = Template.bind({});
Primary.args = {
  children: <Text> قلی قلی پور</Text>,
};
