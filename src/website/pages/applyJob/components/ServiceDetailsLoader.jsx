import { Link } from "react-router-dom";
import "../style/ServiceDetailsLoader.css";

function ServiceDetailsLoader() {
  try {
    return (
      <>
        <div className="service-details flex gap-[20px] sm:flex-row flex-col loader">
          <div className="service-details-image"></div>
          <div className="service-details-info flex flex-col justify-center">
            <h4 className="service-name"></h4>
            <Link to={""} className="seller-name"></Link>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ServiceDetailsLoader;
