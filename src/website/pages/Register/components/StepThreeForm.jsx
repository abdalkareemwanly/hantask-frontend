import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../components/form/Input";
import SubmitButton from "../../../components/form/SubmitButton";
import TextArea from "../../../components/form/TextArea";
import STEP_THREE_SCHEMA from "../data/stepThreeSchema";
import { Link } from "react-router-dom";

function StepThreeForm({ setStep, defaultData, setDefaultData, sendData }) {
  try {
    const schema = z.object(STEP_THREE_SCHEMA);
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
      sendData();
    };
    return (
      <>
        <h3>Terms and Conditions</h3>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="grid grid-cols-1 gap-8 my-12 step-three">
            <div className="flex justify-center w-full">
              <Input type={"checkbox"} placeholder={"Password"} register={register} name={"agree"} label={"I agree with the"} errors={errors} element={<Link to={"/condition"}>Terms & Conditions</Link>} />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "end", gap: "10px" }}>
            <SubmitButton
              text={"Previous"}
              classes={"second-button"}
              notSubmit={true}
              onClick={() => {
                setStep(2);
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

export default StepThreeForm;
