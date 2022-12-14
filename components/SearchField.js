import React from "react";
import { useSearchFieldState } from "react-stately";
import { useSearchField } from "react-aria";
import Button from "./Button";

export default function SearchField(props) {
  let { label } = props;
  let state = useSearchFieldState(props);
  let ref = React.useRef();
  let { labelProps, inputProps, clearButtonProps } = useSearchField(
    props,
    state,
    ref
  );

  return (
    <div className="border-2 border-slate-300 h-full">
      <label {...labelProps}>{label}</label>
      <div>
        <input
          {...inputProps}
          ref={ref}
          className=" bg-lime-200 border-2 border-slate-400 h-6 m-2"
        />
        {state.value !== "" && <Button {...clearButtonProps}>❎</Button>}
      </div>
    </div>
  );
}
