import React from "react";
import upVoteImage from "../../../assets/images/votes/black_upvote";
import downVoteImage from "../../../assets/images/votes/black_downvote";
import upVoteImageClicked from "../../../assets/images/votes/green_upvote";
import downVoteImageClicked from "../../../assets/images/votes/red_downvote";

const ReviewTile = (props) => {
  let voteErrorsDiv = null;
  let commentDiv = null;
  let upDisplayImage = "";
  let downDisplayImage = "";
  
  const onClickHandler = (event) => {
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

  if (props.review?.myVote?.vote === "up") {
    //user voted up
    upDisplayImage = upVoteImageClicked;
    downDisplayImage = downVoteImage;
  } else if (props.review?.myVote?.vote === "down") {
    // user voted down
    upDisplayImage = upVoteImage;
    downDisplayImage = downVoteImageClicked;
  } else {
    // user hasnt voted / taken back vote
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

  return (
    <div className="grid-container">
      <div className="callout">
        <div className="grid-x grid-margin-x align-middle">
          <h5 className="cell shrink">Rating:</h5>
          <h6 className="cell auto">{props.review.rating} out of 5</h6>
        </div>

        {commentDiv}

        <div className="grid-x grid-margin-x align-middle text-center">
          <div
            id="vote-container"
            className="grid-x cell shrink align-middle-center"
          >
            <img
              src={upDisplayImage}
              id="up-vote"
              className="cell"
              onClick={onClickHandler}
              onMouseEnter={onUpEnter}
              onMouseLeave={onUpLeave}
            />
          </div>

          <div className="cell small-1">{props.review.voteCount}</div>

          <div
            id="vote-container"
            className="grid-x cell shrink align-middle-center"
          >
            <img
              src={downDisplayImage}
              id="down-vote"
              className="cell"
              onClick={onClickHandler}
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

export default ReviewTile;
