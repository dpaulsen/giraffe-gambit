import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import ReviewsList from "./ReviewsList";
import ReviewNewForm from "./ReviewNewForm";

const GiraffeShowPage = (props) => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

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
  let reviewHeader = null;

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
            reviews: [review, ...giraffe.reviews],
          });
        } else if (review.errors) {
          setErrors(review.errors);
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  const editReview = (message) => {
    let reviewId = message.id;
    let payload = message.review;
    fetch(`/api/v1/giraffes/${id}/reviews/${reviewId}`, {
      credentials: "same-origin",
      method: "PATCH",
      body: JSON.stringify(payload),
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
      .then((updatedReview) => {
        if (!updatedReview.errors) {
          let reviewIndex = giraffe.reviews.findIndex(
            (review) => review.id === updatedReview.id
          );

          let tempReviews = [...giraffe.reviews];
          tempReviews.splice(reviewIndex, 1, updatedReview);

          setGiraffe({
            ...giraffe,
            reviews: tempReviews,
          });
        } else if (review.errors) {
          setErrors(review.errors);
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  const deleteReview = (message) => {
    let reviewId = message.id;

    fetch(`/api/v1/giraffes/${id}/reviews/${reviewId}`, {
      credentials: "same-origin",
      method: "DELETE",
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
      .then((removeReview) => {
        if (!removeReview.errors) {
          let reviewIndex = giraffe.reviews.findIndex(
            (review) => review.id === removeReview.id
          );

          let tempReviews = [...giraffe.reviews];
          tempReviews.splice(reviewIndex, 1);

          setGiraffe({
            ...giraffe,
            reviews: tempReviews,
          });
        } else if (review.errors) {
          setErrors(review.errors);
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  const onDeleteGiraffeClickHandler = (event) => {
    fetch(`/api/v1/giraffes/${id}`, {
      credentials: "same-origin",
      method: "DELETE",
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
      .then((removeGiraffe) => {
        if (!removeGiraffe.errors) {
          setShouldRedirect(true);
        }
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  };

  if (shouldRedirect) {
    return <Redirect to="/" />;
  }

  if (giraffe.reviews.length > 0) {
    reviewHeader = (<h4 className="cell"> Reviews: </h4>)
  }

  return (
    <div className="cell auto page">
      <div className="grid-x grid-margin-x grid-padding-y">
        <div className="grid-x grid-margin-x cell">
          <button
            type="button"
            className="button cell shrink"
            id="delete-review"
            onClick={onDeleteGiraffeClickHandler}
          >
            Delete Giraffe
          </button>
        </div>
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
        {reviewHeader}
        <ReviewsList
          reviews={giraffe.reviews}
          handleVoteSubmit={handleVoteSubmit}
          voteErrors={voteErrors}
          editReview={editReview}
          deleteReview={deleteReview}
        />
      </div>
      <Link to="/giraffes">Back to Herd</Link>
    </div>
  );
};

export default GiraffeShowPage;
