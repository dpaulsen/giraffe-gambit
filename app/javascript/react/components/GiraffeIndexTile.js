import React from "react";
import { Link } from "react-router-dom";

const GiraffeIndexTile = (props) => {
  return (
    <div className="cell">
      <Link to={`giraffes/${props.data.id}`}>
        <div className="card">
<<<<<<< HEAD
          <img src={props.data.image.url} />
=======
          <img src="https://via.placeholder.com/200" />
>>>>>>> f807168374f12b21ad9fe70e5741f8b237f1b934
          <div className="card-section text-center">
            <h4>{props.data.name}</h4>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default GiraffeIndexTile;
