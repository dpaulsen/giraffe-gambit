import React, { useState } from "react";

const ReviewNewForm = (props) => {
  const [formFields, setFormFields] = useState({
    rating: "",
    comment: "",
  });

  let errorsDiv = null;
  let formPayLoad = { review: formFields };

  const handleChange = (event) => {
    setFormFields({
      ...formFields,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addNewReview(formPayLoad);
    setFormFields({
      rating: "",
      comment: "",
    });
  };

  if (props.errors !== "") {
    errorsDiv = (
      <div className="grid-x align-center">
        <div className="callout alert cell shrink">{props.errors}</div>
      </div>
    );
  }
  return (
    <div className="grid-container callout new-review-container">
      <h3>Add a Review</h3>
      <form onSubmit={handleSubmit}>
        {errorsDiv}

        <div className="grid-x grid-margin-x align-middle">
          <label className="cell small-2 text-right" htmlFor="rating">
            Rating:
          </label>
          <input
            className="cell small-4 field"
            type="text"
            name="rating"
            id="rating"
            onChange={handleChange}
            value={formFields.rating}
          />
        </div>
        <div className="grid-x grid-margin-x align-middle">
          <label className="cell small-2 text-right" htmlFor="comment">
            Comment:
          </label>
          <input
            className="cell auto field"
            type="text"
            name="comment"
            id="comment"
            onChange={handleChange}
            value={formFields.comment}
          />
        </div>

        <div className="grid-x align-center">
          <input className="cell shrink" type="submit" value="Add Review" />
        </div>
      </form>
    </div>
  );
};

export default ReviewNewForm;
