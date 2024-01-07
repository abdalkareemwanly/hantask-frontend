import { useState } from "react";
import "../style/review.css";
import StarRatings from "react-star-ratings";

function Review({ data }) {
  try {
    const [rating, setRating] = useState({ rating: data.rating, starRatedColor: "var(--main-color)", starDimension: "15px", starSpacing: "2px", numberOfStars: 5, name: "rating" });

    return (
      <>
        <div className="review flex gap-[30px] py-[5px] mb-[20px]">
          <div className="review-image flex justify-center items-start">
            <img src={data.sellerImage} alt="" />
          </div>
          <div className="flex flex-col">
            <div className="review-seller-name">{data.sellerName}</div>
            <div className="review-rating">
              <StarRatings {...rating} />
            </div>
            <p className="review-content">{data.reviewContent}</p>
            <div className="review-date">{data.reviewDate}</div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Review;
