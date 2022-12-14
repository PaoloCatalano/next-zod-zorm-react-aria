import { useDialog } from "react-aria";
import React from "react";

export default function Dialog({ title, children, ...props }) {
  let ref = React.useRef();
  let { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div {...dialogProps} ref={ref} style={{ padding: 30 }}>
      {title && (
        <h3 {...titleProps} style={{ marginTop: 0 }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
