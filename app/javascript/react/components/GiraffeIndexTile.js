import React from "react";
import { Link } from "react-router-dom";

const GiraffeIndexTile = (props) => {
  return (
    <div className="callout cell small-4 text-center">
      <h3>
        <Link to={`giraffes/${props.data.id}`}>{props.data.name}</Link>
      </h3>
    </div>
  );
};

export default GiraffeIndexTile;
