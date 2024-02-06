import { Link } from "react-router-dom";
import "../style/PostJobsCardLoader.css";

function PostJobsCardLoader() {
  return (
    <>
      <div className="post-jobs-card loader">
        <Link to={""}>
          <div className="jobs-card-top-image">
            <span className="jobs-card-location"></span>
          </div>
        </Link>
        <div className="post-jobs-card-content">
          <Link to={""}>
            <div className="top-section">
              <div className="top-section-image"></div>
              <span></span>
            </div>
          </Link>
          <h5 className="jobs-card-title">
            <Link to={""}></Link>
          </h5>
          <p className="jobs-card-p"></p>
        </div>
      </div>
    </>
  );
}

export default PostJobsCardLoader;
