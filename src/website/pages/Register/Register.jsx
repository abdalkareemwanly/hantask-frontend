import "./style/Register.css";
import { MdWorkOutline } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { useEffect, useState } from "react";
import UserTypeButton from "./components/UserTypeButton";
import StepOneForm from "./components/StepOneForm";
import StepTwoForm from "./components/StepTwoForm";
import StepThreeForm from "./components/StepThreeForm";
import axiosClient from "../../../axios-client";

function Register(props) {
  const [userType, setUserType] = useState("Buyer");
  const [step, setStep] = useState(1);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const getAreas = async () => {
    const res = await axiosClient.get("/admin/areas");
    setAreas(res.data?.data);
  };
  const getCities = async () => {
    const res = await axiosClient.get("/admin/citys");
    setCities(res.data?.data);
  };
  const getCountries = async () => {
    const res = await axiosClient.get("/admin/countries");
    setCountries(res.data?.data);
  };

  const FILTER_DATA = {
    country: {
      type: "select",
      name: "country",
      placeholder: "Service Country *",
      list: countries.map((ele) => {
        return {
          ...ele,
          name: ele.country,
        };
      }),
    },
    city: {
      type: "select",
      name: "city",
      placeholder: "Service City *",
      list: cities.map((ele) => {
        return {
          ...ele,
          name: ele.service_city,
        };
      }),
    },
    area: {
      type: "select",
      name: "area",
      placeholder: "Service Area *",
      list: areas.map((ele) => {
        return {
          ...ele,
          name: ele.service_area,
        };
      }),
    },
  };

  useEffect(() => {
    getAreas();
    getCountries();
    getCities();
  }, []);
  const [defaultDataOne, setDefaultDataOne] = useState({
    fullname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    repeatPassword: "",
  });
  const [defaultDataTwo, setDefaultDataTwo] = useState({
    country: "",
    city: "",
    area: "",
  });
  const [defaultDataThree, setDefaultDataThree] = useState({ agree: false });

  const sendData = async () => {
    const formData = new FormData();

    formData.append("name", defaultDataOne.fullname);
    formData.append("email", defaultDataOne.email);
    formData.append("username", defaultDataOne.username);
    formData.append("password", defaultDataOne.password);
    formData.append("user_type", userType === "buyer" ? 0 : 1);
    formData.append("country_id", defaultDataTwo.country);
    formData.append("service_city", defaultDataTwo.city);
    formData.append("service_area", defaultDataTwo.area);

    const res = await axiosClient.post("/site/register", formData);
    console.log(res);
  };

  return (
    <>
      <div className="register-container my-12 sm:mx-auto mx-5 sm:py-12 py-6 sm:px-12 px-6 lg:w-4/5 md:w-5/6 sm:w-full">
        <div>
          <ul className="registration-tabs">
            <UserTypeButton
              name="Seller"
              userType={userType}
              setUserType={setUserType}
              icon={<MdWorkOutline />}
            />
            <UserTypeButton
              name="Buyer"
              userType={userType}
              setUserType={setUserType}
              icon={<GoPerson />}
            />
          </ul>
        </div>
        <div>
          <ul className="registration-list">
            {Array.from(Array(3).keys()).map((item, index) => {
              return (
                <li
                  key={index}
                  className={"list" + (step >= item + 1 ? " active" : "")}
                >
                  <a className="list-click">{item + 1}</a>
                </li>
              );
            })}
          </ul>
        </div>

        {step == 1 ? (
          <>
            <StepOneForm
              setStep={setStep}
              defaultData={defaultDataOne}
              setDefaultData={setDefaultDataOne}
            />
          </>
        ) : step == 2 ? (
          <>
            <StepTwoForm
              setStep={setStep}
              defaultData={defaultDataTwo}
              setDefaultData={setDefaultDataTwo}
              countries={countries}
              FILTER_DATA={FILTER_DATA}
              cities={cities}
              areas={areas}
            />
          </>
        ) : step == 3 ? (
          <>
            <StepThreeForm
              setStep={setStep}
              defaultData={defaultDataThree}
              setDefaultData={setDefaultDataThree}
              sendData={sendData}
            />
          </>
        ) : null}
      </div>
    </>
  );
}

export default Register;
