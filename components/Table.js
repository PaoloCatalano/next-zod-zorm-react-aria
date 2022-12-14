import {
  mergeProps,
  useFocusRing,
  useTable,
  useTableHeaderRow,
  useTableColumnHeader,
  useTableRow,
  useTableCell,
  useTableRowGroup,
  useTableSelectAllCheckbox,
  VisuallyHidden,
  useTableSelectionCheckbox,
} from "react-aria";
import {
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
  useTableState,
} from "react-stately";
import { useRef, useState } from "react";
import Checkbox from "./CheckBoxSimple";

function Table(props) {
  let { selectionMode, selectionBehavior } = props;
  let state = useTableState({
    ...props,
    showSelectionCheckboxes:
      selectionMode === "multiple" && selectionBehavior !== "replace",
  });

  let ref = useRef();
  let { collection } = state;
  let { gridProps } = useTable(props, state, ref);

  return (
    <table {...gridProps} ref={ref} style={{ borderCollapse: "collapse" }}>
      <TableRowGroup
        type="thead"
        style={{
          borderBottom: "2px solid gray",
        }}
      >
        {collection.headerRows.map((headerRow) => (
          <TableHeaderRow key={headerRow.key} item={headerRow} state={state}>
            {[...headerRow.childNodes].map((column) =>
              column.props.isSelectionCell ? (
                <TableSelectAllCell
                  key={column.key}
                  column={column}
                  state={state}
                />
              ) : (
                <TableColumnHeader
                  key={column.key}
                  column={column}
                  state={state}
                />
              )
            )}
          </TableHeaderRow>
        ))}
      </TableRowGroup>
      <TableRowGroup type="tbody">
        {[...collection.body.childNodes].map((row) => (
          <TableRow key={row.key} item={row} state={state}>
            {[...row.childNodes].map((cell) =>
              cell.props.isSelectionCell ? (
                <TableCheckboxCell key={cell.key} cell={cell} state={state} />
              ) : (
                <TableCell key={cell.key} cell={cell} state={state} />
              )
            )}
          </TableRow>
        ))}
      </TableRowGroup>
    </table>
  );
}

function TableRowGroup({ type: Element, style, children }) {
  let { rowGroupProps } = useTableRowGroup();
  return (
    <Element {...rowGroupProps} style={style}>
      {children}
    </Element>
  );
}

function TableHeaderRow({ item, state, children }) {
  let ref = useRef();
  let { rowProps } = useTableHeaderRow({ node: item }, state, ref);

  return (
    <tr {...rowProps} ref={ref}>
      {children}
    </tr>
  );
}

function TableColumnHeader({ column, state }) {
  let ref = useRef();
  let { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref
  );
  let { isFocusVisible, focusProps } = useFocusRing();
  let arrowIcon = state.sortDescriptor?.direction === "ascending" ? "▲" : "▼";

  return (
    <th
      {...mergeProps(columnHeaderProps, focusProps)}
      colSpan={column.colspan}
      style={{
        // textAlign: column.colspan > 1 ? "center" : "left",
        textAlign: "center",
        padding: "5px 10px",
        outline: isFocusVisible ? "2px solid orange" : "none",
        cursor: "default",
      }}
      ref={ref}
    >
      {column.rendered}
      {column.props.allowsSorting && (
        <span
          aria-hidden="true"
          style={{
            padding: "0 2px",
            visibility:
              state.sortDescriptor?.column === column.key
                ? "visible"
                : "hidden",
          }}
        >
          {arrowIcon}
        </span>
      )}
    </th>
  );
}

function TableRow({ item, children, state }) {
  let ref = useRef();
  let isSelected = state.selectionManager.isSelected(item.key);
  let { rowProps, isPressed } = useTableRow(
    {
      node: item,
    },
    state,
    ref
  );
  let { isFocusVisible, focusProps } = useFocusRing();

  return (
    <tr
      style={{
        background: isSelected
          ? "blueviolet"
          : isPressed
          ? "pink"
          : item.index % 2
          ? "honeydew"
          : "none",
        color: isSelected ? "white" : null,
        outline: isFocusVisible ? "2px solid orange" : "none",
      }}
      {...mergeProps(rowProps, focusProps)}
      ref={ref}
    >
      {children}
    </tr>
  );
}

