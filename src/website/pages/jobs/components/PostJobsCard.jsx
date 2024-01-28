import { IoLocationOutline } from "react-icons/io5";
import Button from "../../../components/form/Button";
import { Link } from "react-router-dom";
function PostJobsCard({ item }) {
  console.log(item);
  return (
    <>
      <div className="post-jobs-card">
        <Link to={`/job-detail`} state={{ id: item.id }}>
          <div className="jobs-card-top-image">
            <img src={import.meta.env.VITE_WEBSITE_URL + item.image} alt="" />
            <span className="jobs-card-location">
              <IoLocationOutline className="location-icon" />
              {item.city}
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
              <span>{item["buyer name"]}</span>
            </div>
          </Link>
          <h5 className="jobs-card-title">
            <Link to={item.jobLink}>{item.title}</Link>
          </h5>
          <p className="jobs-card-p">{item.description}</p>
          <div className="jobs-card-price">
            <span className="price-title">starting at: </span>
            <span className="price">${item.budget}</span>
          </div>
          <Button
            isLink={
              item.state == "hired" || item.state == "applied" ? false : true
            }
            goto={
              item.state == "hired" || item.state == "applied"
                ? ""
                : "/apply-job"
            }
            action={
              item.state == "hired"
                ? () => {
                    console.log("already hired");
                  }
                : item.state == "aplied"
                ? () => {
                    console.log("already applied");
                  }
                : null
            }
            width={"100%"}
            className={
              "primary" +
              (item.state == "hired" || item.state == "applied"
                ? " hired-button"
                : "")
            }
            title={
              item.state == "hired"
                ? "Already Hired"
                : item.state == "applied"
                ? "Already Applied"
                : "Apply Now"
            }
          />
        </div>
      </div>
    </>
  );
}

export default PostJobsCard;
