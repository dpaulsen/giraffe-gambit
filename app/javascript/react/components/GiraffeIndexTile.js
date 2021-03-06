import React from "react";
import { Link } from "react-router-dom";

const GiraffeIndexTile = (props) => {

  return (
    <div className="cell">
      <Link to={`giraffes/${props.data.id}`}>
        <div className="card box-shadow hover-zoom">
          <img className="giraffe-tile" src={props.data.image.url} />
          <div className="card-section text-center">
            <h4>{props.data.name}</h4>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GiraffeIndexTile;
