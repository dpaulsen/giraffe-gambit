import React from "react";
import upVoteImage from "../../../assets/images/votes/black_upvote";
import downVoteImage from "../../../assets/images/votes/black_downvote";
import upVoteImageClicked from "../../../assets/images/votes/green_upvote";
import downVoteImageClicked from "../../../assets/images/votes/red_downvote";

const ReviewShowTile = (props) => {
  let voteErrorsDiv = null;
  let commentDiv = null;
  let upDisplayImage = "";
  let downDisplayImage = "";
  let buttonChangeGroup = null;
  
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
      <div className="grid-x">
        <h5 id="comment-label" className="cell shrink">
          Comment:
        </h5>
        <div className="cell auto callout">{props.review.comment}</div>
      </div>
    );
  }

  if (props.review?.myVote?.vote === "up") {
    upDisplayImage = upVoteImageClicked;
    downDisplayImage = downVoteImage;
  } else if (props.review?.myVote?.vote === "down") {
    upDisplayImage = upVoteImage;
    downDisplayImage = downVoteImageClicked;
  } else {
    upDisplayImage = upVoteImage;
    downDisplayImage = downVoteImage;
  }

  const onUpEnter = (event) => {
    event.currentTarget.src = upVoteImageClicked;
  };

  const onDownEnter = (event) => {
    event.currentTarget.src = downVoteImageClicked;
  };

  const onUpLeave = (event) => {
    if (props.review?.myVote?.vote !== "up") {
      event.currentTarget.src = upVoteImage;
    }
  };

  const onDownLeave = (event) => {
    if (props.review?.myVote?.vote !== "down") {
      event.currentTarget.src = downVoteImage;
    }
  };

  if (props.review.userIsOwner || props.review.userIsAdmin) {
    buttonChangeGroup = (
      <>
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
      </>
    );
  }

  return (
    <div className="grid-container">
      <div className="callout">
        <div className="grid-x grid-margin-x align-top">
          <h6 className="cell small-12">{props.review.ownerName}</h6>
          <h5 className="cell shrink">Rating:</h5>
          <h5 className="cell auto">{props.review.rating} out of 5</h5>
          {buttonChangeGroup}
        </div>
        {commentDiv}
        <div className="grid-x grid-margin-x align-middle text-center">
          <div id="up-vote-container" className="grid-x cell shrink">
            <img
              src={upDisplayImage}
              id="up-vote"
              className="cell"
              onClick={onVoteClickHandler}
              onMouseEnter={onUpEnter}
              onMouseLeave={onUpLeave}
            />
          </div>

          <div className="cell small-1">
            <h5 id="vote-count">{props.review.voteCount}</h5>
          </div>

          <div id="down-vote-container" className="grid-x cell shrink">
            <img
              src={downDisplayImage}
              id="down-vote"
              className="cell"
              onClick={onVoteClickHandler}
              onMouseEnter={onDownEnter}
              onMouseLeave={onDownLeave}
            />
          </div>
        </div>
        {voteErrorsDiv}
      </div>
    </div>
  );
};

export default ReviewShowTile;
