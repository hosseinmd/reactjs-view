// import {
//   ArgsTable,
//   Description,
//   Primary,
//   PRIMARY_STORY,
//   Stories,
//   Subtitle,
//   Title,
// } from "@storybook/addon-docs";
import { Meta, Story } from "@storybook/react/types-6-0";
import { Text, View, ViewProps } from "reactjs-view";
import { StoryContainer } from "../../container";

export default {
  title: "View",
  component: View,
  // parameters: {
  //   docs: {
  //     page: () => (
  //       <>
  //         <Title />
  //         <Subtitle />
  //         <Description />
  //         <Primary />
  //         <ArgsTable story={PRIMARY_STORY} />
  //         <Stories />
  //       </>
  //     ),
  //   },
  // },
} as Meta<ViewProps>;

const Template: Story<Omit<ViewProps, "ref">> = (args) => (
  <StoryContainer>
    <View {...args} />
  </StoryContainer>
);

export const Regular = Template.bind({});
Regular.args = {
  variant: "div",
  children: <Text> قلی قلی پور</Text>,
};
