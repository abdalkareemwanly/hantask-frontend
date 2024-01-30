import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/form/Input";
import Login_SCHEMA from "./data/loginSchema";
import SubmitButton from "../../components/form/SubmitButton";
import "./style/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { useStateContext } from "../../../contexts/ContextsProvider";
import { toast } from "react-toastify";

function Login(props) {
  const schema = z.object(Login_SCHEMA);
  const { token, setUser, setToken } = useStateContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });
  const submitData = async (data) => {
    const toastId = toast.loading("logging in...");
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    const res = await axiosClient.post("/site/login", formData);

    if (res.data.success) {
      toast.update(toastId, {
        type: "success",
        render: res.data.message,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
      setToken(res.data.token);
      setUser(res.data.data);
      sessionStorage.setItem("mode", "light");
      localStorage.setItem("USER", JSON.stringify(res.data.user));
      if (res.data.user.user_type === "buyer") {
        navigate("/customer/home");
      } else {
        navigate("/serviceProvider/home");
      }
    } else {
      toast.update(toastId, {
        type: "error",
        render: res.data.message,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    }
  };
  return (
    <>
      <div className="login-container my-12 sm:mx-auto mx-5 sm:py-12 py-6 sm:px-12 px-6 lg:w-2/5 md:w-2/3 sm:w-3/4">
        <h3>Sign In</h3>
        <form onSubmit={handleSubmit(submitData)}>
          <div className="grid grid-cols-1 gap-8 my-12 relative">
            <Input
              type={"email"}
              placeholder={"email"}
              register={register}
              name={"email"}
              label={"email *"}
              errors={errors}
            />
            <Input
              type={"password"}
              placeholder={"Password"}
              register={register}
              name={"password"}
              label={"Your Password *"}
              errors={errors}
            />
            <Input
              type={"checkbox"}
              placeholder={"Password"}
              register={register}
              name={"rememberme"}
              label={"Remember Me"}
              errors={errors}
            />
            <Link to={"/forgot-password"}>Forgot Password</Link>
          </div>
          <SubmitButton text={"Sign In"} width={"100%"} />
        </form>
        <div className="signup-sentence">
          <span>Do Not Have Account?</span>
          <Link to={"/register"}> {" Register"}</Link>
        </div>
      </div>
    </>
  );
}

export default Login;
