import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReviewsList from "./ReviewsList";
import ReviewNewForm from "./ReviewNewForm";

const GiraffeShowPage = (props) => {
  const [giraffe, setGiraffe] = useState({
    id: null,
    name: "",
    description: "",
    image: null,
    reviews: [],
  });

  const [voteErrors, setVoteErrors] = useState({
    message: "",
    reivewId: null,
  });

  const [errors, setErrors] = useState("");

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

          setGiraffe({
            ...giraffe,
            reviews: tempReviews,
          });
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
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => response.json())
      .then((review) => {
        if (!review.errors) {
          setGiraffe({
            ...giraffe,
            reviews: [...giraffe.reviews, review],
          });
        } else if (review.errors) {
          setErrors(review.errors);
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  return (
    <div className="cell auto page">
      <div className="grid-x grid-margin-x grid-padding-y">
        <div className="grid-x align-center cell small-6">
          <img className="cell shrink giraffe-image" src={giraffe.image?.url} />
        </div>

        <div className="cell small-6">
          <div className="grid-y grid-padding-y" style={{ height: "100%" }}>
            <h1 className="cell shrink">{giraffe.name}</h1>
            <h4 className="cell auto">{giraffe.description}</h4>
          </div>
        </div>
      </div>

      <ReviewNewForm
        giraffeId={id}
        errors={errors}
        addNewReview={addNewReview}
      />
      <hr />
      <div>
        <p className="cell"> Reviews: </p>
        <ReviewsList
          reviews={giraffe.reviews}
          handleVoteSubmit={handleVoteSubmit}
          voteErrors={voteErrors}
        />
      </div>
      <Link to="/giraffes">Back to Herd</Link>
    </div>
  );
};

export default GiraffeShowPage;
