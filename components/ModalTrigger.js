import { useOverlayTrigger } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import React from "react";
import Modal from "./Modal";
// Reuse the Button from your component library. See below for details.
import Button from "./Button";

export default function ModalTrigger({ label, children, ...props }) {
  let state = useOverlayTriggerState(props);
  let { triggerProps, overlayProps } = useOverlayTrigger(
    {
      type: "dialog",
    },
    state
  );

  return (
    <>
      <Button {...triggerProps}>Open Dialog</Button>
      {state.isOpen && (
        <Modal {...props} state={state}>
          {React.cloneElement(children(state.close), overlayProps)}
        </Modal>
      )}
    </>
  );
}
