import React from "react";
import { Link } from "react-router-dom";

const GiraffeIndexTile = (props) => {
  return (
    <div class="cell">
      <Link to={`giraffes/${props.data.id}`}>
        <div class="card">
          <img src="https://via.placeholder.com/200" />
          <div class="card-section text-center">
            <h4>{props.data.name}</h4>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GiraffeIndexTile;
