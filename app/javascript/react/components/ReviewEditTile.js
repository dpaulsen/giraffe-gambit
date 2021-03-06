import React, { useState } from "react";
import RatingRadioGroup from "./RatingRadioGroup";

const ReviewEditTile = (props) => {
  const [formFields, setFormFields] = useState({
    rating: props.review.rating.toString(),
    comment: props.review.comment !== null ? props.review.comment : "",
  });

  const handleFieldChange = (event) => {
    setFormFields({
      ...formFields,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let messageUp = { id: props.review.id, review: formFields };
    props.editReview(messageUp);
  };

  return (
    <div className="grid-container">
      <div className="callout">
        <h5>Edit Review</h5>
        <form onSubmit={handleSubmit}>
          <div className="grid-x grid-margin-x">
            <label className="cell small-2 text-right" htmlFor="rating">
              <h5>Rating:</h5>
            </label>
            <div id="rating" className="cell small-10 medium-8 large-6 grid-x">
              <RatingRadioGroup
                handleFieldChange={handleFieldChange}
                state={formFields.rating}
              />
            </div>
          </div>
          <div className="grid-x grid-margin-x align-middle">
            <label className="cell small-2 text-right" htmlFor="comment">
              <h5>Comment:</h5>
            </label>
            <input
              className="cell auto field"
              type="text"
              name="comment"
              id="comment"
              onChange={handleFieldChange}
              value={formFields.comment}
            />
          </div>

          <div className="grid-x grid-margin-x align-center">
            <input
              className="button cell shrink"
              type="submit"
              value="Save Review"
            />
            <button
              className="button cell shrink"
              type="button"
              onClick={props.onDiscardClickHandler}
            >
              Discard Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewEditTile;
