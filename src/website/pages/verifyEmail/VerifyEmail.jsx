import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/form/Input";
import SubmitButton from "../../components/form/SubmitButton";
import "./style/VerifyEmail.css";
import VERIFY_SCHEMA from "./data/verifyEmailSchema";

function VerifyEmail() {
  try {
    const schema = z.object(VERIFY_SCHEMA);
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    const submitData = (data) => {
      console.log(data);
    };

    return (
      <>
        <div className="verify-email-container my-12 sm:mx-auto mx-5 sm:py-12 py-6 sm:px-12 px-6 lg:w-2/5 md:w-2/3 sm:w-3/4">
          <h3>Verify Your Account</h3>
          <form onSubmit={handleSubmit(submitData)}>
            <div className="grid grid-cols-1 gap-8 my-12 relative">
              <Input type={"text"} placeholder={"Enter Code"} register={register} name={"code"} label={"Enter Code *"} errors={errors} />
            </div>
            <SubmitButton text={"Verify Account"} width={"100%"} />
            <span>
              Did not you receive any code? <b>Resend Code</b>
            </span>
          </form>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default VerifyEmail;
