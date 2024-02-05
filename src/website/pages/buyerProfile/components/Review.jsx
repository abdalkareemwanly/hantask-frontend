import { useState } from "react";
import "../style/Review.css";
import StarRatings from "react-star-ratings";

function Review({ data }) {
  try {
    const [rating, setRating] = useState({
      rating: Number(data.review),
      starRatedColor: "var(--main-color)",
      starDimension: "15px",
      starSpacing: "2px",
      numberOfStars: 5,
      name: "rating",
    });

    return (
      <>
        <div className="review flex gap-[30px] py-[5px] mb-[20px]">
          <div className="review-image flex justify-center items-start">
            <img src={import.meta.env.VITE_WEBSITE_URL + data.buyer_image} />
          </div>
          <div className="flex flex-col">
            <div className="review-seller-name">{data.buyer_name}</div>
            <div className="review-rating">
              <StarRatings {...rating} />
            </div>
            <p className="review-content">{data.description}</p>
            <div className="review-date">{data.created_at.slice(0, 10)}</div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default Review;
