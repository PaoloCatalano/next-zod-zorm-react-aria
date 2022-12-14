import { useTextField } from "react-aria";
import { useState, useRef, useEffect } from "react";

export default function TextField(props) {
  let { label, defaultValue } = props;
  let ref = useRef();
  const [value, setValue] = useState(defaultValue || "");
  let { labelProps, inputProps, descriptionProps, errorMessageProps } =
    useTextField(props, ref);

  useEffect(() => {
    if (props.errorMessage) {
      ref.current.focus();
    }
  }, [props]);

  return (
    <>
      <div className="relative max-w-min mx-auto">
        <input
          {...inputProps}
          onChange={(e) => setValue(e.target.value)}
          ref={ref}
          className={`${
            props.errorMessage && "border-red-300 focus:border-red-500"
          } form-control max-w-xs outline-none border-2 rounded-md border-sky-200 py-[0.32rem] px-3 text-slate-700 transition focus:border-2 focus:border-sky-500 ${
            value ? "active" : ""
          }`}
        />
        <label
          className="form-label absolute top-[0.4rem] left-3 max-w-[90%] whitespace-nowrap overflow-hidden text-ellipsis mb-0 ml-0 px-1 align-bottom  pointer-events-none origin-top-left transition-all ease-out text-slate-500 "
          {...labelProps}
        >
          {label}
        </label>
        {props.description && (
          <div
            {...descriptionProps}
            className="w-full text-center text-xs text-slate-400"
          >
            {props.description}
          </div>
        )}
      </div>
      {props.errorMessage && (
        <p {...errorMessageProps} className="text-red-400">
          {props.errorMessage}
        </p>
      )}
    </>
  );
}
