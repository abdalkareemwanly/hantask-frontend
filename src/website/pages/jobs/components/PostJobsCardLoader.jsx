import { Link } from "react-router-dom";
import "../style/PostJobsCardLoader.css";

function PostJobsCardLoader({ item }) {
  try {
    return (
      <>
        <div className="post-jobs-card">
          <Link to={""}>
            <div className="jobs-card-top-image">
              <span className="jobs-card-location"></span>
            </div>
          </Link>
          <div className="post-jobs-card-content">
            <Link to={""}>
              <div className="top-section">
                <div className="top-section-image">
                  <span className="online-circle"></span>
                </div>
                <span></span>
              </div>
            </Link>
            <h5 className="jobs-card-title">
              <Link to={""}></Link>
            </h5>
            <p className="jobs-card-p"></p>
            <div className="jobs-card-price">
              <span className="price-title"></span>
              <span className="price"></span>
            </div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default PostJobsCardLoader;
