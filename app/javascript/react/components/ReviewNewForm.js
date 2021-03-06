import React, { useState } from "react";
import RatingRadioGroup from "./RatingRadioGroup";

const ReviewNewForm = (props) => {
  const [formFields, setFormFields] = useState({
    rating: "3",
    comment: "",
  });

  let errorsDiv = null;

  const handleFieldChange = (event) => {
    setFormFields({
      ...formFields,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const clearForm = () => {
    setFormFields({
      rating: "3",
      comment: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formPayLoad = { review: formFields };
    props.addNewReview(formPayLoad);
    clearForm();
  };

  if (props.errors !== "") {
    errorsDiv = (
      <div className="grid-x align-center">
        <div className="callout alert cell shrink">{props.errors}</div>
      </div>
    );
  }

  return (
    <div className="callout">
      <h5>Add a Review</h5>
      <form onSubmit={handleSubmit}>
        {errorsDiv}

        <div className="grid-x grid-margin-x">
          <label className="cell small-2 text-right" htmlFor="rating">
            <h5>Rating:</h5>
          </label>
          <div id="rating" className="grid-x cell small-10 medium-8">
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

        <div className="grid-x align-center">
          <input
            className="cell shrink button"
            type="submit"
            value="Add Review"
          />
        </div>
      </form>
    </div>
  );
};

export default ReviewNewForm;
