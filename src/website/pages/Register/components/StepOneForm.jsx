import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../components/form/Input";
import SubmitButton from "../../../components/form/SubmitButton";
import TextArea from "../../../components/form/TextArea";
import STEP_ONE_SCHEMA from "../data/stepOneSchema";

function StepOneForm({ setStep, defaultData, setDefaultData }) {
  const schema = z
    .object(STEP_ONE_SCHEMA)
    .refine((data) => data.password === data.repeatPassword, {
      message: "password is not match",
      path: ["repeatPassword"],
    });
  const {
    register,
    handleSubmit,
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
            name={"fullname"}
            label={"Full Name *"}
            errors={errors}
          />
          <Input
            type={"text"}
            placeholder={"Your Username"}
            register={register}
            name={"username"}
            label={"Username *"}
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
            type={"password"}
            placeholder={"Your Password"}
            register={register}
            name={"password"}
            label={"Password *"}
            errors={errors}
          />
          <Input
            type={"password"}
            placeholder={"Repeat Password"}
            register={register}
            name={"repeatPassword"}
            label={"Confirm Password *"}
            errors={errors}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <SubmitButton text={"Next"} />
        </div>
      </form>
    </>
  );
}

export default StepOneForm;
