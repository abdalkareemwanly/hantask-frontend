import { useState } from "react";
import "../style/ReviewLoader.css";
import StarRatings from "react-star-ratings";

function ReviewLoader() {
  try {
    const [rating, setRating] = useState({ rating: 0, starRatedColor: "var(--main-color)", starDimension: "15px", starSpacing: "2px", numberOfStars: 5, name: "rating" });

    return (
      <>
        <div className="review flex gap-[30px] py-[5px] mb-[20px]">
          <div className="review-image flex justify-center items-start"></div>
          <div className="flex flex-col w-full">
            <div className="review-seller-name"></div>
            <div className="review-rating">
              <StarRatings {...rating} />
            </div>
            <p className="review-content"></p>
            <div className="review-date"></div>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default ReviewLoader;
