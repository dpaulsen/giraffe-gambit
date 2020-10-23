import React, { useState } from "react";

const ReviewNewForm = (props) => {
  const [formFields, setFormFields] = useState({
    rating: "",
    comment: "",
  });

  const [errors, setErrors] = useState("");

  let errorsDiv = null;

  const handleChange = (event) => {
    setFormFields({
      ...formFields,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let formPayLoad = { review: formFields };
  
    fetch(`/api/v1/giraffes/${props.giraffeId}/reviews`, {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(formPayLoad),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => response.json())
      .then((body) => {
        if (body.review) {
          // need reviews index completed first 
        } else if (body.errors) {
          setErrors(body.errors);
        } else {
          console.error("ERROR: Unexpected server response");
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  if (errors !== "") {
    errorsDiv = (
      <div className="grid-x align-center">
        <div className="callout alert cell shrink">{errors}</div>
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
          <label
            className="cell small-2 text-right"
            htmlFor="comment"
          >
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
          <input
            className="cell shrink"
            type="submit"
            value="Add Review"
          />
        </div>
      </form>
    </div>
  );
};

export default ReviewNewForm;
