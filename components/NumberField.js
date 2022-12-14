import React from "react";
import { useNumberFieldState } from "react-stately";
import { useLocale, useNumberField } from "react-aria";

// Reuse the Button from your component library. See below for details.
import Button from "../components/Button";

export default function NumberField(props) {
  let { locale } = useLocale();
  let state = useNumberFieldState({ ...props, locale });
  let inputRef = React.useRef();
  let {
    labelProps,
    groupProps,
    inputProps,
    incrementButtonProps,
    decrementButtonProps,
  } = useNumberField(props, state, inputRef);

  return (
    <div>
      <label {...labelProps}>{props.label}</label>
      <div {...groupProps}>
        <Button {...decrementButtonProps}>-</Button>
        <input
          {...inputProps}
          ref={inputRef}
          className="bg-sky-200 p-1 rounded"
        />
        <Button {...incrementButtonProps}>+</Button>
      </div>
    </div>
  );
}
