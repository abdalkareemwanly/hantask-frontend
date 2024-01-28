import { Link } from "react-router-dom";
import "../style/ServiceDetails.css";

function ServiceDetails({ data }) {
  try {
    return (
      <>
        <div className="service-details flex gap-[20px] sm:flex-row flex-col">
          <div className="service-details-image">
            <img src={import.meta.env.VITE_WEBSITE_URL + data.image} alt="" />
          </div>
          <div className="service-details-info flex flex-col justify-center">
            <h4 className="service-name">{data.title}</h4>
            <Link to={"/seller-profile"} className="seller-name">
              {data["buyer name"]}
            </Link>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ServiceDetails;
