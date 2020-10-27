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

  const [voteErrors, setVoteErrors] = useState({
    message: "",
    reivewId: null,
  });

  const id = props.match.params.id;

  const handleVoteSubmit = (reviewId, voteChoice) => {
    const votePayLoad = {
      review_id: reviewId,
      vote_choice: voteChoice,
    };

    fetch("/api/v1/votes", {
      credentials: "same-origin",
      method: "POST",
      body: JSON.stringify(votePayLoad),
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
        if (body.vote && body.review) {
          let reviewIndex = giraffe.reviews.findIndex(
            (review) => review.id === body.review.id
          );
          let tempReviews = [...giraffe.reviews];
          tempReviews.splice(reviewIndex, 1, body.review);

          setGiraffe({ ...giraffe, reviews: tempReviews });
        } else if (body.errors) {
          setVoteErrors({
            message: body.errors,
            reviewId: body.reviewId,
          });
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

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
        <ReviewsList
          reviews={giraffe.reviews}
          handleVoteSubmit={handleVoteSubmit}
          voteErrors={voteErrors}
        />
      </div>
      <hr />
      <Link to="/giraffes">Back to Herd</Link>
    </div>
  );
};

export default GiraffeShowPage;
