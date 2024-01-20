import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../../../components/form/SubmitButton";
import CONFIRMATION_STEP_SCHEMA from "../data/confirmationStepSchema";
import Input from "../../../components/form/Input";
import { Link } from "react-router-dom";
import "../style/ConfirmationStep.css";

function ConfirmationStep({ setStep, defaultData, setDefaultData, sendData, setExpectedSallary }) {
  try {
    const schema = z.object(CONFIRMATION_STEP_SCHEMA);
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
      sendData(data);
    };
    return (
      <>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-8 my-12">
            <Input type={"number"} placeholder={"Expected Salary in $"} register={register} name={"expectedSalary"} label={"Expected Salary"} errors={errors} onChange={(e) => setExpectedSallary(e.target.value)} />
          </div>
          <div className="flex justify-end w-full confirmation-step">
            <Input type={"checkbox"} register={register} name={"agree"} label={"I agree with the"} errors={errors} element={<Link to={"/condition"}>Terms & Conditions</Link>} />
          </div>
          <div style={{ display: "flex", justifyContent: "end", gap: "10px", marginTop: "20px" }}>
            <SubmitButton
              text={"Previous"}
              classes={"second-button"}
              notSubmit={true}
              onClick={() => {
                setDefaultData({ ...getValues() });
                setStep(3);
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

export default ConfirmationStep;
