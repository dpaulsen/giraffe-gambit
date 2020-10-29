import React from "react";

const ReviewShowTile = (props) => {
  let voteErrorsDiv = null;
  let commentDiv = null;

  const onVoteClickHandler = (event) => {
    let voteChoice = null;
    if (event.currentTarget.id === "up-vote") {
      voteChoice = "up";
    } else if (event.currentTarget.id === "down-vote") {
      voteChoice = "down";
    }

    let reviewId = props.review.id;

    props.handleVoteSubmit(reviewId, voteChoice);
  };



  if (
    props.voteErrors.message !== "" &&
    props.voteErrors.reviewId === props.review.id
  ) {
    voteErrorsDiv = (
      <div className="grid-x align-center">
        <div className="callout alert cell shrink">
          {props.voteErrors.message}
        </div>
      </div>
    );
  }

  if (props.review.comment !== "" && props.review.comment !== null) {
    commentDiv = (
      <div className="grid-x grid-margin-x">
        <h5 className="cell small-2">Comment:</h5>
        <div className="callout cell small-12">{props.review.comment}</div>
      </div>
    );
  }

  return (
    <div className="grid-container">
      <div className="callout">
        <div className="grid-x grid-margin-x align-middle">
          <h5 className="cell shrink">Rating:</h5>
          <h6 className="cell auto">{props.review.rating} out of 5</h6>

          <button
            type="button"
            className="button cell shrink"
            id="edit-review"
            onClick={props.onEditClickHandler}
          >
            Edit
          </button>

          <button
            type="button"
            className="button cell shrink"
            id="delete-review"
            onClick={props.onDeleteClickHandler}
          >
            Delete
          </button>

        </div>

        {commentDiv}

        <div className="grid-x grid-margin-x align-middle text-center">
          <button
            type="button"
            className="button cell shrink"
            id="up-vote"
            onClick={onVoteClickHandler}
          >
            Up
          </button>

          <div className="cell small-1">{props.review.voteCount}</div>

          <button
            type="button"
            className="button cell shrink"
            id="down-vote"
            onClick={onVoteClickHandler}
          >
            Down
          </button>
        </div>

        {voteErrorsDiv}

      </div>
    </div>
  );
};

export default ReviewShowTile;
