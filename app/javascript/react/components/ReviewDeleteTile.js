import React from "react";

const ReviewDeleteTile = (props) => {
  let commentDiv = null;

  const handleSubmit = (event) => {
    event.preventDefault();
    let formPayLoad = { id: props.review.id, review: props.review };
    props.deleteReview(formPayLoad);
  };

  if (props.review.comment !== "" && props.review.comment !== null) {
    commentDiv = (
      <div className="grid-x">
        <h5 id="comment-label" className="cell shrink">
          Comment:
        </h5>
        <div className="cell auto callout">{props.review.comment}</div>
      </div>
    );
  }

  return (
    <div className="grid-container">
      <div className="callout">
        <div className="grid-x grid-margin-x align-top">
          <h5 className="cell shrink">Rating:</h5>
          <h5 className="cell auto">{props.review.rating} out of 5</h5>
          <button
            className="button cell shrink"
            type="button"
            onClick={handleSubmit}
          >
            Yes Delete
          </button>
          <button
            className="button cell shrink"
            type="button"
            onClick={props.onCancelDeleteClickHandler}
          >
            No! Keep
          </button>
        </div>
        {commentDiv}
      </div>
    </div>
  );
};

export default ReviewDeleteTile;
