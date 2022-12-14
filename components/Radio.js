import React from "react";
import {
  useRadio,
  useRadioGroup,
  useFocusRing,
  VisuallyHidden,
} from "react-aria";
import { useRadioGroupState } from "react-stately";

// RadioGroup is the same as in the previous example
let RadioContext = React.createContext(null);

export function RadioGroup(props) {
  let { children, label, description, errorMessage, validationState } = props;
  let state = useRadioGroupState(props);
  let { radioGroupProps, labelProps, descriptionProps, errorMessageProps } =
    useRadioGroup(props, state);

  return (
    <div {...radioGroupProps}>
      <span {...labelProps}>{label}</span>
      <RadioContext.Provider value={state}>{children}</RadioContext.Provider>
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

export function Radio(props) {
  let { children } = props;
  let state = React.useContext(RadioContext);
  let ref = React.useRef(null);
  let { inputProps, isSelected, isDisabled } = useRadio(props, state, ref);
  let { isFocusVisible, focusProps } = useFocusRing();
  let strokeWidth = isSelected ? 6 : 2;

  return (
    <label
      style={{
        display: "flex",
        alignItems: "center",
        opacity: isDisabled ? 0.4 : 1,
      }}
    >
      <VisuallyHidden>
        <input {...inputProps} {...focusProps} ref={ref} />
      </VisuallyHidden>
      <svg width={24} height={24} aria-hidden="true" style={{ marginRight: 4 }}>
        <circle
          cx={12}
          cy={12}
          r={8 - strokeWidth / 2}
          fill="none"
          stroke={isSelected ? "orange" : "gray"}
          strokeWidth={strokeWidth}
          style={{
            transition: "all 400ms",
          }}
        />

        {isFocusVisible && (
          <circle
            cx={12}
            cy={12}
            r={11}
            fill="none"
            stroke="orange"
            strokeWidth={2}
          />
        )}
      </svg>
      {children}
    </label>
  );
}
