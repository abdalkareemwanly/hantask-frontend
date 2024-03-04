import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../Components/Logo";
import { useStateContext } from "../../../../contexts/ContextsProvider";
import ReusableForm from "../../../../Components/ReusableForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosClient from "../../../../axios-client";
const getSideBar = () => {
  fetch("/src/admin/Json/permissions.json")
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("permissions", JSON.stringify(data));
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};
export default function AdminLogin() {
  const { token, setUser, setToken } = useStateContext();
  const navigate = useNavigate();
  const mode = localStorage.getItem("theme");

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.setAttribute("data-theme", mode);
    }
  }, [mode]);

  const handleLogin = (values) => {
    const id = toast.loading("Please wait...");
    const payload = {
      email: values.email,
      password: values.password,
    };
    axiosClient
      .post("http://localhost:8000/api/admin/login", payload)
      .then((response) => {
        toast.update(id, {
          render: response?.data?.message,
          type: "success",
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
        getSideBar();

        setToken(response.data.token);
        setUser(response.data.data);

        sessionStorage.setItem("mode", "light");
        localStorage.setItem("USER", JSON.stringify(response.data.admin));
        if (!response.data.token) {
          toast.update(id, {
            render: response?.data?.message,
            type: "error",
            isLoading: false,
            autoClose: true,
            closeButton: true,
          });
        } else {
          navigate("/admin/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.update(id, {
          render: "Something went wrong",
          type: "error",
          isLoading: false,
          autoClose: true,
          closeButton: true,
        });
      });
  };

  const template = {
    title: "admin login",
    fields: [
      {
        title: "username",
        name: "email",
        type: "text",
      },
      {
        title: "password",
        name: "password",
        type: "password",
      },
    ],
  };

  return (
    <div className="flex flex-col bg-background-color justify-center items-center h-screen">
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme={mode}
      />
      {/* {message != "" && (
        <div className="w-[100%] h-full bg-[gray] absolute bg-opacity-60 flex justify-center items-start">
          <div className="bg-background-color py-3  shadow-lg shadow-[gray] w-4/12 opacity-100 mt-10">
            <Allert message={message} />
          </div>
        </div>
      )} */}
      <div className="md:w-[25%] w-[90%] p-6 mb-4">
        <Logo />
      </div>
      <div className="flex flex-col lg:w-[25%] md:w-[50%] w-[90%] rounded-xl p-6 bg-blocks-color component-shadow">
        <ReusableForm
          template={template}
          onSubmit={handleLogin}
          btnText={"login"}
          btnWidth={"w-[150px]"}
        />
      </div>
    </div>
  );
}
