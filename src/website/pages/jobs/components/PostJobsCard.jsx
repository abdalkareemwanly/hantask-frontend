import { IoLocationOutline } from "react-icons/io5";
import Button from "../../../components/form/Button";
import { Link } from "react-router-dom";
function PostJobsCard({ item }) {
  try {
    return (
      <>
        <div className="post-jobs-card">
          <Link to={item.jobLink}>
            <div className="jobs-card-top-image">
              <img src={item.cover} alt="" />
              <span className="jobs-card-location">
                <IoLocationOutline className="location-icon" />
                {item.location}
              </span>
            </div>
          </Link>
          <div className="post-jobs-card-content">
            <Link to={item.jobLink}>
              <div className="top-section">
                <div className="top-section-image">
                  <img src={item.userImage} alt="" />
                  <span className="online-circle"></span>
                </div>
                <span>{item.username}</span>
              </div>
            </Link>
            <h5 className="jobs-card-title">
              <Link to={item.jobLink}>{item.jobTitle}</Link>
            </h5>
            <p className="jobs-card-p">{item.paragraph}</p>
            <div className="jobs-card-price">
              <span className="price-title">starting at: </span>
              <span className="price">${item.price}</span>
            </div>
            <Button
              isLink={false}
              action={
                item.hired
                  ? () => {
                      console.log("already hired");
                    }
                  : () => {
                      console.log("apply");
                    }
              }
              width={"100%"}
              className={"primary" + (item.hired ? " hired-button" : "")}
              title={item.hired ? "Already Hired" : "Apply Now"}
            />
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default PostJobsCard;
