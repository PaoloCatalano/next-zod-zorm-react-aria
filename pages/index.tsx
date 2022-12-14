import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import Button from "../components/Button";
import Zorm from "../components/Zorm-example";
import ToggleButton from "../components/ToggleButton";
import Tooltip from "../components/Tooltip";
import Switch from "../components/Switch";
import SingleCheckbox from "../components/CheckBox";
import { CheckboxGroup, Checkbox } from "../components/ChechBox";
import { RadioGroup, Radio } from "../components/Radio";
import { Item } from "react-stately";
import ListBox from "../components/ListBox";
import Select from "../components/Select";
import GridList from "../components/GridList";
import { useAsyncList } from "react-stately";
import Table1, { PokemonTable } from "../components/Table";
import DateField, { TimeField } from "../components/Date";
import { useDateFormatter } from "react-aria";
import {
  now,
  getLocalTimeZone,
  parseDate,
  parseZonedDateTime,
  parseAbsoluteToLocal,
  today,
  parseTime,
} from "@internationalized/date";
import SearchField from "../components/SearchField";
import NumberField from "../components/NumberField";

const Home: NextPage = () => {
  let [selected, setSelected] = React.useState(false);

  //listBox
  let options = [
    { id: 1, name: "Aardvark" },
    { id: 2, name: "Cat" },
    { id: 3, name: "Dog" },
    { id: 4, name: "Kangaroo" },
  ];

  //date and time
  let [date, setDate] = React.useState(parseDate("1985-07-03"));
  let [time, setTime] = React.useState(parseTime("16:45:30"));
  let formatter = useDateFormatter({ dateStyle: "full" });

  //retrive async data with React-Aria
  let list = useAsyncList({
    async load({ signal, cursor }) {
      if (cursor) {
        cursor = cursor.replace(/^http:\/\//i, "https://");
      }

      let res = await fetch(
        cursor || `https://swapi.py4e.com/api/people/?search=`,
        { signal }
      );
      let json = await res.json();

      return {
        items: json.results,
        cursor: json.next,
      };
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Next w/ Zorm and React-Aria</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center space-y-10">
        <h1 className="text-6xl font-bold">
          Example with{" "}
          <a
            className="text-red-600"
            href="https://react-spectrum.adobe.com/react-aria/"
          >
            React-Aria
          </a>
        </h1>{" "}
        <Button onPress={() => alert("Button pressed!")}>Press me</Button>
        <p>Toggle button asl well</p>
        <ToggleButton>Toggle me</ToggleButton>
        <p>Tooltip on Hover</p>
        <Tooltip tooltip="Save" delay={0}>
          💾
        </Tooltip>
        <p>Switch</p>
        <Switch onChange={setSelected}>Low power mode</Switch>
        <p>{selected ? "Low" : "High"} power mode active.</p>
        <p>Single Check Box</p>
        <SingleCheckbox name="newsletter" value="subscribe">
          Subscribe
        </SingleCheckbox>
        <p>Check Box Group</p>
        <CheckboxGroup
          label="Favorite sports"
          description="Select your favorite sports."
          errorMessage="Invalid selection of sports."
          validationState="invalid"
          defaultValue={["soccer"]}
        >
          <Checkbox value="soccer" isDisabled>
            Soccer
          </Checkbox>
          <Checkbox value="baseball">Baseball</Checkbox>
          <Checkbox value="basketball">Basketball</Checkbox>
        </CheckboxGroup>
        <i>
          for Controlled value{" "}
          <a
            className="underline text-slate-600"
            href="https://react-spectrum.adobe.com/react-aria/useCheckboxGroup.html#controlled-value"
            target="_blank"
            rel="noopener noreferrer"
          >
            check here!
          </a>
        </i>
        <p>Radio Group</p>
        <RadioGroup
          label="Favorite pet"
          description="Select your favorite pet."
          value={selected}
          onChange={setSelected}
        >
          <Radio value="dogs">Dogs</Radio>
          <Radio value="cats">Cats</Radio>
        </RadioGroup>
        <p>You have selected: {selected}</p>
        <p>Simple List - Options</p>
        <ListBox
          label="Animals"
          items={options}
          // selectionMode="single"
          selectionMode="multiple"
        >
          {(item: any) => <Item>{item.name}</Item>}
        </ListBox>
        <p> List SELECT - OPTION</p>
        <i>non funziona!</i>
        <Select label="Favorite Color">
          <Item>Red</Item>
          <Item>Orange</Item>
        </Select>
        <p>Grid List</p>
        <GridList
          aria-label="List with selection"
          // selectionMode="single"
          selectionMode="multiple"
          // selectionBehavior="replace"
          selectionBehavior="toggle"
        >
          <Item textValue="Blastoise">Blastoise</Item>
          <Item textValue="Venusaur">Venusaur</Item>
          <Item textValue="Pikachu">Pikachu</Item>
        </GridList>
        <p>with async data</p>
        <GridList
          selectionMode="multiple"
          aria-label="Async loading ListView example"
          items={list.items}
        >
          {(item: any) => <Item key={item.name}>{item.name}</Item>}
        </GridList>
        <p>Tables</p>
        <Table1 />
        <PokemonTable />
        <p>Data Fields</p>
        <DateField
          label="Appointment date"
          granularity="second"
          minValue={today(getLocalTimeZone())}
          // placeholderValue={now(getLocalTimeZone())}
          defaultValue={parseAbsoluteToLocal("2021-11-07T07:45:01Z")}
          // defaultValue={parseZonedDateTime(
          //   "2022-11-07T00:45[America/Los_Angeles]"
          // )}
        />
        <DateField
          label="Appointment date and time"
          value={date}
          onChange={setDate}
          className="mt-4"
        />
        <p>
          Selected date: {formatter.format(date.toDate(getLocalTimeZone()))}
        </p>
        <h2 className="mb-2 mt-12 font-bold text-xl text-left">TimeField</h2>
        <TimeField
          label="Appointment time"
          granularity="second"
          value={time}
          onChange={setTime}
          // defaultValue={now(getLocalTimeZone())}
        />
        <p>
          Selected time: {time.hour}:{time.minute}:{time.second}
        </p>
        <p>Simple Search Field</p>
        <SearchField label="Search" onSubmit={(text: string) => alert(text)} />
        <p>Number Field</p>
        <NumberField
          label="Price"
          defaultValue={7}
          // formatOptions={{
          //   signDisplay: "exceptZero",
          //   minimumFractionDigits: 1,
          //   maximumFractionDigits: 2,
          // }}
          // formatOptions={{
          //   style: 'percent'
          // }}
          // formatOptions={{
          //   style: "currency",
          //   currency: "EUR",
          //   currencyDisplay: "code",
          //   currencySign: "accounting",
          // }}
          formatOptions={{
            style: "unit",
            unit: "meter",
            unitDisplay: "long",
          }}
        />
        <NumberField
          label="Step + minValue + maxValue"
          minValue={2}
          maxValue={21}
          step={3}
        />
        <hr />
        <h1 className="text-6xl font-bold">
          and{" "}
          <a
            className="text-red-300"
            href="https://github.com/esamattis/react-zorm"
          >
            Zorm
          </a>
        </h1>
        <Zorm />
        {/* <ModalTrigger isDismissable label="Open Dialog">
          {() => (
            <Dialog title="Notice">Click outside to close this dialog.</Dialog>
          )}
        </ModalTrigger> */}
      </main>
    </div>
  );
};

export default Home;
