import { Meta, Story } from "@storybook/react/types-6-0";
import { Text, View, ViewProps } from "reactjs-view";
import { StoryContainer } from "../../container";

export default {
  title: "View",
  component: View,
} as Meta<ViewProps>;

const Template: Story<Omit<ViewProps, "ref">> = (args) => (
  <StoryContainer>
    <View {...args} />
  </StoryContainer>
);

export const Primary = Template.bind({});
Primary.args = {
  variant: "div",
  children: <Text> قلی قلی پور</Text>,
};
