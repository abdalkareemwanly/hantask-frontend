import { useState } from "react";
import ServiceDetails from "./components/ServiceDetails";
import "./style/ApplyJob.css";
import ApplyJobSteps from "./components/ApplyJobSteps";
import ServiceStep from "./components/ServiceStep";
import BookingStep from "./components/BookingStep";
import DateStep from "./components/DateStep";
import ConfirmationStep from "./components/ConfirmationStep";
import BookingSummary from "./components/BookingSummary";
import SERVICE_DETAILS_DEFAULT_DATA from "./data/serviceDetailsDefaultData";
import ServiceDetailsLoader from "./components/ServiceDetailsLoader";

function ApplyJob(props) {
  try {
    const [step, setStep] = useState(1);
    const [serviceDefaultData, setServiceDefaultData] = useState({});
    const [bookingDefaultData, setBookingDefaultData] = useState({});
    const [dateDefaultData, setDateDefaultData] = useState({ deadlineDate: new Date() });
    const [confirmationDefaultData, setConfirmationDefaultData] = useState({});
    const [expectedSalary, setExpectedSalary] = useState(false);
    const [loading, setLoading] = useState(false);

    const sendData = (data) => {
      console.log(serviceDefaultData, bookingDefaultData, dateDefaultData, data);
    };
    return (
      <>
        <h1 className="apply-job-title mb-[50px] mt-[40px] xl:px-[5%] sm:px-[10%] px-[2%]">{SERVICE_DETAILS_DEFAULT_DATA.serviceName}</h1>
        <div className="apply-job-container grid grid-cols-4 gap-[20px] xl:px-[5%] sm:px-[10%] px-[2%] pb-[40px]">
          <div className="apply-job-form-section lg:col-span-3 col-span-4">
            {loading ? <ServiceDetailsLoader /> : <ServiceDetails data={SERVICE_DETAILS_DEFAULT_DATA} />}
            <ApplyJobSteps step={step} setStep={setStep} />
            <div className="apply-job-form">
              {step == 1 ? (
                <>
                  <ServiceStep setStep={setStep} defaultData={serviceDefaultData} setDefaultData={setServiceDefaultData} />
                </>
              ) : step == 2 ? (
                <>
                  <BookingStep setStep={setStep} defaultData={bookingDefaultData} setDefaultData={setBookingDefaultData} />
                </>
              ) : step == 3 ? (
                <>
                  <DateStep setStep={setStep} defaultData={dateDefaultData} setDefaultData={setDateDefaultData} />
                </>
              ) : step == 4 ? (
                <>
                  <ConfirmationStep setStep={setStep} defaultData={confirmationDefaultData} setDefaultData={setConfirmationDefaultData} sendData={sendData} setExpectedSallary={setExpectedSalary} />
                </>
              ) : null}
            </div>
          </div>
          <div className="booking-summary-container lg:col-span-1 col-span-4 h-[max-content]">
            <BookingSummary expectedSalary={expectedSalary} fee={4} />
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ApplyJob;
