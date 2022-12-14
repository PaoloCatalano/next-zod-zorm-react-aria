import React from "react";
import { useTooltipTriggerState } from "react-stately";
import { mergeProps, useTooltip, useTooltipTrigger } from "react-aria";

function Tooltip({ state, ...props }) {
  let { tooltipProps } = useTooltip(props, state);

  return (
    <span
      style={{
        position: "absolute",
        left: "-60%",
        top: "-100%",
        maxWidth: 150,
        marginTop: "-15px",
        backgroundColor: "white",
        color: "black",
        padding: "5px",
        border: "1px solid gray",
        // transformOrigin: "center",
        // translate: "0% 0%",
        // width: "fit-content",
      }}
      {...mergeProps(props, tooltipProps)}
    >
      <svg className="absolute top-full left-0 -z-10 origin-center translate-x-[6%]">
        <path d="M0 0,L6 6,L12 0" />
      </svg>
      {props.children}
    </span>
  );
}

export default function TooltipButton(props) {
  let state = useTooltipTriggerState(props);
  let ref = React.useRef();

  // Get props for the trigger and its tooltip
  let { triggerProps, tooltipProps } = useTooltipTrigger(props, state, ref);

  return (
    <span style={{ position: "relative" }}>
      <button
        ref={ref}
        {...triggerProps}
        style={{ fontSize: 18 }}
        onClick={() => alert("Pressed button")}
      >
        {props.children}
      </button>
      {state.isOpen && (
        <Tooltip state={state} {...tooltipProps}>
          {props.tooltip}
        </Tooltip>
      )}
    </span>
  );
}
