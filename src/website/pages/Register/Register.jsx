import "./style/Register.css";
import { MdWorkOutline } from "react-icons/md";
import { GoPerson } from "react-icons/go";
import { useState } from "react";
import UserTypeButton from "./components/UserTypeButton";
import StepOneForm from "./components/StepOneForm";
import StepTwoForm from "./components/StepTwoForm";
import StepThreeForm from "./components/StepThreeForm";

function Register(props) {
  try {
    const [userType, setUserType] = useState("Buyer");
    const [step, setStep] = useState(1);
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

    const sendData = () => {
      console.log(defaultDataOne, defaultDataTwo, defaultDataThree, userType);
    };

    return (
      <>
        <div className="register-container my-12 sm:mx-auto mx-5 sm:py-12 py-6 sm:px-12 px-6 lg:w-4/5 md:w-5/6 sm:w-full">
          <div>
            <ul className="registration-tabs">
              <UserTypeButton name="Seller" userType={userType} setUserType={setUserType} icon={<MdWorkOutline />} />
              <UserTypeButton name="Buyer" userType={userType} setUserType={setUserType} icon={<GoPerson />} />
            </ul>
          </div>
          <div>
            <ul className="registration-list">
              {Array.from(Array(3).keys()).map((item, index) => {
                return (
                  <li key={index} className={"list" + (step >= item + 1 ? " active" : "")}>
                    <a className="list-click">{item + 1}</a>
                  </li>
                );
              })}
            </ul>
          </div>

          {step == 1 ? (
            <>
              <StepOneForm setStep={setStep} defaultData={defaultDataOne} setDefaultData={setDefaultDataOne} />
            </>
          ) : step == 2 ? (
            <>
              <StepTwoForm setStep={setStep} defaultData={defaultDataTwo} setDefaultData={setDefaultDataTwo} />
            </>
          ) : step == 3 ? (
            <>
              <StepThreeForm setStep={setStep} defaultData={defaultDataThree} setDefaultData={setDefaultDataThree} sendData={sendData} />
            </>
          ) : null}
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Register;
