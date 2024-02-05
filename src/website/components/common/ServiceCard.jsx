import { IoLocationOutline } from "react-icons/io5";
import Button from "../form/Button";
import { Link } from "react-router-dom";

function ServiceCard({ item }) {
  return (
    <>
      <div className="post-jobs-card">
        <Link to={`/job-detail`} state={{ id: item.id }}>
          <div className="jobs-card-top-image">
            <img src={import.meta.env.VITE_WEBSITE_URL + item.image} />
            <span className="jobs-card-location">
              {item.category}
              {item.subcategory ? " - " + item.subcategory : null}
              {item.childcategory ? " - " + item.childcategory : null}
            </span>
          </div>
        </Link>
        <div className="post-jobs-card-content pt-[30px]">
          <h5 className="jobs-card-title">
            <Link to={item.serviceLink}>{item.title}</Link>
          </h5>
          <p className="jobs-card-p mb-[20px] ellipsis">{item.description}</p>

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

export default ServiceCard;
