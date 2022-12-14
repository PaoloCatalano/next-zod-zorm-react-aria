import React from "react";
import { useZorm, useValue } from "react-zorm";
import Button from "./Button";
import Input from "./Input";
import Switch from "./Switch";
import SingleCheckBox from "./CheckBox";
import { CheckboxGroup, Checkbox } from "./ChechBox";
import { RadioGroup, Radio } from "./Radio";
import SelectCustom from "./SelectCustom";
import FormSchema from "../utils/FormSchema";

export default function Signup() {
  const submitData = async (e) => {
    const res = await fetch("/api/user/createUser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(e.data),
    });
    const data = await res.json();
    return data;
  };

  const zo = useZorm("signup", FormSchema, {
    onValidSubmit(e) {
      e.preventDefault();
      submitData(e).then((data) => console.log(data));
      // console.log(e);
      // alert("Form ok!\n" + JSON.stringify(e.data, null, 2));
    },
  });
  const valueBox = useValue({ zorm: zo, name: zo.fields.sport() });

  const disabled = zo.validation?.success === false;

  const errorField = `border-2 border-red-500`;

  return (
    <form ref={zo.ref} className="">
      <fieldset className="container max-w-[247.2px] flex flex-col gap-4  rounded border-2 border-sky-500 my-3 p-3">
        <legend className="px-1 text-sky-600 select-none">
          Select User Profile
        </legend>
        <Input
          label="Name"
          type="text"
          description="not empty"
          name={zo.fields.name()}
          errorMessage={zo.errors.name((e) => e.message)}
          defaultValue="PC"
        />
        <Input
          label="Age"
          type="text"
          description="number only"
          name={zo.fields.age()}
          className={`px-2 ${zo.errors.age(errorField)}`}
          errorMessage={zo.errors.age("Age must a number")}
          defaultValue={1}
        />

        <SingleCheckBox
          name={zo.fields.newsletter()}
          value="Subscribe me!"
          // defaultValue="no"
          defaultSelected
        >
          Subscribe to newsletter
        </SingleCheckBox>
        <CheckboxGroup
          label="Favorite sports"
          // name={zo.fields.sport()}
          description="Choose cool sports!"
          errorMessage={zo.errors.sport((e) => e.message)}
          validationState={zo.errors.sport() ? "invalid" : ""}
          defaultValue={["soccer"]}
        >
          <Checkbox value="soccer" name={zo.fields.sport(1)("name")}>
            Soccer
          </Checkbox>
          <Checkbox value="football" name={zo.fields.sport(2)("name")}>
            Football
          </Checkbox>
          <Checkbox value="cricket" name={zo.fields.sport(3)("name")}>
            Cricket
          </Checkbox>
        </CheckboxGroup>
        <RadioGroup
          label="Plan"
          description="Select your plan."
          name={zo.fields.plan()}
          defaultValue="free"
        >
          <Radio value="free">Free</Radio>
          <Radio value="premium">Premium</Radio>
        </RadioGroup>
        {zo.errors.plan((e) => (
          <ErrorMessage message="Please choose one Plan" />
        ))}
        <SelectCustom
          name={zo.fields.payment()}
          label="Choos a method"
          id={zo.fields.payment("id")}
          placeholder="Select Payment"
          options={["MasterCard", "Visa", "American Express"]}
        />
        {zo.errors.payment((e) => (
          <ErrorMessage message="Please choose a payment method" />
        ))}

        <Switch
          name={zo.fields.terms()}
          className={`text-sky-500 ${zo.errors.terms(errorField)}`}
          errorMessage={zo.errors.terms("Must be true")}
          defaultSelected
        >
          Read Term and Conditions.
        </Switch>
        {zo.errors.terms((e) => (
          <ErrorMessage message={e.message} />
        ))}
        <hr />
        <Button isDisabled={disabled} type="submit">
          Signup!
        </Button>
      </fieldset>
      <pre className="text-left">
        zo.validation:
        <p>{JSON.stringify(zo.validation, null, 1)}</p>
      </pre>
    </form>
  );
}

function ErrorMessage({ message }) {
  return <div className="text-red-500">{message}</div>;
}
