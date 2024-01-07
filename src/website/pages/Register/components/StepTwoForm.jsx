import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../../../components/form/SubmitButton";
import FILTER_DATA from "../data/filterData";
import { useState } from "react";
import Select from "../../../components/form/Select";
import STEP_TWO_SCHEMA from "../data/stepTwoSchema";

function StepTwoForm({ setStep, defaultData, setDefaultData }) {
  try {
    const schema = z.object(STEP_TWO_SCHEMA);
    const {
      register,
      trigger,
      handleSubmit,
      setValue,
      formState: { errors },
      getValues,
    } = useForm({
      resolver: zodResolver(schema),
      defaultValues: {
        ...defaultData,
      },
    });

    const submitData = (data) => {
      setDefaultData({ ...data });
      setStep(3);
    };

    return (
      <>
        <h3>Service Area</h3>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="jobs-filter grid grid-cols-1">
            {Object.keys(getValues()).map((key, index) => {
              return <Select key={index} itemKey={key} data={FILTER_DATA[key]} setValue={setValue} getValues={getValues} errors={errors} trigger={trigger} />;
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "end", gap: "10px" }}>
            <SubmitButton
              text={"Previous"}
              classes={"second-button"}
              notSubmit={true}
              onClick={() => {
                setDefaultData({ ...getValues() });
                setStep(1);
              }}
            />
            <SubmitButton text={"Next"} />
          </div>
        </form>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default StepTwoForm;
