import React from "react";
import ReviewTile from "./ReviewTile";

const ReviewsList = (props) => {
  const reviewList = props.reviews.map((reviewObject) => {
    return (
      <ReviewTile
        giraffeId={props.giraffeId}
        key={reviewObject.id}
        review={reviewObject}
        handleVoteSubmit={props.handleVoteSubmit}
        voteErrors={props.voteErrors}
        editReview={props.editReview}
        deleteReview={props.deleteReview}
      />
    );
  });

  return (
    <div>
      <ul>{reviewList}</ul>
    </div>
  );
};

export default ReviewsList;