function TableCell({ cell, state }) {
  let ref = useRef();
  let { gridCellProps } = useTableCell({ node: cell }, state, ref);
  let { isFocusVisible, focusProps } = useFocusRing();

  return (
    <td
      {...mergeProps(gridCellProps, focusProps)}
      style={{
        padding: "5px 10px",
        outline: isFocusVisible ? "2px solid orange" : "none",
        cursor: "default",
      }}
      ref={ref}
    >
      {cell.rendered}
    </td>
  );
}

// selectionMode="multiple" without selectionBehavior="replace" gives WARNINGS
function TableSelectAllCell({ column, state }) {
  let ref = useRef();
  let isSingleSelectionMode = state.selectionManager.selectionMode === "single";
  let { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref
  );
  let { checkboxProps } = useTableSelectAllCheckbox(state);

  return (
    <th {...columnHeaderProps} ref={ref}>
      {isSingleSelectionMode ? (
        <VisuallyHidden>{inputProps["aria-label"]}</VisuallyHidden>
      ) : (
        <Checkbox {...checkboxProps} />
      )}
    </th>
  );
}

function TableCheckboxCell({ cell, state }) {
  let ref = useRef();
  let { gridCellProps } = useTableCell({ node: cell }, state, ref);
  let { checkboxProps } = useTableSelectionCheckbox(
    {
      key: cell.parentKey,
    },
    state
  );

  return (
    <td {...gridCellProps} ref={ref}>
      <Checkbox {...checkboxProps} />
    </td>
  );
}

//render
export default function Table1() {
  return (
    <Table
      aria-label="Example static collection table"
      style={{ height: "210px", maxWidth: "400px" }}
      selectionMode="multiple"
      selectionBehavior="replace"
    >
      <TableHeader>
        <Column>Name</Column>
        <Column>Type</Column>
        <Column>Date Modified</Column>
      </TableHeader>
      <TableBody>
        <Row key="1">
          <Cell>Games</Cell>
          <Cell>File folder</Cell>
          <Cell>6/7/2020</Cell>
        </Row>
        <Row key="2">
          <Cell>Program Files</Cell>
          <Cell>File folder</Cell>
          <Cell>4/7/2021</Cell>
        </Row>
        <Row key="3">
          <Cell>bootmgr</Cell>
          <Cell>System file</Cell>
          <Cell>11/20/2010</Cell>
        </Row>
        <Row key="4">
          <Cell>log.txt</Cell>
          <Cell>Text Document</Cell>
          <Cell>1/18/2016</Cell>
        </Row>
      </TableBody>
    </Table>
  );
}

//render
export function PokemonTable(props) {
  let columns = [
    { name: "Name", uid: "name" },
    { name: "Type", uid: "type" },
    { name: "Level", uid: "level" },
  ];

  let rows = [
    {
      id: 1,
      name: "Charizard",
      type: "Fire, Flying",
      level: "67",
    },
    {
      id: 2,
      name: "Blastoise",
      type: "Water",
      level: "56",
    },
    {
      id: 3,
      name: "Venusaur",
      type: "Grass, Poison",
      level: "83",
    },
    {
      id: 4,
      name: "Pikachu",
      type: "Electric",
      level: "100",
    },
  ];

  let [selectedKeys, setSelectedKeys] = useState(new Set([null]));

  return (
    <Table
      aria-label="Table with controlled selection"
      selectionMode="multiple"
      selectionBehavior="replace"
      selectedKeys={selectedKeys}
      onSelectionChange={setSelectedKeys}
      {...props}
    >
      <TableHeader columns={columns}>
        {(column) => <Column key={column.uid}>{column.name}</Column>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => <Row>{(columnKey) => <Cell>{item[columnKey]}</Cell>}</Row>}
      </TableBody>
    </Table>
  );
}
