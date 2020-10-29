import React, { useState } from "react";
import RatingRadioGroup from "./RatingRadioGroup";

const ReviewEditForm = (props) => {
  const [formFields, setFormFields] = useState({
    rating: props.review.rating.toString(),
    comment: props.review.comment !== null ? props.review.comment : "" ,
  });

  let errorsDiv = null;

  const handleFieldChange = (event) => {
    setFormFields({
      ...formFields,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    let formPayLoad = { review: formFields };
    props.editReview(formPayLoad);

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
        <h5>Edit Review</h5>
        <form onSubmit={handleSubmit}>
          {errorsDiv}

          <div className="grid-x grid-margin-x">
            <label className="cell small-2 text-right" htmlFor="rating">
              Rating:
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
              Comment:
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
            <input className="button cell shrink" type="submit" value="Save Review" />
            <button className="button cell shrink" type="button" onClick={props.onDiscardClickHandler}>  
               Discard Changes
            </button> 
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewEditForm;
