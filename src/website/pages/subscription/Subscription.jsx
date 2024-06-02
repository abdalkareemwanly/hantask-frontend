import { useState } from "react";
import { useQueryHook } from "../../../hooks/useQueryHook";
import axiosClient from "../../../axios-client";
import { Link } from "react-router-dom";
import { formatMoney } from "../../../functions/price";
import Loader from "../../../Components/Loader";
import NetworkErrorComponent from "../../../Components/NetworkErrorComponent";
import { FaCcPaypal } from "react-icons/fa6";
import { FaCcStripe } from "react-icons/fa";

const getData = async () => {
  const res = await axiosClient.get("site/plans");
  return res.data.data;
};

const Modal = () => {
  return (
    <div className="fixed grid grid-cols-2  place-items-center rounded-xl shadow-lg w-[50%] h-[50%] top-[50%] left-[50%] bg-white border border-mainBorder z-[100] translate-x-[-50%] translate-y-[-50%]">
      <button className="capitalize flex items-center gap-4 flex-col justify-center">
        {" "}
        <FaCcPaypal size={80} color="#2790c2" />
        continue with paypal{" "}
      </button>
      <button className="capitalize flex items-center gap-4 flex-col justify-center">
        {" "}
        <FaCcStripe size={80} color="#635bff" />
        continue with stripe{" "}
      </button>
    </div>
  );
};

const Subscription = () => {
  const { data: plans, isLoading, isError } = useQueryHook(["plans"], getData);

  if (isLoading) return <Loader />;
  if (isError) return <NetworkErrorComponent />;

  return (
    <div className="lg:px-40 md:px-12  px-6 py-24 flex flex-col gap-12 text-center  justify-center items-center">
      <div className="flex flex-col gap-6">
        <h2 className="text-[5.5vw] md:text-[3vw] lg:text-[2.5vw] font-semibold">
          price plan
        </h2>
        <p>
          Here are our plans. Choose the plan which is more suitable for you
          from our plans collections
        </p>
      </div>
      <div className="flex items-center gap-12 flex-wrap">
        {plans.map((plan) => (
          <SubscriptionCard key={plan.id} data={plan} />
        ))}
      </div>
    </div>
  );
};
const SubscriptionCard = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="flex flex-col gap-6 justify-center items-center w-[370px] component-shadow">
      {showModal && <Modal />}
      <div className="flex flex-col justify-center items-center gap-2 bg-[#efefef] w-full p-6">
        <img
          src={import.meta.env.VITE_WEBSITE_URL + "/" + data.image}
          className="w-[80px] h-[80px]  object-cover rounded-full"
        />
        <h4 className="text-xl font-semibold ">{data.name}</h4>
      </div>
      <div className="w-full flex flex-col px-6">
        <span className="border-b p-6 ">
          Monthly billing cycle, system will deduct this amount from seller
          account, if seller has balance, otherwise will send an invoice mail to
          pay the bill
        </span>
        <span className="border-b p-6 ">
          6 Connect to get order from buyer, each order will deduct 2 connect
          from seller account.
        </span>
        <span className="border-b p-6">
          Seller can create 6 Services Maximum.
        </span>
        <span className=" p-6 "> Seller can create 6 Services Maximum.</span>
      </div>
      <div className="flex flex-col justify-center items-center gap-2 bg-[#efefef] w-full p-6">
        <span className="text-greenColor font-semibold text-2xl">
          {formatMoney(data?.price)}
        </span>
        <button
          // to="/paymentNow"
          // state={{
          //   plan: data,
          // }}
          onClick={() => setShowModal(true)}
          className="border py-3 px-6  bg-greenColor text-white"
        >
          subscribe now
        </button>
      </div>
    </div>
  );
};
export default Subscription;
