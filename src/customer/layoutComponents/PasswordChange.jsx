import { toast } from "react-toastify";
import ReusableForm from "../../Components/ReusableForm";
import axiosClient from "../../axios-client";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextsProvider";

const PasswordChange = ({ data, setIsModalOpen }) => {
  const navigate = useNavigate();
  const { setToken, setUser } = useStateContext({});

  let template = {
    title: "change password",
    fields: [
      {
        title: "new password",
        name: "password",
        type: "password",
        validationProps: {
          required: { value: true, message: "this field is required" },
        },
      },
      {
        title: "confirm password",
        name: "confirm",
        type: "password",
        validationProps: {
          required: { value: true, message: "this field is required" },
        },
      },
    ],
  };
  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER");
    navigate("/ ");
  };

  const onSubmit = async (values) => {
    const form = new FormData();
    form.append("password", values.password);
    form.append("confirm_password", values.confirm);
    const id = toast.loading("loading...");
    const res = await axiosClient.post("buyer/profile/changePassword", form);
    if (res.data.success) {
      setIsModalOpen(false);
      toast.update(id, {
        type: "success",
        render: "successfully changed, please login again",
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
      setTimeout(() => {
        handleLogout();
      }, 1000);
    } else {
      toast.update(id, {
        type: "error",
        render: res.data.mes,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    }
  };

  function validate(watchValues, methods) {
    //watchValues: the inputs name you want to watch and validate the values of them
    //errors: it is an array contains errors recieved from form inputs
    // setError: to set a custom error
    // clear errors: can clean all the errors from the form or specify the error you want to clear [key]
    //setValue: set input value depending on specific thing
    //resetField: if you want to reset the field from the value

    let { errors, setError, clearErrors, setValue, resetField, register } =
      methods;
    if (watchValues.password !== watchValues.confirm) {
      setError("confirm", {
        type: "manual",
        message: "please make sure to match two password",
      });
    } else {
      clearErrors("confirm");
    }
  }

  return (
    <div>
      <ReusableForm
        template={template}
        watchFields={["password", "confirm"]}
        onSubmit={onSubmit}
        validate={validate}
        btnWidth={"w-[150px] self-end"}
        btnText={"change"}
        addedStyles={"md:w-[400px] lg:w-[100%]"}
      />
    </div>
  );
};

export default PasswordChange;
