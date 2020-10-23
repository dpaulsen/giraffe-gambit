import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReviewsList from "./ReviewsList";

const GiraffeShowPage = (props) => {
  const [giraffe, setGiraffe] = useState({
    id: null,
    name: "",
    description: "",
    reviews: [],
  });
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
      <Link to="/giraffes">Back to Herd</Link>
    </div>
  );
};

export default GiraffeShowPage;
