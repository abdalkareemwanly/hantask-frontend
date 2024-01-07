import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/form/Input";
import Login_SCHEMA from "./data/loginSchema";
import SubmitButton from "../../components/form/SubmitButton";
import "./style/Login.css";
import { Link } from "react-router-dom";
import LoginTable from "./components/LoginTable";
import LoginWith from "./components/LoginWith";
import DEFAULT_USERS from "./data/defaultUsers";

function Login(props) {
  try {
    const schema = z.object(Login_SCHEMA);
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });
    const submitData = (data) => {
      console.log(data);
    };
    return (
      <>
        <div className="login-container my-12 sm:mx-auto mx-5 sm:py-12 py-6 sm:px-12 px-6 lg:w-2/5 md:w-2/3 sm:w-3/4">
          <h3>Sign In</h3>
          <form onSubmit={handleSubmit(submitData)}>
            <div className="grid grid-cols-1 gap-8 my-12 relative">
              <Input type={"text"} placeholder={"Username"} register={register} name={"username"} label={"Username *"} errors={errors} />
              <Input type={"password"} placeholder={"Password"} register={register} name={"password"} label={"Your Password *"} errors={errors} />
              <Input type={"checkbox"} placeholder={"Password"} register={register} name={"rememberme"} label={"Remember Me"} errors={errors} />
              <Link to={"/forgot-password"}>Forgot Password</Link>
            </div>
            <SubmitButton text={"Sign In"} width={"100%"} />
          </form>
          <div className="signup-sentence">
            <span>Do Not Have Account?</span>
            <Link to={"/register"}> {" Register"}</Link>
          </div>
          <LoginTable users={DEFAULT_USERS} setValue={setValue} />

          <LoginWith />
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Login;
