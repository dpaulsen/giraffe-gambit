import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {

  // const [currentUser, setCurrentUser]=useState( {
  //   username: "",
  //   role: ""
  // } )
  // let newLink = ""

  //  useEffect(() => {
  //   fetch("/api/v1/user/role")
  //     .then((response) => {
  //       if (response.ok) {
  //         return response;
  //       } else {
  //         let errorMessage = `${response.status} (${response.statusText})`,
  //         error = new Error(errorMessage);
  //         throw error;
  //       }
  //     })
  //     .then((response) => response.json())
  //     .then((loginInfo) => {
  //       //debugger
  //       if (loginInfo != null){
  //         setCurrentUser(loginInfo);
  //       }
  //     })
  //     .catch((error) => console.error(`Error in fetch: ${error.message}`));
  // }, []);

  // if (currentUser  || currentUser.role ==""){
  //   //debugger
  // }

  return(
    <div className={props.classes}>
      <div className="grid-x grid-padding-x">
        <Link className="cell" to="/giraffes">
          Check Out The Herd
        </Link>
        <Link className="cell" to="/giraffes/new">
          Submit Your Own Giraffe
        </Link>
        <Link className="cell" to="/about">
          About
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
