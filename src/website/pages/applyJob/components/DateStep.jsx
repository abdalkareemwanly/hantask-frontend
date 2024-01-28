import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../../../components/form/SubmitButton";
import DATE_STEP_SCHEMA from "../data/dateStepSchema";
import DatePickerInput from "../../../components/form/DatePicker";
import "../style/DateStep.css";

function DateStep({ setStep, defaultData, setDefaultData }) {
  const schema = z.object(DATE_STEP_SCHEMA);
  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
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
      <form onSubmit={handleSubmit(submitData)}>
        <DatePickerInput
          register={register}
          name={"deadlineDate"}
          label={"Deadline Date"}
          errors={errors}
          defaultData={defaultData}
          setValue={setValue}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            gap: "10px",
            marginTop: "20px",
          }}
        >
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
}

export default DateStep;
