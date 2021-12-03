import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";

export function mountTest(Component: React.ComponentType) {
  describe(`mount and unmount`, () => {
    // https://github.com/ant-design/ant-design/pull/18441
    it(`component could be updated and unmounted without errors`, () => {
      const wrapper = render(<Component />);
      expect(() => {
        wrapper.rerender(<Component />);
        wrapper.unmount();
      }).not.toThrow();
    });
  });
}
