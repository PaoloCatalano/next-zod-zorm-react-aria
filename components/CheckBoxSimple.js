import React from "react";
import { useToggleState } from "react-stately";
import { useCheckbox } from "react-aria";

export default function Checkbox(props) {
  let { children } = props;
  let state = useToggleState(props);
  let ref = React.useRef();
  let { inputProps } = useCheckbox(props, state, ref);

  return (
    <label style={{ display: "block" }}>
      <input {...inputProps} ref={ref} />
      {children}
    </label>
  );
}
