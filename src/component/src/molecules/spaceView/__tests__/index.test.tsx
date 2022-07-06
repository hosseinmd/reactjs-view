import { shotTest } from "reactjs-view-tests";
import { SpaceView } from "../index";

shotTest(SpaceView, {
  children: (
    <>
      {null}
      <div />
      <>
        <div>
          <p />
        </div>
      </>
    </>
  ),
});

shotTest(SpaceView, {
  children: (
    <>
      {null}
      <div />
      <></>
      <>
        <div>
          <p />
        </div>
      </>
    </>
  ),
  spaceAround: true,
});
