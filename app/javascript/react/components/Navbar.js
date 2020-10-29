import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return(
    <div className={props.classes}>
      <div className="grid-x">
          <Link className="cell" to="/giraffes">Check Out The Herd!</Link>
          <Link className="cell" to="/giraffes/new">Submit Your Own Giraffe!</Link>
          <Link className="cell" to="/giraffes/about">About section (THIS IS BROKEN THERES NO ABOUT PAGE YET) </Link>
      </div>
    </div>
  )
};

export default Navbar;
