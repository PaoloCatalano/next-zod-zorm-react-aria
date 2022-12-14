import React from "react";
import { useCheckboxGroupState } from "react-stately";
import { useCheckboxGroup, useCheckboxGroupItem } from "react-aria";

let CheckboxGroupContext = React.createContext(null);

export function CheckboxGroup(props) {
  let { children, label, description, errorMessage, validationState } = props;
  let state = useCheckboxGroupState(props);
  let { groupProps, labelProps, descriptionProps, errorMessageProps } =
    useCheckboxGroup(props, state);

  return (
    <div {...groupProps}>
      <span {...labelProps}>{label}</span>
      <CheckboxGroupContext.Provider value={state}>
        {children}
      </CheckboxGroupContext.Provider>
      {description && (
        <div {...descriptionProps} style={{ fontSize: 12 }}>
          {description}
        </div>
      )}
      {errorMessage && validationState === "invalid" && (
        <div {...errorMessageProps} style={{ color: "red", fontSize: 12 }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
}

export function Checkbox(props) {
  let { children } = props;
  let state = React.useContext(CheckboxGroupContext);
  let ref = React.useRef();
  let { inputProps } = useCheckboxGroupItem(props, state, ref);

  let isDisabled = state.isDisabled || props.isDisabled;
  let isSelected = state.isSelected(props.value);

  return (
    <label
      className={`block ${
        isDisabled
          ? "text-slate-400"
          : isSelected
          ? "text-pink-600"
          : "text-black"
      }`}
    >
      <input
        {...inputProps}
        ref={ref}
        className={`transition accent-pink-600 mr-1 ${
          isSelected ? "focus:outline-pink-600" : ""
        }`}
      />
      {children}
    </label>
  );
}
