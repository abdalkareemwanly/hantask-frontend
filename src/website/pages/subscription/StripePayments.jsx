import { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useLocation } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const StripePayments = () => {
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });
  const { plan } = useLocation().state;
  const nav = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);
  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    if (name === "number") {
      const formattedValue = value.replace(/(\d{4})/g, "$1 ").trim();
      setState((prev) => ({ ...prev, number: formattedValue }));
    }
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };
  const handleInputChange2 = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    let formattedValue = "";

    if (inputValue.length <= 4) {
      // Input is MMYY or MMYYYY
      formattedValue = `${inputValue.slice(0, 2)}/${inputValue.slice(2)}`;
    } else {
      // Prevent more than 4 digits
      formattedValue = inputValue.slice(0, 4);
    }

    // Update state or perform other actions with formattedValue
    setState((prev) => ({
      ...prev,
      expiry: formattedValue,
    }));
  };

  const checkCoupon = async () => [console.log("checking")];

  const onSubmit = async (e) => {
    setIsDisabled(true);
    e.preventDefault();
    const formValues = new FormData();
    const toaster = toast.loading("validating...");
    const month = state.expiry.split("/")[0];
    const year = "20" + state.expiry.split("/")[1];
    if (
      plan.plan_id.length > 0 &&
      state.number.length > 0 &&
      state.cvc.length > 0 &&
      month &&
      year
    ) {
      formValues.append("plan_id", plan.plan_id);
      formValues.append("payment_method", state.number);
      formValues.append("card_cvc", state.cvc);

      formValues.append("card_exp_month", month);
      formValues.append("card_exp_year", year);

      const res = await axiosClient.post("/site/checkout", formValues);
      console.log(res);
      if (res.status === 200) {
        toast.update(toaster, {
          type: "success",
          render: res.data.message,
          closeOnClick: true,
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
        setTimeout(() => {
          nav("/serviceProvider/home", { replace: true });
        }, 250);
        setIsDisabled(false);
      } else {
        toast.update(toaster, {
          type: "error",
          render: res.data.message,
          closeOnClick: true,
          isLoading: false,
          autoClose: true,
          closeButton: true,
          pauseOnHover: false,
        });
        setIsDisabled(false);
      }
    } else {
      return;
    }
  };
  return (
    <div className="min-h-[50vh]  py-10 xl:px-[5%] lg:px-[10%] md:px-[15%] px-[5%]">
      <h3 className="text-center text-3xl font-bold mt-6 mb-12">
        confirm payment
      </h3>
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <div className="flex items-center md:flex-row flex-wrap">
          <div className="flex justify-center items-center flex-[48%]">
            <Cards
              number={state.number}
              expiry={state.expiry}
              cvc={state.cvc}
              name={state.name}
              focused={state.focus}
            />
          </div>
          <div className="flex gap-4  flex-wrap flex-[48%]">
            <div className="flex flex-col gap-2 items-start w-72">
              <label>card number</label>
              <input
                className="border border-greenColor p-2 w-full rounded-md outline-none component-shadow "
                type="text"
                max={16}
                maxLength={16}
                name="number"
                required
                placeholder="Card Number"
                value={state.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className="flex flex-col gap-2 items-start w-72">
              <label>name of the card owner</label>
              <input
                className="border border-greenColor p-2 w-full rounded-md outline-none component-shadow "
                type="text"
                name="name"
                placeholder="card name"
                value={state.name}
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className="flex flex-col gap-2 items-start w-72">
              <label>CVC</label>
              <input
                className="border border-greenColor p-2 w-full rounded-md outline-none component-shadow "
                type="text"
                max={3}
                required
                maxLength={3}
                name="cvc"
                placeholder="Card CVC"
                value={state.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className="flex flex-col gap-2 items-start w-72">
              <label>expiration date</label>
              <input
                className="border border-greenColor p-2 w-full rounded-md outline-none component-shadow "
                type="text"
                name="expiry"
                maxLength={5}
                pattern="^(0[1-9]|1[0-2])\/\d{2}$"
                required
                value={state.expiry}
                placeholder="MM/YY"
                onChange={handleInputChange2}
                onFocus={handleInputFocus}
              />
            </div>
          </div>
        </div>
        <div className="flex items-end gap-2 h-auto">
          <div className="flex flex-col gap-2 ">
            <label>coupon code</label>
            <input
              className="border border-orangeColor p-2 w-full rounded-md outline-none component-shadow "
              type="text"
              max={16}
              maxLength={16}
              name="number"
              // required
              placeholder="enter coupon code"
              // value={state.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          </div>
          <button className="bg-orangeColor text-white p-2 rounded-lg">
            check code
          </button>
        </div>
        <button
          type="submit"
          // disabled={isDisabled}
          className="my-8 mx-auto w-[100px] text-lg bg-greenColor component-shadow p-2 text-white rounded-md"
        >
          confirm
        </button>
      </form>
    </div>
  );
};

export default StripePayments;