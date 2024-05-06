import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/form/Input";
import SubmitButton from "../../components/form/SubmitButton";
import FORGOT_PASSWORD_SCHEMA from "./data/forgotPasswordSchema";
import "./style/ForgotPassword.css";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ForgotPassword(props) {
  const schema = z.object(FORGOT_PASSWORD_SCHEMA);
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const submitData = async (values) => {
    const res = await axios.post(
      "https://api.hantask.at/api/site/forgetPassword",
      {
        email: values.email,
      }
    );
    if (res.data.success) {
      const data = res.data;
      toast.success(data.message);
      nav("/reset-password", {
        state: {
          data,
          email: values.email,
        },
      });
    }
  };

  return (
    <>
      <div className="forgot-password-container my-12 sm:mx-auto mx-5 sm:py-12 py-6 sm:px-12 px-6 lg:w-2/5 md:w-2/3 sm:w-3/4">
        <h3>Forgot Password</h3>
        <h5>Enter your email for new password</h5>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="grid grid-cols-1 gap-8 my-12 relative">
            <Input
              type={"email"}
              placeholder={"Enter Email"}
              register={register}
              name={"email"}
              label={"Enter Email *"}
              errors={errors}
            />
          </div>
          <SubmitButton text={"Generate New Password"} width={"100%"} />
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;
