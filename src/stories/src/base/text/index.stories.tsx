import { Meta, Story } from "@storybook/react/types-6-0";
import { Text, TextProps, View } from "reactjs-view";
import { StoryContainer } from "../../container";

export default {
  title: "Text",
  component: Text,
  argTypes: {
    color: { control: "color" },
  },
} as Meta<TextProps>;

const Template: Story<TextProps> = (args) => (
  <StoryContainer>
    <Text {...args} />
  </StoryContainer>
);

export const Regular = Template.bind({});
Regular.args = {
  children: "Text a Text",
};

const FlexTemplate: Story<TextProps> = (args) => (
  <StoryContainer>
    <View>
      <View style={{ flexDirection: "row", width: `30%` }}>
        <Text {...args} />
        <View style={{ backgroundColor: "blue", width: 15, height: 15 }} />
      </View>
    </View>
  </StoryContainer>
);

export const Flexible = FlexTemplate.bind({});
Flexible.args = {
  children: "Example Text",
  title: "title",
  numberOfLines: 1,
};

export const Ellipses = FlexTemplate.bind({});
Ellipses.args = {
  children:
    "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.",
  title: "title",
  theme: "bold",
  numberOfLines: 2,
};
