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
  const [isDisabled, setIsDisabled] = useState(true);
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
    // setIsDisabled(true);
    e.preventDefault();
    const formValues = new FormData();
    const toaster = toast.loading("validating...");
    const month = state.expiry.split("/")[0];
    const year = "20" + state.expiry.split("/")[1];
    if (
      plan &&
      state.number.length > 0 &&
      state.cvc.length > 0 &&
      month &&
      year
    ) {
      formValues.append("paypal_plan_id", plan.paypal_plan_id);
      formValues.append("stripe_plan_id", plan.stripe_plan_id);
      formValues.append("method", state.method);
      formValues.append("email", state.email);
      formValues.append("payment_method", state.number);
      formValues.append("card_cvc", state.cvc);

      formValues.append("card_exp_month", month);
      formValues.append("card_exp_year", year);
      formValues.append("coupon", state.coupon);

      const res = await axiosClient.post("/site/checkout", formValues);
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
      console.log("test25");
    }
  };
  return (
    <div className="min-h-[50vh]  py-10 xl:px-[5%] lg:px-[10%] md:px-[15%] px-[5%]">
      <h3 className="text-center text-3xl font-bold mt-6 mb-12">
        confirm payment
      </h3>
      <form className="flex flex-col gap-8" onSubmit={onSubmit}>
        <div className="flex items-center justify-between md:flex-row flex-wrap">
          <div className="flex justify-center items-center flex-[48%]">
            plan description and details
          </div>
          <div className="flex gap-4 flex-col flex-[48%]">
            <div className="flex flex-col gap-2 items-start w-[70%]">
              <Cards
                number={state.number}
                expiry={state.expiry}
                cvc={state.cvc}
                name={state.name}
                focused={state.focus}
              />
            </div>
            <div className="flex flex-col gap-2 items-start w-[70%]">
              <label>Payment Method</label>
              <select
                className="border border-greenColor p-2 w-full rounded-md outline-none component-shadow "
                max={16}
                maxLength={16}
                name="method"
                required
                value={state.method}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              >
                <option value={plan.paypal_plan_id}>Paypal</option>
                <option value={plan.stripe_plan_id}>Stripe</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 items-start w-[70%]">
              <label>E-mail</label>
              <input
                className="border border-greenColor p-2 w-full rounded-md outline-none component-shadow "
                type="text"
                max={16}
                maxLength={16}
                name="email"
                required
                placeholder="Email"
                value={state.email}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </div>
            <div className="flex flex-col gap-2 items-start w-[70%]">
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
            <div className="flex flex-row gap-2 items-start w-[70%]">
              <div>
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
              <div>
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
            </div>
            <div className="flex flex-col gap-2 items-start w-[70%]">
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
            <div className="flex flex-row gap-2 items-end justify-between w-[70%]">
              <div>
                <label>coupon code</label>
                <input
                  className="border border-orangeColor p-2 w-full rounded-md outline-none component-shadow "
                  type="text"
                  max={16}
                  maxLength={16}
                  name="coupon"
                  // required
                  placeholder="enter coupon code"
                  value={state.coupon}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
              <div>
                <button className="bg-orangeColor text-white p-2 rounded-lg">
                  check code
                </button>
              </div>
            </div>
            <div>
              <button
                type="submit"
                // disabled={isDisabled}
                className="my-8 mx-auto w-[100px] text-lg bg-greenColor component-shadow p-2 text-white rounded-md"
              >
                confirm
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StripePayments;
