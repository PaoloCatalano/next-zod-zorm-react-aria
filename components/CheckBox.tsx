import type { AriaCheckboxProps } from "@react-types/checkbox";
import { useRef } from "react";
import { useToggleState } from "@react-stately/toggle";
import { useCheckbox } from "@react-aria/checkbox";
import { VisuallyHidden } from "@react-aria/visually-hidden";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";

export default function Checkbox(props: AriaCheckboxProps) {
  let state = useToggleState(props);
  let ref = useRef<HTMLInputElement>(null);
  let { inputProps } = useCheckbox(props, state, ref);
  let { focusProps, isFocusVisible } = useFocusRing();

  let checkboxClassName = `${
    state.isSelected ? "bg-indigo-500 group-active:bg-indigo-600" : "bg-white"
  }
    text-white
    border-2
    rounded
    ${
      props.isDisabled
        ? "border-gray-300"
        : isFocusVisible || state.isSelected
        ? "border-indigo-500 group-active:border-indigo-600"
        : "border-gray-500 group-active:border-gray-600"
    }
    w-5
    h-5
    flex
    flex-shrink-0
    justify-center
    items-center
    mr-2
    ${isFocusVisible ? "shadow-outline" : ""}
    transition
    ease-in-out
    duration-150
 `;

  let labelClassName = `${
    props.isDisabled
      ? "text-gray-400"
      : "text-gray-700 group-active:text-gray-800"
  }
    select-none
  `;

  return (
    <label className="flex items-center group">
      <VisuallyHidden>
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>
      <div className={checkboxClassName} aria-hidden="true">
        <svg className="stroke-current w-3 h-3" viewBox="0 0 18 18">
          <polyline
            points="1 9 7 14 15 4"
            fill="none"
            strokeWidth={3}
            strokeDasharray={22}
            strokeDashoffset={state.isSelected ? 44 : 66}
            style={{
              transition: "all 400ms",
            }}
          />
        </svg>
      </div>
      <span className={labelClassName}>{props.children}</span>
    </label>
  );
}
