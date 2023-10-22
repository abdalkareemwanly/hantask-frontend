import React from "react";
import InputDynamic from "./FormDynamicComponent/InputDynamic";
import SelectDynamic from "./FormDynamicComponent/SelectDynamic";
import TextArea from "./FormDynamicComponent/TextArea";

export default function FormDynamic(props) {
  const InputAccess = props.InputAccess;
  const SelectAccess = props.SelectAccess;
  const TextAreaAccess = props.TextAreaAccess;
  const FormInput = props.FormInput;
  const FormSelect = props.FormSelect;
  const FormTextArea = props.FormTextArea;
  const Label = props.Label;
  return (
    <div>
      {InputAccess === true ? (
        <InputDynamic FormInput={FormInput} Label={Label} />
      ) : null}
      {SelectAccess === true ? (
        <SelectDynamic FormSelect={FormSelect} Label={Label} />
      ) : null}
      {TextAreaAccess === true ? (
        <TextArea FormTextArea={FormTextArea} Label={Label} />
      ) : null}
    </div>
  );
}
