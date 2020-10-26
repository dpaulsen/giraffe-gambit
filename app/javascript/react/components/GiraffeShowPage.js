import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReviewsList from "./ReviewsList";
import ReviewNewForm from "./ReviewNewForm";

const GiraffeShowPage = (props) => {
  const [giraffe, setGiraffe] = useState({
    id: null,
    name: "",
    description: "",
    reviews: [],
  });
  const [errors, setErrors] = useState("");
  const [clearForm, setClearForm] = useState(false);
  const id = props.match.params.id;

  useEffect(() => {
    fetch(`/api/v1/giraffes/${id}`)
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
        setGiraffe(body);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

  const addNewReview = (formPayLoad) => {
    fetch(`/api/v1/giraffes/${id}/reviews`, {
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
          setClearForm(true);
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
          setGiraffe({
            ...giraffe,
            reviews: [...giraffe.reviews, body.review],
          });
        } else if (body.errors) {
          setErrors(body.errors);
        } else {
          console.error("ERROR: Unexpected server response");
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  return (
    <div>
      <div>
        <h3>{giraffe.name}</h3>
        <p>{giraffe.description}</p>
      </div>
      <div>
        <p> Reviews: </p>
        <ReviewsList reviews={giraffe.reviews} />
      </div>
      <hr />
      <ReviewNewForm
        giraffeId={id}
        errors={errors}
        addNewReview={addNewReview}
        clearForm={clearForm}
      />
      <Link to="/giraffes">Back to Herd</Link>
    </div>
  );
};

export default GiraffeShowPage;
