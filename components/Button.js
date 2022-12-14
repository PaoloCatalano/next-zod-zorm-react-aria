import { useButton } from "@react-aria/button";
import { useRef } from "react";

export default function Button(props) {
  const { isDisabled } = props;
  let ref = useRef();
  let { buttonProps } = useButton(props, ref);

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={`${
        isDisabled && "blur-sm cursor-not-allowed"
      } bg-sky-400 p-1 rounded max-w-xs transition`}
    >
      {props.children}
    </button>
  );
}
