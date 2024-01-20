import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SubmitButton from "../../../components/form/SubmitButton";
import SERVICE_STEP_SCHEMA from "../data/serviceStepSchema";

function ServiceStep({ setStep, defaultData, setDefaultData }) {
  try {
    const schema = z.object(SERVICE_STEP_SCHEMA);
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
          <div style={{ display: "flex", justifyContent: "end", gap: "10px", marginTop: "20px" }}>
            <SubmitButton text={"Next"} />
          </div>
        </form>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ServiceStep;
