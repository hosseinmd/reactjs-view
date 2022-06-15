import { faker } from "@faker-js/faker";
import { useMemo } from "@storybook/addons";
import { Meta, Story } from "@storybook/react/types-6-0";
import { SpaceView, SpaceViewProps, View } from "reactjs-view";
import { StoryContainer } from "../../container";

export default {
  title: "SpaceView",
  component: SpaceView,
} as Meta<SpaceViewProps>;

const Template: Story<SpaceViewProps> = (args) => {
  const fakes = useMemo(
    () => Array.from({ length: 5 }, () => faker.lorem.lines()),
    [],
  );

  return (
    <StoryContainer>
      <SpaceView {...args}>
        {fakes.map((line, index) => (
          <View style={{ flex: 10 }} key={index}>
            {line}
          </View>
        ))}
      </SpaceView>
    </StoryContainer>
  );
};

/** SpaceView red content yellow */
export const Regular = Template.bind({});
Regular.args = {
  style: { flexDirection: "row" },
  spaceStyle: {
    backgroundColor: "blue",
    flex: 2,
    maxWidth: 40,
    minWidth: 5,
  },
};
