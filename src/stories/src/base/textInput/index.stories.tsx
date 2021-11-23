import { Meta, Story } from "@storybook/react/types-6-0";
import { TextInput, TextInputProps } from "reactjs-view";
import { StoryContainer } from "../../container";

export default {
  title: "TextInput",
  component: TextInput,
  argTypes: {
    // color: { control: "color" },
  },
} as Meta<TextInputProps>;

const Template: Story<TextInputProps> = (args) => (
  <StoryContainer>
    <TextInput {...args} />
  </StoryContainer>
);

export const Regular = Template.bind({});

Regular.args = {
  placeholder: "placeholder",
  placeholderTextColor: "red",
};

export const Multiline = Template.bind({});

Multiline.args = {
  placeholder: "placeholder",
  numberOfLines: 2,
  multiline: true,
};
