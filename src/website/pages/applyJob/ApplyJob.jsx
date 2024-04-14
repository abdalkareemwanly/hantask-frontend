import { useState } from "react";
import ServiceDetails from "./components/ServiceDetails";
import "./style/ApplyJob.css";
import ApplyJobSteps from "./components/ApplyJobSteps";
import BookingStep from "./components/BookingStep";
import DateStep from "./components/DateStep";
import ConfirmationStep from "./components/ConfirmationStep";
import BookingSummary from "./components/BookingSummary";
import ServiceDetailsLoader from "./components/ServiceDetailsLoader";
import { useLocation, useNavigate } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { toast } from "react-toastify";

function ApplyJob() {
  const { state } = useLocation();
  const nav = useNavigate();
  const sellerData = JSON.parse(localStorage.getItem("USER"));
  const [step, setStep] = useState(1);
  const [bookingDefaultData, setBookingDefaultData] = useState({
    name: sellerData?.username,
    email: sellerData?.email,
    phone: sellerData?.phone,
    address: "",
    note: "",
  });
  const [dateDefaultData, setDateDefaultData] = useState({
    deadlineDate: new Date(state.postData.dead_line),
  });
  const [confirmationDefaultData, setConfirmationDefaultData] = useState({});
  const [expectedSalary, setExpectedSalary] = useState(false);
  const [loading, setLoading] = useState(false);
  function formatDate(date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  const sendData = async (data) => {
    const description = bookingDefaultData.note;
    const date = formatDate(dateDefaultData.deadlineDate);

    const salary = data.expectedSalary;
    console.log(description, date, salary);

    const res = await axiosClient.post(
      `/site/post/comment/${state.postData.id}`,
      {
        comment: description,
        budget: salary,
        dead_line: date,
      }
    );

    console.log(res);
    if (res.data.success) {
      toast.success("order sended successfully");
      nav("/serviceProvider/orders");
    } else {
      toast.error("send order failed, please retry");
    }
  };
  return (
    <>
      <div className="apply-job-container my-4 grid grid-cols-1 gap-[20px] xl:px-[5%] sm:px-[10%] px-[2%] pb-[40px]">
        <div className="apply-job-form-section lg:col-span-3 col-span-4">
          {loading ? (
            <ServiceDetailsLoader />
          ) : (
            <ServiceDetails data={state.postData} />
          )}
          <ApplyJobSteps step={step} setStep={setStep} />
          <div className="apply-job-form">
            {step == 1 ? (
              <>
                <BookingStep
                  setStep={setStep}
                  defaultData={bookingDefaultData}
                  setDefaultData={setBookingDefaultData}
                />
              </>
            ) : step == 2 ? (
              <>
                <DateStep
                  setStep={setStep}
                  defaultData={dateDefaultData}
                  setDefaultData={setDateDefaultData}
                />
              </>
            ) : step == 3 ? (
              <>
                <ConfirmationStep
                  setStep={setStep}
                  defaultData={confirmationDefaultData}
                  setDefaultData={setConfirmationDefaultData}
                  sendData={sendData}
                  setExpectedSallary={setExpectedSalary}
                />
              </>
            ) : null}
          </div>
        </div>
        {/* <div className="booking-summary-container lg:col-span-1 col-span-4 h-[max-content]">
          <BookingSummary expectedSalary={expectedSalary} fee={4} />
        </div> */}
      </div>
    </>
  );
}

export default ApplyJob;
