const Subscription = () => {
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
      <div className="flex items-center gap-12">
        <SubscriptionCard />
      </div>
    </div>
  );
};
const SubscriptionCard = ({ data }) => {
  return (
    <div className="flex flex-col gap-6 justify-center items-center w-[400px] component-shadow">
      <div className="flex flex-col justify-center items-center gap-2 bg-[#efefef] w-full p-6">
        <img
          src="/src/images/subs1.png"
          alt=""
          className="w-[80px] h-[80px]  object-cover"
        />
        <h4 className="text-xl font-semibold ">title</h4>
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
        <span className="text-greenColor font-semibold text-2xl">$124123</span>
        <a href="#" className="border py-3 px-6 rounded-md">
          subscribe now
        </a>
      </div>
    </div>
  );
};
export default Subscription;
