import { Link } from "react-router-dom";

function ServiceCardLoader() {
  try {
    return (
      <>
        <div className="post-jobs-card loader">
          <Link to={""}>
            <div className="jobs-card-top-image">
              <span className="jobs-card-location"></span>
            </div>
          </Link>
          <div className="post-jobs-card-content">
            <h5 className="jobs-card-title">
              <Link to={""}></Link>
            </h5>
            <p className="jobs-card-p"></p>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ServiceCardLoader;
