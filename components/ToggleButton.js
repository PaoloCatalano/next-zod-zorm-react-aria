import { useToggleState } from "react-stately";
import { useToggleButton } from "react-aria";
import { useRef } from "react";

export default function ToggleButton(props) {
  let ref = useRef();
  let state = useToggleState(props);
  let { buttonProps, isPressed } = useToggleButton(props, state, ref);

  return (
    <button
      {...buttonProps}
      className="p-2 text-base border-none  bg-[var(--pressed-color)] text-white"
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
      ref={ref}
    >
      {isPressed ? "clicked" : props.children}{" "}
      <span>{state.isSelected && "✓"}</span>
    </button>
  );
}
