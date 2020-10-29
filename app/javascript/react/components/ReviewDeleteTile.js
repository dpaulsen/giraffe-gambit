import React from "react";

const ReviewEditForm = (props) => {
  let errorsDiv = null;

  const handleSubmit = (event) => {
    event.preventDefault();
    let formPayLoad = { id: props.review.id, review: props.review };
    props.deleteReview(formPayLoad);
  };

  if (props.errors !== "") {
    errorsDiv = (
      <div className="grid-x align-center">
        <div className="callout alert cell shrink">{props.errors}</div>
      </div>
    );
  }

  return (
    <div className="grid-container">
      <div className="callout">
        <h5>Delete Review</h5>
        <form onSubmit={handleSubmit}>
          {errorsDiv}
          <div className="grid-x grid-margin-x">
            <h6 className="cell auto">
              Rating: {props.review.rating} out of 5
            </h6>
          </div>
          <div className="grid-x grid-margin-x">
            <h5 className="cell small-2">Comment:</h5>
            <div className="callout cell small-12">{props.review.comment}</div>
          </div>
          <div className="grid-x align-center">
            <input
              className="button cell shrink"
              type="submit"
              value="Yes Delete"
            />
            <button
              className="button cell shrink"
              type="button"
              onClick={props.onCancelDeleteClickHandler}
            >
              No! Keep
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewEditForm;
