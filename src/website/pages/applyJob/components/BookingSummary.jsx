import "../style/BookingSummary.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../components/form/Input";
import COUPONE_SCHEMA from "../data/couponSchema";

function BookingSummary({ expectedSalary, fee }) {
  try {
    const schema = z.object(COUPONE_SCHEMA);
    const {
      register,
      handleSubmit,
      getValues,
      formState: { errors },
    } = useForm({
      resolver: zodResolver(schema),
    });
    const submitData = (data) => {};

    return (
      <>
        <div className="booking-summary">
          <h4>Booking Summary</h4>
          <div className="flex justify-between booking-section">
            <span>fee: </span> <span>{fee}</span>
          </div>
          <div className="flex justify-between  booking-section">
            <span>expected sallary: </span>{" "}
            <span>{expectedSalary ? expectedSalary : "-"}</span>
          </div>
          <div className="flex justify-between  booking-section">
            <span className="booking-total">Total: </span>{" "}
            <span>{fee + +expectedSalary}</span>
          </div>
          <div className="flex justify-between  booking-section">
            <form onSubmit={handleSubmit(submitData)} className="w-full">
              <div className="grid" style={{ position: "relative" }}>
                <Input
                  type={"text"}
                  placeholder={"Enter Coupon Code"}
                  register={register}
                  name={"code"}
                  label={""}
                  errors={errors}
                />
                <input
                  type={"submit"}
                  value={"Apply"}
                  className={"apply-coupon-button"}
                />
              </div>
            </form>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default BookingSummary;
