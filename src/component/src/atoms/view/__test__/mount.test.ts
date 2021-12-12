import { mountTest } from "reactjs-view-core/src/tests/mountTest";
import { View } from "../";

mountTest(View, {
  href: "http://google.com",
  onPress: () => {},
  className: "",
  style: {},
});
