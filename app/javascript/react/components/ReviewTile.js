import React from "react";

const ReviewTile = (props) => {
  return (
    <li>
      {props.data.rating} out of 5 : {props.data.comment}
    </li>
  );
};

export default ReviewTile;
