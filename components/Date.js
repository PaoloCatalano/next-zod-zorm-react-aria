import React from "react";
import { useDateField, useDateSegment, useLocale } from "react-aria";
import { useDateFieldState } from "react-stately";
import { createCalendar } from "@internationalized/date";
import { useLocale as useLocale_i18n } from "@react-aria/i18n";
import { useTimeFieldState } from "@react-stately/datepicker";
import { useTimeField } from "@react-aria/datepicker";

export default function DateField(props) {
  let { locale } = useLocale();
  let state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  let ref = React.useRef();
  let { labelProps, fieldProps } = useDateField(props, state, ref);

  return (
    <div className={`flex flex-col items-start ${props.className || ""}`}>
      <span {...labelProps} className="text-sm text-gray-800">
        {props.label}
      </span>
      <div
        {...fieldProps}
        ref={ref}
        className="flex bg-white border border-gray-300 hover:border-gray-400 transition-colors rounded-md pr-8 focus-within:border-violet-600 focus-within:hover:border-violet-600 p-1"
      >
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
        {state.validationState === "invalid" && (
          <span aria-hidden="true">🚫</span>
        )}
      </div>
    </div>
  );
}

function DateSegment({ segment, state }) {
  let ref = React.useRef();
  let { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      style={{
        ...segmentProps.style,
        //WARNINGS of Server !== Client
        // minWidth:
        //   segment.maxValue != null && String(segment.maxValue).length + "ch",
      }}
      className={`px-0.5 box-content tabular-nums text-right outline-none rounded-sm focus:bg-violet-600 focus:text-white group ${
        !segment.isEditable ? "text-gray-500" : "text-gray-800"
      }`}
    >
      {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
      <span
        aria-hidden="true"
        className={`${
          segment.isPlaceholder ? "" : "invisible h-0 pointer-events-none"
        } block w-full text-center italic text-gray-500 group-focus:text-white`}
      >
        {segment.placeholder}
      </span>
      {segment.isPlaceholder ? "" : segment.text}
    </div>
  );
}

export function TimeField(props) {
  let { locale } = useLocale_i18n();
  let state = useTimeFieldState({
    ...props,
    locale,
  });

  let ref = React.useRef();
  let { labelProps, fieldProps } = useTimeField(props, state, ref);

  return (
    <div className="flex flex-col items-start">
      <span {...labelProps} className="text-sm text-gray-800">
        {props.label}
      </span>
      <div
        {...fieldProps}
        ref={ref}
        className="flex bg-white border border-gray-300 hover:border-gray-400 transition-colors rounded-md pr-8 focus-within:border-violet-600 focus-within:hover:border-violet-600 p-1"
      >
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
      </div>
    </div>
  );
}
