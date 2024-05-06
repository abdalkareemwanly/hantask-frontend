import { date, z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/form/Input";
import SubmitButton from "../../components/form/SubmitButton";
import FORGOT_PASSWORD_SCHEMA from "./data/forgotPasswordSchema";
import "./style/ResetPassword.css";
import { useEffect, useRef, useState } from "react";
import OtpTimer from "otp-timer";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ResetPassword(props) {
  const [arrayValue, setArrayValue] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const locationData = useLocation().state;
  const nav = useNavigate();
  const schema = z.object(FORGOT_PASSWORD_SCHEMA);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onPaste = (e, index) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").split("");
    if (paste.every((item) => !isNaN(Number(item)))) {
      let newInputValue = [...arrayValue];
      for (let i = 0; i < paste.length; i++) {
        if (index + i < arrayValue.length) {
          newInputValue[index + i] = paste[i];
        }
      }
      setArrayValue(newInputValue);
    }
  };
  const onKeyDown = (e) => {
    const keyCode = parseInt(e.key);
    if (
      e.key !== "Backspace" &&
      e.key !== "Delete" &&
      e.key !== "Tab" &&
      !(e.metaKey && e.key === "v") &&
      !(keyCode >= 0 && keyCode <= 9)
    ) {
      e.preventDefault();
    }
  };
  const onChange = (e, index) => {
    const input = e.target.value;

    if (!isNaN(input)) {
      setArrayValue((preValue) => {
        const newArray = [...preValue];
        newArray[index] = input;
        return newArray;
      });

      if (input !== "" && index < arrayValue.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };
  const onKeyUp = (e, index) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      setArrayValue((prevValue) => {
        const newArray = [...prevValue];
        newArray[index] = "";
        return newArray;
      });

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const submitData = async (data) => {
    const otp = arrayValue.join("");

    if (Number(otp) === locationData.data.otp_code) {
      const res = await axios.post(
        "https://api.hantask.at/api/site/password/reset",
        {
          otp_code: Number(otp),
          email: locationData.email,
        }
      );

      if (res.data.status) {
        const data = res.data;
        toast.success(data.message);
        nav("/generatePassword", {
          state: {
            data,
            email: locationData.email,
            code: locationData.data.otp_code,
          },
        });
      }
    } else {
      console.log("false");
    }
  };

  return (
    <>
      <div className="forgot-password-container my-12 sm:mx-auto mx-5 sm:py-12 py-6 sm:px-12 px-6 lg:w-2/5 md:w-2/3 sm:w-3/4">
        <h3>reset password</h3>
        <h5>enter otp code that we sent to you</h5>
        <form className="mt-8" onSubmit={handleSubmit(submitData)}>
          <div className="grid grid-cols-1 relative">
            <Input
              type={"email"}
              placeholder={"Email"}
              readonly={true}
              value={locationData.email}
              register={register}
              name={"email"}
              label={"Email *"}
              errors={errors}
            />
          </div>
          <div className="flex flex-wrap my-4 w-full">
            <label
              className="mx-2 text-sm font-semibold mb-2"
              htmlFor="passcode"
            >
              OTP *
            </label>
            <div className="w-full flex gap-4 ">
              {arrayValue.map((value, index) => (
                <input
                  key={`index-${index}`}
                  ref={(el) => el && (inputRefs.current[index] = el)}
                  inputMode="numeric"
                  maxLength={1}
                  name="passcode"
                  type="text"
                  value={String(value)}
                  onChange={(e) => onChange(e, index)}
                  onKeyUp={(e) => onKeyUp(e, index)}
                  onKeyDown={(e) => onKeyDown(e)}
                  onPaste={(e) => onPaste(e, index)}
                  className="w-[25%] h-12 border-2 border-gray-200 rounded-sm text-black focus:outline-none focus:border-greenColor text-center"
                  autoComplete="off"
                  accessKey={String(index)}
                />
              ))}
            </div>
          </div>

          <SubmitButton
            disabled={arrayValue.some((ele) => ele === "")}
            text={"Generate New Password"}
            width={"100%"}
          />
        </form>
      </div>
    </>
  );
}

export default ResetPassword;
