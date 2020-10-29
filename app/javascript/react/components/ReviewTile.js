import React, { useState } from "react";
import ReviewShowTile from "./ReviewShowTile";
import ReviewEditTile from "./ReviewEditTile";
import ReviewDeleteTile from "./ReviewDeleteTile";

const ReviewTile = (props) => {
  const id = props.review.id;

  const [showEditTile, setShowEditTile] = useState(false);
  const [showDeleteTile, setShowDeleteTile] = useState(false);

  const onEditClickHandler = (event) => {
    setShowEditTile(true);
    setShowDeleteTile(false);
  };

  const onDeleteClickHandler = (event) => {
    setShowDeleteTile(true);
    setShowEditTile(false);
  };

  const onDiscardClickHandler = (event) => {
    setShowEditTile(false);
  };

  const onCancelDeleteClickHandler = (event) => {
    setShowDeleteTile(false);
  };

  const onSaveClickHandler = (formPayLoad) => {
    setShowEditTile(false);
    props.editReview(formPayLoad);
  };

  const onConfirmDeleteClickHandler = (event) => {
    props.deleteReview(event);
  };

  let displayTile = null;

  if (showEditTile && !showDeleteTile) {
    displayTile = (
      <ReviewEditTile
        review={props.review}
        editReview={onSaveClickHandler}
        onDiscardClickHandler={onDiscardClickHandler}
      />
    );
  } else if (showDeleteTile && !showEditTile) {
    displayTile = (
      <ReviewDeleteTile
        review={props.review}
        deleteReview={onConfirmDeleteClickHandler}
        onCancelDeleteClickHandler={onCancelDeleteClickHandler}
      />
    );
  } else {
    displayTile = (
      <ReviewShowTile
        review={props.review}
        handleVoteSubmit={props.handleVoteSubmit}
        voteErrors={props.voteErrors}
        onEditClickHandler={onEditClickHandler}
        onDeleteClickHandler={onDeleteClickHandler}
      />
    );
  }

  return (
    <div>
      <div></div>
      <div>{displayTile}</div>
    </div>
  );
};

export default ReviewTile;
