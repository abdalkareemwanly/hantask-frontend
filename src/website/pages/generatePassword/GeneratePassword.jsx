import { useForm } from "react-hook-form";
import Input from "../../components/form/Input";
import SubmitButton from "../../components/form/SubmitButton";
import "./style/ResetPassword.css";
import { useLocation, useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "react-toastify";

function GeneratePassword() {
  const locationData = useLocation().state;
  const nav = useNavigate();
  console.log(locationData);
  const schema = z
    .object({
      password: z.string().min(1),
      confirm_password: z.string().min(1),
    })
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords don't match",
      path: ["confirm_password"], // path of error
    });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });
  // console.log(watch());
  const submitData = async (data) => {
    console.log(data);
    const res = await axios.post(
      "https://api.hantask.at/api/site/password/confirm",
      {
        password: data.password,
        password_confirmation: data.confirm_password,
      },
      {
        headers: {
          Authorization: `Bearer ${locationData.data.token}`,
        },
      }
    );
    if (res.status === 200) {
      toast.success(res.data.message);
      nav("/login");
    } else {
      toast.error("please go back and try again");
    }
    console.log(res);
  };

  return (
    <>
      <div className="forgot-password-container my-12 sm:mx-auto mx-5 sm:py-12 py-6 sm:px-12 px-6 lg:w-2/5 md:w-2/3 sm:w-3/4">
        <h3>reset password</h3>
        <h5>enter otp code that we sent to you</h5>
        <form
          className="mt-8 flex flex-col gap-4 "
          onSubmit={handleSubmit(submitData)}
        >
          <div className="grid grid-cols-1 relative">
            <div className="form-input">
              <label htmlFor={"password"}>{"new password *"}</label>
              <input
                type={"password"}
                placeholder={"new password"}
                id={"password"}
                {...register("password")}
              />
              {errors["password"] ? (
                <span>{errors["password"].message}</span>
              ) : null}
            </div>
          </div>
          <div className="grid grid-cols-1 relative">
            <div className="form-input">
              <label htmlFor={"confirm_password"}>{"confirm_password *"}</label>
              <input
                type={"password"}
                placeholder={"confirm password"}
                id={"confirm_password"}
                {...register("confirm_password")}
              />
              {errors["confirm_password"] ? (
                <span>{errors["confirm_password"].message}</span>
              ) : null}
            </div>
          </div>
          <SubmitButton text={"Generate New password"} width={"100%"} />
        </form>
      </div>
    </>
  );
}

export default GeneratePassword;
