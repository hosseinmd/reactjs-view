import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import React from "react";

/**
 * Render the component then generate the snapshot
 *
 * @param Component
 * @param fullProps
 */
export function shotTest<P>(
  Component: React.ComponentType<P>,
  fullProps?: Partial<P>,
) {
  describe(`mount and unmount`, () => {
    // https://github.com/ant-design/ant-design/pull/18441
    it(`component could be updated and unmounted without errors`, () => {
      const wrapper = render(<Component {...({} as P)} />);

      expect(wrapper.asFragment()).toMatchSnapshot();

      wrapper.rerender(<Component {...(fullProps as P)} />);

      expect(wrapper.asFragment()).toMatchSnapshot();

      wrapper.unmount();
    });
  });
}
