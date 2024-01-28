import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../../../components/form/SubmitButton";
import BOOKING_STEP_SCHEMA from "../data/bookingStepSchema";
import Input from "../../../components/form/Input";
import TextArea from "../../../components/form/TextArea";

function BookingStep({ setStep, defaultData, setDefaultData }) {
  const schema = z.object(BOOKING_STEP_SCHEMA);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      ...defaultData,
    },
  });
  const submitData = (data) => {
    setDefaultData({ ...data });
    setStep(2);
  };
  return (
    <>
      <form onSubmit={handleSubmit(submitData)}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8 my-12">
          <Input
            type={"text"}
            placeholder={"Your Name"}
            register={register}
            name={"name"}
            label={"Your Name *"}
            errors={errors}
          />
          <Input
            type={"email"}
            placeholder={"Your Email"}
            register={register}
            name={"email"}
            label={"Your Email *"}
            errors={errors}
          />
          <Input
            type={"tel"}
            placeholder={"Your Phone"}
            register={register}
            name={"phone"}
            label={"Your Phone *"}
            errors={errors}
          />
          <Input
            type={"text"}
            placeholder={"Your Address"}
            register={register}
            name={"address"}
            label={"Your Address"}
            errors={errors}
          />
          <TextArea
            placeholder={"Order Note"}
            register={register}
            name={"note"}
            label={"Type Order Note"}
            errors={errors}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            gap: "10px",
            marginTop: "20px",
          }}
        >
          {/* <SubmitButton
            text={"Previous"}
            classes={"second-button"}
            notSubmit={true}
            onClick={() => {
              setDefaultData({ ...getValues() });
              setStep(2);
            }}
          /> */}
          <SubmitButton text={"Next"} />
        </div>
      </form>
    </>
  );
}

export default BookingStep;
