import React from "react";
import ReviewTile from "./ReviewTile";

const ReviewsList = (props) => {
  const reviewList = props.reviews?.map((reviewObject) => {
    return <ReviewTile key={reviewObject.id} data={reviewObject} />;
  });

  return (
    <div>
      <ul>{reviewList}</ul>
    </div>
  );
};

export default ReviewsList;
