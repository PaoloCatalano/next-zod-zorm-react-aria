/**
 * IMPORTANT:
 * By pressing two times CTRL + A inside the list (= select all items):
 * Unhandled Runtime Error
TypeError: setB.has is not a function

Call Stack
$7af3f5b51489e0b5$var$equalSets
node_modules/@react-stately/selection/dist/module.js (23:0)
Object.setSelectedKeys
node_modules/@react-stately/selection/dist/module.js (88:0)
$d496c0a20b6e58ec$export$6c8a5aaad13c9852.selectAll
node_modules/@react-stately/selection/dist/module.js (322:0)
onKeyDown
node_modules/@react-aria/selection/dist/module.js (163:0)
HTMLUnknownElement.callCallback
node_modules/react-dom/cjs/react-dom.development.js (4164:0)
Object.invokeGuardedCallbackDev
node_modules/react-dom/cjs/react-dom.development.js (4213:0)
invokeGuardedCallback
node_modules/react-dom/cjs/react-dom.development.js (4277:0)
invokeGuardedCallbackAndCatchFirstError
node_modules/react-dom/cjs/react-dom.development.js (4291:0)
executeDispatch
node_modules/react-dom/cjs/react-dom.development.js (9041:0)
processDispatchQueueItemsInOrder
node_modules/react-dom/cjs/react-dom.development.js (9073:0)
processDispatchQueue
node_modules/react-dom/cjs/react-dom.development.js (9086:0)
dispatchEventsForPlugins
node_modules/react-dom/cjs/react-dom.development.js (9097:0)
eval
node_modules/react-dom/cjs/react-dom.development.js (9288:0)
batchedUpdates$1
node_modules/react-dom/cjs/react-dom.development.js (26140:0)
batchedUpdates
node_modules/react-dom/cjs/react-dom.development.js (3991:0)
dispatchEventForPluginEventSystem
node_modules/react-dom/cjs/react-dom.development.js (9287:0)
dispatchEventWithEnableCapturePhaseSelectiveHydrationWithoutDiscreteEventReplay
node_modules/react-dom/cjs/react-dom.development.js (6465:0)
dispatchEvent
node_modules/react-dom/cjs/react-dom.development.js (6457:0)
dispatchDiscreteEvent
node_modules/react-dom/cjs/react-dom.development.js (6430:0)
 */

import {
  mergeProps,
  useFocusRing,
  useGridList,
  useGridListItem,
} from "react-aria";
import { useListState } from "react-stately";
import { useRef } from "react";

export default function List(props) {
  let state = useListState(props);
  let ref = useRef();
  let { gridProps } = useGridList(props, state, ref);

  return (
    <ul
      {...gridProps}
      ref={ref}
      className="p-1 space-y-1 list-none rounded overflow-y-scroll bg-slate-200 border-2 border-slate-400 max-w-sm min-w-[200px] max-h-64"
    >
      {[...state.collection].map((item) => (
        <ListItem key={item.key} item={item} state={state} />
      ))}
    </ul>
  );
}

function ListItem({ item, state }) {
  let ref = useRef();
  let { rowProps, gridCellProps, isPressed, isSelected } = useGridListItem(
    { node: item },
    state,
    ref
  );

  let { isFocusVisible, focusProps } = useFocusRing();

  return (
    <li
      {...mergeProps(rowProps, focusProps)}
      ref={ref}
      className={`p-2 focus:outline-none transition-all ${
        isSelected ? "text-white bg-violet-700 rounded" : ""
      }  ${isPressed ? "text-white bg-violet-500 rounded" : ""}  ${
        isFocusVisible
          ? "focus-visible:-outline-offset-2 focus-visible:outline-violet-300 focus-visible:rounded"
          : ""
      } `}
    >
      <div {...gridCellProps}>{item.rendered}</div>
    </li>
  );
}
