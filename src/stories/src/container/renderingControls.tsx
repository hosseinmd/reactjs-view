import React, { PropsWithChildren, useState } from "react";

const RenderingControls = ({
  children,
}: PropsWithChildren<Record<string, unknown>>) => {
  const [key, setKey] = useState(1);
  const [_, setRerender] = useState(1);

  return (
    <div key={key}>
      {children}
      <hr />
      <div>
        <button onClick={() => setRerender((x) => x + 1)}>Rerender</button>
        <button onClick={() => setKey((x) => x + 1)}>Remount</button>
      </div>
    </div>
  );
};

export { RenderingControls };
