import { IoLocationOutline } from "react-icons/io5";
import Button from "../../../components/form/Button";
import { Link } from "react-router-dom";
import { formatMoney } from "../../../../functions/price";
function PostJobsCard({ item, withBuyer = true }) {
  return (
    <>
      <div className="post-jobs-card">
        <Link to={`/job-detail/${item.id}`} state={{ id: item?.id }}>
          <div className="jobs-card-top-image">
            <img src={import.meta.env.VITE_WEBSITE_URL + item?.image} />
            <span className="jobs-card-location">
              <IoLocationOutline className="location-icon" />
              {item?.city}
            </span>
          </div>
        </Link>
        <div className="post-jobs-card-content">
          {withBuyer && (
            <Link to={`/buyer-profile/${item.buyer_id}`}>
              <div className="top-section">
                <div className="top-section-image">
                  <img
                    src={
                      import.meta.env.VITE_WEBSITE_URL +
                      "/public" +
                      item?.buyer_image
                    }
                  />
                </div>
                <span>{item?.buyer_name}</span>
              </div>
            </Link>
          )}
          <h5 className="jobs-card-title mt-4">
            <div>{item?.title}</div>
          </h5>
          <p className="jobs-card-p ellipsis">{item?.description}</p>
          <div className="jobs-card-price">
            <span className="price-title">starting at: </span>
            <span className="price">{formatMoney(Number(item?.budget))}</span>
          </div>
          <Button
            isLink={true}
            goto={`/job-detail/${item.id}`}
            width={"100%"}
            className={"primary"}
            title={"view post"}
          />
        </div>
      </div>
    </>
  );
}

export default PostJobsCard;
