import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {

 // let newLink = 

   useEffect(() => {
    fetch("/api/v1/user/role")
      .then((response) => {
        if (response.ok) {
          return response;
        } else {
          //debugger
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          throw error;
        }
      })
      .then((response) => response.json())
      .then((body) => {
        //debugger
        setGiraffes(body);
      })
      .catch((error) => console.error(`Error in fetch: ${error.message}`));
  }, []);

  return(
    <div className={props.classes}>
      <div className="grid-x">
          <Link className="cell" to="/giraffes">Check Out The Herd!</Link>
          <Link className="cell" to="/giraffes/new">Submit Your Own Giraffe!</Link>
          <Link className="cell" to="/giraffes/about">About Section</Link>
      </div>
    </div>
  )
};

export default Navbar;
