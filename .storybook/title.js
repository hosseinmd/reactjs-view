import { addons } from "@storybook/addons";
import { STORY_RENDERED } from "@storybook/core-events";

addons.register("Title", (api) => {
  const setTitle = () => {
    try {
      const storyData = api.getCurrentStoryData();
      if (!storyData) {
        document.title = "Reactjs-View Components";
      } else {
        document.title = `${storyData.kind} - ${storyData.name}`;
      }
    } catch (error) {
      console.error(error);
    }
  };
  api.on(STORY_RENDERED, () => {
    setTitle();
  });
});
