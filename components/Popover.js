import React from "react";
import { DismissButton, Overlay, usePopover } from "react-aria";

export default function Popover({ children, state, offset = 8, ...props }) {
  let popoverRef = React.useRef();
  let { popoverProps, underlayProps, arrowProps, placement } = usePopover(
    {
      ...props,
      offset,
      popoverRef,
    },
    state
  );

  return (
    <Overlay>
      <div {...underlayProps} className="fixed  inset-0" />
      <div
        {...popoverProps}
        ref={popoverRef}
        className="z-10 shadow-lg border w-screen h-screen border-gray-300 bg-white rounded-md mt-2"
      >
        {/* <svg {...arrowProps} data-placement={placement}>
          <path d="M0 0,L6 6,L12 0" />
        </svg> */}
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}
