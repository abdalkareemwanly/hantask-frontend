import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../../../Components/Logo";
import axiosClient from "../../../../axios-client";
import { useStateContext } from "../../../../contexts/ContextsProvider";
import Allert from "../../../Components/Allert";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { token ,setUser , setToken } = useStateContext();
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const mode  = "light";

  useEffect(() => {
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.setAttribute("data-theme", mode);
    }
  }, [mode]);

  const handleLogin = (e) => {
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    axiosClient.post("/admin/login", payload).then((response) => {
      setToken(response.data.token);
      setUser(response.data.admin);
      sessionStorage.setItem("mode", "light");
      localStorage.setItem('USER', JSON.stringify(response.data.admin))
      if (!response.data.token) {
        setMessage(response.data.message);
        setTimeout(() => {
          setMessage("");
        }, 2000);
      } else {
        navigate("/admin/dashboard");
      }
    }).catch((err) =>{
      console.log(err);
    })
  };

  return (
    <div className="flex flex-col bg-background-color justify-center items-center h-screen">
      {message != "" && (
        <div className="w-[100%] h-full bg-[gray] absolute bg-opacity-60 flex justify-center items-start">
          <div className="bg-background-color py-3 border shadow-lg shadow-[gray] w-4/12 opacity-100 mt-10">
            <Allert message={message} />
          </div>
        </div>
      )}
      <div className="w-3/12 p-6 mb-4">
        <Logo />
      </div>
      <div className="flex flex-col w-3/12 border border-[lightgray] p-2 bg-blocks-color">
        <h3 className="flex flex-row justify-between py-2 text-2xl border-b border-b-[lightgray] text-secondary-text p-2">
          Admin Login
        </h3>
        <form className="flex flex-col gap-4 p-4 justify-center items-center" onSubmit={handleLogin}>
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              autoComplete="User Name"
              className="p-2 outline-1 outline-[lightgray] border border-[lightgray]"
              ref={emailRef}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              autoComplete="Password"
              className="p-2 outline-1 outline-[lightgray] border border-[lightgray]"
              ref={passwordRef}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="bg-[#00697f] w-3/12 py-1 px-2 text-[white]" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
