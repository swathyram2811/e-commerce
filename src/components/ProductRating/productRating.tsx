import React from "react";

import "./productRating.scss";

const ProductRating: React.FC<{ rating: number; count: number }> = ({
  rating,
  count,
}) => {
  return (
    <span className="product-rating">
      <div className="star-rating">
        {Array.from({ length: 5 }, (_, index) => index + 1).map((star, idx) => {
          return (
            <span
              className="star"
              key={idx}
              style={{ color: rating >= star ? "gold" : "gray" }}
            >
              {" "}
              ★{" "}
            </span>
          );
        })}
      </div>
      <span className="rating-count">({count})</span>
    </span>
  );
};

export default ProductRating;
